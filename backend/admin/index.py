import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

ADMIN_PASSWORD = "admin123"

def handler(event: dict, context) -> dict:
    """API для управления заявками в админ-панели"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    auth_header = headers.get('X-Authorization', '') or headers.get('x-authorization', '')
    
    if not auth_header or auth_header != f'Bearer {ADMIN_PASSWORD}':
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    
    if method == 'GET':
        try:
            query_params = event.get('queryStringParameters') or {}
            status_filter = query_params.get('status')
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            if status_filter:
                cur.execute(
                    "SELECT * FROM applications WHERE status = %s ORDER BY created_at DESC",
                    (status_filter,)
                )
            else:
                cur.execute("SELECT * FROM applications ORDER BY created_at DESC")
            
            applications = cur.fetchall()
            
            for app in applications:
                if app['created_at']:
                    app['created_at'] = app['created_at'].isoformat()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'applications': applications})
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'})
            }
    
    if method == 'PUT':
        try:
            body = json.loads(event.get('body', '{}'))
            app_id = body.get('id')
            new_status = body.get('status')
            
            if not app_id or not new_status:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Требуются поля id и status'})
                }
            
            if new_status not in ['pending', 'approved', 'rejected']:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Некорректный статус'})
                }
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            
            cur.execute(
                "UPDATE applications SET status = %s WHERE id = %s",
                (new_status, app_id)
            )
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Статус обновлён'})
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'})
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }