import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Application {
  id: number;
  username: string;
  age: number;
  email: string;
  discord: string;
  experience: string;
  why_join: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const API_URL = 'https://functions.poehali.dev/9b9e2122-562c-4419-a695-f560e18af3b5';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_token', password);
      fetchApplications();
    } else {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Неверный пароль',
      });
    }
  };

  const fetchApplications = async (status?: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token') || password;
      const url = status ? `${API_URL}?status=${status}` : API_URL;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: 'Не удалось загрузить заявки',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Проблема с подключением к серверу',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status })
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: `Заявка ${status === 'approved' ? 'одобрена' : 'отклонена'}`,
        });
        fetchApplications();
        setDetailsOpen(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: 'Не удалось обновить статус',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Проблема с подключением к серверу',
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
    setPassword('');
  };

  const showDetails = (app: Application) => {
    setSelectedApp(app);
    setDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">На рассмотрении</Badge>;
      case 'approved':
        return <Badge className="bg-primary">Одобрено</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Отклонено</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token === 'admin123') {
      setIsAuthenticated(true);
      setPassword(token);
      fetchApplications();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen dark bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Админ-панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Войти
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/')}>
                Вернуться на главную
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark bg-background">
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Админ-панель</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/')}>
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Управление заявками</h1>
          <p className="text-muted-foreground">Просмотр и модерация заявок на вступление</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="all" onClick={() => fetchApplications()}>
              Все ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="pending" onClick={() => fetchApplications('pending')}>
              На рассмотрении
            </TabsTrigger>
            <TabsTrigger value="approved" onClick={() => fetchApplications('approved')}>
              Одобрено
            </TabsTrigger>
            <TabsTrigger value="rejected" onClick={() => fetchApplications('rejected')}>
              Отклонено
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Загрузка...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Заявок пока нет</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <Card key={app.id} className="hover:border-primary/50 transition-all cursor-pointer" onClick={() => showDetails(app)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 mb-2">
                            <Icon name="User" size={20} className="text-primary" />
                            {app.username}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={14} />
                              {app.age} лет
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Mail" size={14} />
                              {app.email}
                            </span>
                            {app.discord && (
                              <span className="flex items-center gap-1">
                                <Icon name="MessageCircle" size={14} />
                                {app.discord}
                              </span>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{app.why_join}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Подано: {new Date(app.created_at).toLocaleString('ru-RU')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Загрузка...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Нет заявок на рассмотрении</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <Card key={app.id} className="hover:border-primary/50 transition-all cursor-pointer" onClick={() => showDetails(app)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 mb-2">
                            <Icon name="User" size={20} className="text-primary" />
                            {app.username}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={14} />
                              {app.age} лет
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Mail" size={14} />
                              {app.email}
                            </span>
                            {app.discord && (
                              <span className="flex items-center gap-1">
                                <Icon name="MessageCircle" size={14} />
                                {app.discord}
                              </span>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{app.why_join}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Подано: {new Date(app.created_at).toLocaleString('ru-RU')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Загрузка...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Нет одобренных заявок</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <Card key={app.id} className="hover:border-primary/50 transition-all cursor-pointer" onClick={() => showDetails(app)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 mb-2">
                            <Icon name="User" size={20} className="text-primary" />
                            {app.username}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={14} />
                              {app.age} лет
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Mail" size={14} />
                              {app.email}
                            </span>
                            {app.discord && (
                              <span className="flex items-center gap-1">
                                <Icon name="MessageCircle" size={14} />
                                {app.discord}
                              </span>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{app.why_join}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Подано: {new Date(app.created_at).toLocaleString('ru-RU')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Загрузка...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Нет отклонённых заявок</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <Card key={app.id} className="hover:border-primary/50 transition-all cursor-pointer" onClick={() => showDetails(app)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 mb-2">
                            <Icon name="User" size={20} className="text-primary" />
                            {app.username}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={14} />
                              {app.age} лет
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Mail" size={14} />
                              {app.email}
                            </span>
                            {app.discord && (
                              <span className="flex items-center gap-1">
                                <Icon name="MessageCircle" size={14} />
                                {app.discord}
                              </span>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{app.why_join}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Подано: {new Date(app.created_at).toLocaleString('ru-RU')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Icon name="User" size={24} className="text-primary" />
                  {selectedApp.username}
                </DialogTitle>
                <DialogDescription>
                  Заявка #{selectedApp.id} от {new Date(selectedApp.created_at).toLocaleString('ru-RU')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Возраст</Label>
                    <p className="font-medium">{selectedApp.age} лет</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Статус</Label>
                    <div className="mt-1">{getStatusBadge(selectedApp.status)}</div>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedApp.email}</p>
                </div>
                {selectedApp.discord && (
                  <div>
                    <Label className="text-muted-foreground">Discord</Label>
                    <p className="font-medium">{selectedApp.discord}</p>
                  </div>
                )}
                <div>
                  <Label className="text-muted-foreground">Опыт игры</Label>
                  <p className="mt-1">{selectedApp.experience}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Почему хочет присоединиться</Label>
                  <p className="mt-1">{selectedApp.why_join}</p>
                </div>
                {selectedApp.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => updateStatus(selectedApp.id, 'approved')}
                    >
                      <Icon name="Check" size={18} className="mr-2" />
                      Одобрить
                    </Button>
                    <Button 
                      variant="destructive"
                      className="flex-1"
                      onClick={() => updateStatus(selectedApp.id, 'rejected')}
                    >
                      <Icon name="X" size={18} className="mr-2" />
                      Отклонить
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
