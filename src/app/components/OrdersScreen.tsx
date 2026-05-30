import { MessageCircle, Star, Leaf, Clock, CheckCircle, Package, Truck, ShoppingBag, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import LiveTrackingMap from './LiveTrackingMap';
import FullscreenMapScreen from './FullscreenMapScreen';

interface OrdersScreenProps {
  onOpenReviews: (restaurantName: string, rating: number) => void;
  onOpenChat: (restaurantName: string) => void;
}

interface OrderItem {
  quantity: number;
  name: string;
}

interface Order {
  id: string;
  orderNumber: string;
  restaurant: {
    name: string;
    logo: string;
  };
  items: OrderItem[];
  totalValue: number;
  date: string;
  status: 'delivered' | 'active';
  estimatedTime?: string;
  currentStage?: 'confirmed' | 'preparing' | 'delivery';
  isEcoFriendly?: boolean;
  loyaltyPoints?: number;
}

export default function OrdersScreen({ onOpenReviews, onOpenChat }: OrdersScreenProps) {
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);

  const activeOrder: Order | null = {
    id: '1',
    orderNumber: '#1234',
    restaurant: {
      name: 'Natural Campus',
      logo: 'https://images.unsplash.com/photo-1581894408375-cc0738fef8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150'
    },
    items: [
      { quantity: 1, name: 'Bowl Vegano Completo' },
      { quantity: 1, name: 'Suco de Laranja Natural' }
    ],
    totalValue: 22.90,
    date: 'Hoje, 11:45',
    status: 'active',
    estimatedTime: '12:15 - 12:25',
    currentStage: 'preparing',
    isEcoFriendly: true,
    loyaltyPoints: 1
  };

  const previousOrders: Order[] = [
    {
      id: '2',
      orderNumber: '#1233',
      restaurant: {
        name: 'Sabor Universitário',
        logo: 'https://images.unsplash.com/photo-1766848605292-06f971164f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150'
      },
      items: [
        { quantity: 1, name: 'Marmita Executiva' },
        { quantity: 1, name: 'Refrigerante Lata' }
      ],
      totalValue: 21.90,
      date: 'Ontem, 19:30',
      status: 'delivered',
      isEcoFriendly: false,
      loyaltyPoints: 1
    },
    {
      id: '3',
      orderNumber: '#1232',
      restaurant: {
        name: 'Tokyo Express',
        logo: 'https://images.unsplash.com/photo-1562296761-5d2add43d7d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150'
      },
      items: [
        { quantity: 1, name: 'Combo Sushi 20 Peças' },
        { quantity: 1, name: 'Temaki Salmão' }
      ],
      totalValue: 45.80,
      date: '28 Mar, 20:15',
      status: 'delivered',
      isEcoFriendly: true,
      loyaltyPoints: 2
    },
    {
      id: '4',
      orderNumber: '#1231',
      restaurant: {
        name: 'Pizza Campus',
        logo: 'https://images.unsplash.com/photo-1653557659183-9701378e2c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150'
      },
      items: [
        { quantity: 1, name: 'Pizza Grande Calabresa' },
        { quantity: 2, name: 'Guaraná 2L' }
      ],
      totalValue: 52.90,
      date: '27 Mar, 21:00',
      status: 'delivered',
      isEcoFriendly: false,
      loyaltyPoints: 2
    },
    {
      id: '5',
      orderNumber: '#1230',
      restaurant: {
        name: 'Natural Campus',
        logo: 'https://images.unsplash.com/photo-1581894408375-cc0738fef8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150'
      },
      items: [
        { quantity: 1, name: 'Salada Caesar' },
        { quantity: 1, name: 'Suco Verde Detox' }
      ],
      totalValue: 24.90,
      date: '26 Mar, 12:30',
      status: 'delivered',
      isEcoFriendly: true,
      loyaltyPoints: 1
    }
  ];

  const renderProgressBar = (currentStage: 'confirmed' | 'preparing' | 'delivery') => {
    const stages = [
      { key: 'confirmed', label: 'Confirmado', icon: CheckCircle },
      { key: 'preparing', label: 'Em Preparo', icon: Package },
      { key: 'delivery', label: 'Saiu p/ Entrega', icon: Truck }
    ];

    const currentIndex = stages.findIndex(s => s.key === currentStage);

    return (
      <div className="flex items-center justify-between mt-4 mb-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={stage.key} className="flex-1 flex items-center">
              {/* Stage Circle */}
              <div className="relative flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-[#7FDBCA] text-white'
                      : 'bg-gray-200 dark:bg-[#2A2A2A] text-gray-400 dark:text-gray-600'
                  } ${isCurrent ? 'ring-4 ring-[#7FDBCA]/30 scale-110' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p
                  className={`text-xs mt-2 text-center ${
                    isActive ? 'text-gray-900 dark:text-gray-100 font-semibold' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {stage.label}
                </p>
              </div>

              {/* Connecting Line */}
              {index < stages.length - 1 && (
                <div
                  className={`h-1 flex-1 -mt-6 mx-1 rounded-full transition-all ${
                    index < currentIndex ? 'bg-[#7FDBCA]' : 'bg-gray-200 dark:bg-[#2A2A2A]'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const deliveryPerson = {
    name: 'João Silva',
    distance: '500m de distância',
    photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200'
  };

  return (
    <>
      {/* Fullscreen Map Overlay */}
      {showFullscreenMap && (
        <FullscreenMapScreen
          onClose={() => setShowFullscreenMap(false)}
          deliveryPerson={deliveryPerson}
        />
      )}

      <div className="h-full overflow-y-auto pb-8 bg-gray-50 dark:bg-[#0A0A0A] transition-colors">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-700 px-5 py-4 transition-colors">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 text-center">Meus Pedidos</h1>
      </div>

      {/* Active Order Section */}
      {activeOrder && (
        <div className="px-5 py-6">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Acompanhe seu Pedido</h2>

          {/* Active Order Card */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border-2 border-[#7FDBCA] shadow-lg overflow-hidden transition-colors">
            {/* Card Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#7FDBCA]/10 to-[#FFB088]/10 dark:from-[#7FDBCA]/20 dark:to-[#FFB088]/20 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                {/* Restaurant Logo */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md flex-shrink-0">
                  <ImageWithFallback
                    src={activeOrder.restaurant.logo}
                    alt={activeOrder.restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Restaurant Info */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {activeOrder.restaurant.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Pedido {activeOrder.orderNumber}</p>
                </div>

                {/* Chat Button */}
                <button
                  onClick={() => onOpenChat(activeOrder.restaurant.name)}
                  className="w-10 h-10 bg-[#7FDBCA] rounded-full flex items-center justify-center shadow-md hover:bg-[#6CCBB9] active:scale-95 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-5 py-4">
              {renderProgressBar(activeOrder.currentStage!)}
            </div>

            {/* Live Tracking Map */}
            <div className="px-5 pb-4">
              <LiveTrackingMap onExpandMap={() => setShowFullscreenMap(true)} />
            </div>

            {/* Estimated Time */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-center gap-2 bg-[#7FDBCA]/10 dark:bg-[#7FDBCA]/20 rounded-xl py-3">
                <Clock className="w-5 h-5 text-[#52BFB0]" />
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Previsão de chegada: <span className="text-[#52BFB0]">{activeOrder.estimatedTime}</span>
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="px-5 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Itens do pedido:</p>
              {activeOrder.items.map((item, index) => (
                <p key={index} className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {item.quantity}x {item.name}
                </p>
              ))}
            </div>

            {/* Total Value */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  R$ {activeOrder.totalValue.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Previous Orders Section */}
      <div className="px-5 py-6">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Pedidos Anteriores</h2>

        <div className="space-y-4">
          {previousOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all"
            >
              {/* Card Header */}
              <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {/* Restaurant Logo (Grayscale for history) */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 flex-shrink-0 opacity-70">
                    <ImageWithFallback
                      src={order.restaurant.logo}
                      alt={order.restaurant.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {order.restaurant.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-700">Entregue</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-4 py-3 bg-gray-50 dark:bg-[#121212]">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Itens:</p>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
                      {item.quantity}x {item.name}
                    </p>
                  ))}
                </div>
              </div>

              {/* Total Value */}
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Valor Total</span>
                  <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                    R$ {order.totalValue.toFixed(2)}
                  </span>
                </div>

                {/* Eco-Friendly & Loyalty Badges */}
                <div className="flex gap-2 mb-3">
                  {order.isEcoFriendly && (
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                      <Leaf className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Eco-friendly</span>
                    </div>
                  )}
                  {order.loyaltyPoints && (
                    <div className="flex items-center gap-1 bg-[#FFB088]/10 px-2 py-1 rounded-lg">
                      <Award className="w-3 h-3 text-[#FFB088]" />
                      <span className="text-xs font-medium text-[#FFB088]">
                        +{order.loyaltyPoints} {order.loyaltyPoints === 1 ? 'ponto' : 'pontos'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* Rate Button */}
                  <button
                    onClick={() => onOpenReviews(order.restaurant.name, 0)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:border-gray-300 dark:hover:border-gray-500 active:scale-98 transition-all"
                  >
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Avaliar</span>
                  </button>

                  {/* Reorder Button */}
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#7FDBCA] rounded-xl text-white font-semibold shadow-sm hover:bg-[#6CCBB9] active:scale-98 transition-all">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm">Pedir Novamente</span>
                  </button>
                </div>

                {/* Loyalty Message */}
                {order.loyaltyPoints && (
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                    🎉 +1 ponto para sua refeição grátis!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State (se não houver pedidos) */}
      {previousOrders.length === 0 && !activeOrder && (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="w-24 h-24 bg-gray-100 dark:bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Nenhum pedido ainda
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
            Que tal fazer seu primeiro pedido? Explore restaurantes incríveis perto do campus!
          </p>
        </div>
      )}
      </div>
    </>
  );
}
