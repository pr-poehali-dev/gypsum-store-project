import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    { id: 1, name: 'Античный бюст', price: 4500, image: 'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/9008466e-b9e3-4900-a3d0-1b04b2a09527.jpg', category: 'Скульптуры' },
    { id: 2, name: 'Декоративная ваза', price: 3200, image: 'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/75bc2f1c-10f8-4310-af8a-0ac90c3e2db9.jpg', category: 'Вазы' },
    { id: 3, name: 'Панель с орнаментом', price: 5800, image: 'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/f5468cf7-80f6-4f8c-bfda-ade6e2eac0b0.jpg', category: 'Панели' },
    { id: 4, name: 'Классическая колонна', price: 12000, image: 'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/9008466e-b9e3-4900-a3d0-1b04b2a09527.jpg', category: 'Архитектура' },
    { id: 5, name: 'Барельеф цветочный', price: 6500, image: 'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/75bc2f1c-10f8-4310-af8a-0ac90c3e2db9.jpg', category: 'Барельефы' },
    { id: 6, name: 'Поднос декоративный', price: 2800, image: 'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/07c35903-d9f3-4594-a57f-d4c883ee86b4.jpg', category: 'Аксессуары' },
    { id: 7, name: 'Подсвечник классический', price: 1900, image: 'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/66a86627-7185-43ff-8de7-39ffd63935f8.jpg', category: 'Аксессуары' },
  ];

  const galleryImages = [
    'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/9008466e-b9e3-4900-a3d0-1b04b2a09527.jpg',
    'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/75bc2f1c-10f8-4310-af8a-0ac90c3e2db9.jpg',
    'https://cdn.poehali.dev/projects/5f7834b9-b272-42e4-9708-b4459b260f67/files/f5468cf7-80f6-4f8c-bfda-ade6e2eac0b0.jpg',
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">GYPSUM CREATIONS</h1>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => setActiveSection('contacts')}
                >
                  Контакты
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setActiveSection('about')}
                >
                  О нас
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setActiveSection('delivery')}
                >
                  Доставка
                </Button>
              </nav>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Корзина</h2>
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="flex gap-4 p-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                              <p className="font-bold mt-1">{item.price} ₽</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                                <Icon name="Minus" size={16} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                                <Icon name="Plus" size={16} />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Итого:</span>
                          <span>{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full mt-4" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-16">
            <section className="text-center space-y-6">
              <h2 className="text-5xl font-bold text-foreground mb-4">Изделия из гипса ручной работы</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Создаём уникальные декоративные элементы для вашего интерьера. 
                Высокое качество, индивидуальный подход, классическая элегантность.
              </p>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-8 text-center">Популярные изделия</h3>
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {products.map(product => (
                    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden hover-scale transition-all">
                        <CardContent className="p-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-64 object-cover"
                          />
                          <div className="p-6 space-y-3">
                            <Badge variant="secondary">{product.category}</Badge>
                            <h4 className="text-xl font-semibold">{product.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                              <Button onClick={() => addToCart(product)} className="bg-secondary hover:bg-secondary/90">
                                <Icon name="ShoppingCart" size={18} className="mr-2" />
                                В корзину
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>

            <section className="bg-muted rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-8 text-center">Наши работы</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {galleryImages.map((img, idx) => (
                  <Dialog key={idx}>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer overflow-hidden rounded-lg hover-scale transition-all">
                        <img 
                          src={img} 
                          alt={`Работа ${idx + 1}`} 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <img src={img} alt={`Работа ${idx + 1}`} className="w-full h-auto" />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-8 max-w-xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-center">Индивидуальный заказ</h3>
              <p className="text-muted-foreground text-center mb-8">
                Закажите уникальное изделие по вашему эскизу
              </p>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" className="h-12" />
                <Input placeholder="Телефон" className="h-12" />
                <Textarea 
                  placeholder="Что хотите заказать?" 
                  rows={4}
                />
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                  Отправить заявку
                </Button>
              </form>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center">Каталог товаров</h2>
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {products.map(product => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden hover-scale transition-all">
                      <CardContent className="p-0">
                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                        <div className="p-6 space-y-3">
                          <Badge variant="secondary">{product.category}</Badge>
                          <h4 className="text-xl font-semibold">{product.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                            <Button onClick={() => addToCart(product)} className="bg-secondary hover:bg-secondary/90">
                              <Icon name="ShoppingCart" size={18} className="mr-2" />
                              В корзину
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-center">О нас</h2>
            <p className="text-lg text-muted-foreground">
              Мы — команда профессионалов, создающих изделия из гипса ручной работы уже более 10 лет. 
              Каждое наше изделие — это произведение искусства, выполненное с любовью к деталям.
            </p>
            <p className="text-lg text-muted-foreground">
              Используем только высококачественные материалы и классические техники работы с гипсом. 
              Наши мастера создают как копии античных скульптур, так и авторские работы по индивидуальным эскизам.
            </p>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-center">Доставка и оплата</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Truck" size={24} />
                    Доставка
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• По Москве — 500 ₽ (бесплатно от 10 000 ₽)</li>
                    <li>• По России — рассчитывается индивидуально</li>
                    <li>• Самовывоз — бесплатно</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="CreditCard" size={24} />
                    Оплата
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Наличными при получении</li>
                    <li>• Банковской картой онлайн</li>
                    <li>• Безналичный расчёт для юр. лиц</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-center">Контакты</h2>
            <Card>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={24} className="text-secondary mt-1" />
                  <div>
                    <p className="font-semibold">Адрес</p>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="text-secondary mt-1" />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-secondary mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@gypsumcreations.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={24} className="text-secondary mt-1" />
                  <div>
                    <p className="font-semibold">Режим работы</p>
                    <p className="text-muted-foreground">Пн-Пт: 10:00 - 19:00</p>
                    <p className="text-muted-foreground">Сб-Вс: 11:00 - 17:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 GYPSUM CREATIONS. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;