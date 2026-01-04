import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """API для обработки заявок на вступление в майнкрафт-сервер"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            
            username = body.get('username', '').strip()
            age = body.get('age')
            email = body.get('email', '').strip()
            discord = body.get('discord', '').strip()
            experience = body.get('experience', '').strip()
            why_join = body.get('why_join', '').strip()
            
            if not username or not age or not email or not experience or not why_join:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Все обязательные поля должны быть заполнены'})
                }
            
            if age < 10 or age > 100:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Укажите корректный возраст'})
                }
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            
            cur.execute(
                "INSERT INTO applications (username, age, email, discord, experience, why_join) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
                (username, age, email, discord, experience, why_join)
            )
            
            app_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'id': app_id, 'message': 'Заявка успешно отправлена!'})
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
    
    if method == 'GET':
        try:
            conn = psycopg2.connect(dsn)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute("SELECT COUNT(*) as total FROM applications WHERE status = 'pending'")
            result = cur.fetchone()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'pending_count': result['total'] if result else 0})
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
