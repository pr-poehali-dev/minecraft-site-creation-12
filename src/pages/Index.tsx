import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [copiedIP, setCopiedIP] = useState(false);
  const serverIP = 'play.myserver.net';

  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopiedIP(true);
    setTimeout(() => setCopiedIP(false), 2000);
  };

  const features = [
    {
      icon: 'Zap',
      title: 'Высокая производительность',
      description: 'Мощный сервер без лагов и задержек'
    },
    {
      icon: 'Shield',
      title: 'Защита от гриферов',
      description: 'Продуманная система защиты территорий'
    },
    {
      icon: 'Users',
      title: 'Дружное комьюнити',
      description: 'Активное и отзывчивое сообщество игроков'
    },
    {
      icon: 'Trophy',
      title: 'Уникальные режимы',
      description: 'Эксклюзивные игровые режимы и ивенты'
    }
  ];

  const rules = [
    {
      number: 1,
      title: 'Уважение к игрокам',
      description: 'Запрещены оскорбления, угрозы и токсичное поведение'
    },
    {
      number: 2,
      title: 'Запрет читов',
      description: 'Использование модов и читов строго запрещено'
    },
    {
      number: 3,
      title: 'Защита построек',
      description: 'Гриферство и воровство караются баном'
    },
    {
      number: 4,
      title: 'Адекватность',
      description: 'Спам, флуд и реклама других серверов запрещены'
    }
  ];

  const donatePackages = [
    {
      name: 'VIP',
      price: '199₽',
      features: ['Цветной ник', 'Доступ к /fly', '3 региона', 'Приоритетный вход'],
      popular: false
    },
    {
      name: 'Premium',
      price: '399₽',
      features: ['Все из VIP', 'Уникальный префикс', '10 регионов', '/hat команда', 'Набор ресурсов'],
      popular: true
    },
    {
      name: 'Deluxe',
      price: '799₽',
      features: ['Все из Premium', 'Кастомная броня', 'Неограниченные регионы', 'Доступ к /god', 'Эксклюзивные питомцы'],
      popular: false
    }
  ];

  const news = [
    {
      date: '2026-01-03',
      title: 'Новогоднее обновление',
      description: 'Добавлены праздничные ивенты, новые квесты и зимние локации!',
      type: 'update'
    },
    {
      date: '2026-01-01',
      title: 'PvP турнир',
      description: 'Грандиозный турнир 5 января! Призовой фонд 5000₽',
      type: 'event'
    },
    {
      date: '2025-12-28',
      title: 'Обновление экономики',
      description: 'Переработана игровая экономика, добавлены новые товары в магазин',
      type: 'update'
    }
  ];

  return (
    <div className="min-h-screen dark bg-background">
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Box" size={24} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MyServer</span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">О сервере</a>
              <a href="#rules" className="text-muted-foreground hover:text-foreground transition-colors">Правила</a>
              <a href="#donate" className="text-muted-foreground hover:text-foreground transition-colors">Донат</a>
              <a href="#news" className="text-muted-foreground hover:text-foreground transition-colors">Новости</a>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="Users" size={18} className="mr-2" />
              Онлайн: 128
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Версия 1.20.4</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Добро пожаловать на MyServer
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Лучший Minecraft сервер с выживанием, мини-играми и дружным комьюнити
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-6 py-4 w-full sm:w-auto">
                <Icon name="Server" size={24} className="text-primary" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">IP сервера</div>
                  <div className="font-mono font-semibold">{serverIP}</div>
                </div>
              </div>
              <Button size="lg" onClick={copyIP} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <Icon name={copiedIP ? 'Check' : 'Copy'} size={18} className="mr-2" />
                {copiedIP ? 'Скопировано!' : 'Копировать IP'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>24/7 онлайн</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Globe" size={16} className="text-primary" />
                <span>Без вайплистов</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={16} className="text-primary" />
                <span>Регулярные ивенты</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Особенности сервера</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы создали идеальное место для игры в Minecraft с друзьями
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all hover:scale-105 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Правила сервера</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Соблюдайте правила, чтобы игра была комфортной для всех
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {rules.map((rule, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-all animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">{rule.number}</span>
                    </div>
                    <CardTitle className="text-lg">{rule.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{rule.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Донат привилегии</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Поддержите проект и получите уникальные возможности
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {donatePackages.map((pkg, index) => (
              <Card key={index} className={`relative border-border/50 hover:scale-105 transition-all animate-scale-in ${pkg.popular ? 'border-primary shadow-lg shadow-primary/20' : ''}`} style={{ animationDelay: `${index * 150}ms` }}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Популярный</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                    <span className="text-muted-foreground">/месяц</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={pkg.popular ? 'default' : 'outline'}>
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Новости и события</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Следите за обновлениями и предстоящими ивентами
            </p>
          </div>
          <Tabs defaultValue="all" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="updates">Обновления</TabsTrigger>
              <TabsTrigger value="events">События</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 animate-fade-in">
              {news.map((item, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={item.type === 'event' ? 'border-primary/50 text-primary' : ''}>
                            <Icon name={item.type === 'event' ? 'Calendar' : 'Sparkles'} size={14} className="mr-1" />
                            {item.type === 'event' ? 'Событие' : 'Обновление'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="updates" className="space-y-4 animate-fade-in">
              {news.filter(n => n.type === 'update').map((item, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            <Icon name="Sparkles" size={14} className="mr-1" />
                            Обновление
                          </Badge>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="events" className="space-y-4 animate-fade-in">
              {news.filter(n => n.type === 'event').map((item, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-primary/50 text-primary">
                            <Icon name="Calendar" size={14} className="mr-1" />
                            Событие
                          </Badge>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <footer className="py-12 border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Box" size={20} className="text-primary-foreground" />
                </div>
                <span className="font-bold">MyServer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучший Minecraft сервер для игры с друзьями
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">О сервере</a></li>
                <li><a href="#rules" className="hover:text-primary transition-colors">Правила</a></li>
                <li><a href="#donate" className="hover:text-primary transition-colors">Донат</a></li>
                <li><a href="#news" className="hover:text-primary transition-colors">Новости</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover:border-primary/50">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="hover:border-primary/50">
                  <Icon name="Send" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="hover:border-primary/50">
                  <Icon name="Youtube" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 MyServer. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
