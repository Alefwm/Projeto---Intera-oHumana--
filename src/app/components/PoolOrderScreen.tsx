import { ChevronLeft, Plus, Users, UtensilsCrossed } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';


interface PoolOrderScreenProps {
  onClose: () => void;
}


export default function PoolOrderScreen({ onClose }: PoolOrderScreenProps) {
  const { t } = useLanguage();
  const [selectedFriends, setSelectedFriends] = useState([
    { id: 1, name: 'Você', avatar: '👤', amount: 20.00, isUser: true },
    { id: 2, name: 'Caio', avatar: 'https://i.pravatar.cc/150?img=12', amount: 20.00, isUser: false },
    { id: 3, name: 'Ana', avatar: 'https://i.pravatar.cc/150?img=47', amount: 20.00, isUser: false }
  ]);

  const [availableFriends, setAvailableFriends] = useState([
    { id: 4, name: 'Maria', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 5, name: 'Pedro', avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: 6, name: 'Julia', avatar: 'https://i.pravatar.cc/150?img=45' },
    { id: 7, name: 'Lucas', avatar: 'https://i.pravatar.cc/150?img=60' },
    { id: 8, name: 'Sofia', avatar: 'https://i.pravatar.cc/150?img=29' }
  ]);

  const [selectedCombo, setSelectedCombo] = useState<number | null>(null);

  const comboDishes = [
   {
    id: 1,
    name: 'Salada',
    description: 'Alface, Tomates, brocolis',
    price: 59.90,
    image: 'https://cdn0.tudoreceitas.com/pt/posts/6/8/2/salada_de_salmao_e_pepino_3286_1200.jpg',
    servings: '3-4 pessoas',
    
  },
    {
      id: 2,
      name: 'Combo Burger Trio',
      description: '3 burgers artesanais + batatas',
      price: 54.90,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      servings: '3 pessoas'
    },
    {
      id: 3,
      name: 'Balde Fit Saudável',
      description: 'Frango grelhado + 3 acompanhamentos',
      price: 64.90,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      servings: '3-4 pessoas'
    }
  ];

  const addFriendToPool = (friend: { id: number; name: string; avatar: string }) => {
    const selectedComboData = comboDishes.find(d => d.id === selectedCombo);
    const newTotalAmount = selectedComboData ? selectedComboData.price : selectedFriends.reduce((sum, f) => sum + f.amount, 0);
    const newAmount = newTotalAmount / (selectedFriends.length + 1);

    setSelectedFriends([
      ...selectedFriends.map(f => ({ ...f, amount: newAmount })),
      { ...friend, amount: newAmount, isUser: false }
    ]);

    setAvailableFriends(availableFriends.filter(f => f.id !== friend.id));
  };

  const removeFriendFromPool = (friendId: number) => {
    const friendToRemove = selectedFriends.find(f => f.id === friendId);
    if (!friendToRemove || friendToRemove.isUser) return;

    const selectedComboData = comboDishes.find(d => d.id === selectedCombo);
    const newTotalAmount = selectedComboData ? selectedComboData.price : selectedFriends.reduce((sum, f) => sum + f.amount, 0);
    const newAmount = newTotalAmount / (selectedFriends.length - 1);

    setSelectedFriends(
      selectedFriends
        .filter(f => f.id !== friendId)
        .map(f => ({ ...f, amount: newAmount }))
    );

    setAvailableFriends([
      ...availableFriends,
      { id: friendToRemove.id, name: friendToRemove.name, avatar: friendToRemove.avatar }
    ]);
  };

  const selectCombo = (comboId: number) => {
    setSelectedCombo(comboId);
    const combo = comboDishes.find(d => d.id === comboId);
    if (combo) {
      const newAmount = combo.price / selectedFriends.length;
      setSelectedFriends(selectedFriends.map(f => ({ ...f, amount: newAmount })));
    }
  };

  const selectedComboData = comboDishes.find(d => d.id === selectedCombo);
  const totalAmount = selectedComboData ? selectedComboData.price : selectedFriends.reduce((sum, friend) => sum + friend.amount, 0);

  return (
    <div className="absolute inset-0 bg-white dark:bg-[#121212] z-50 flex flex-col transition-colors">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-700 px-5 py-4 transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2A2A] active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('pool.title')}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('pool.subtitle')}</p>
          </div>
          <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Seção 1: Amigos Sugeridos */}
        <div className="px-5 py-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('pool.who_split')}</h2>
          
          {/* Avatares Selecionados */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mb-4">
            {selectedFriends.map((friend) => (
              <div key={friend.id} className="flex flex-col items-center gap-2 min-w-[70px]">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[#7FDBCA] shadow-md">
                    {friend.isUser ? (
                      <div className="w-full h-full bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] flex items-center justify-center text-2xl">
                        {friend.avatar}
                      </div>
                    ) : (
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  {!friend.isUser && (
                    <button
                      onClick={() => removeFriendFromPool(friend.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                    >
                      ×
                    </button>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200 text-center">{friend.isUser ? t('pool.you') : friend.name}</span>
              </div>
            ))}
          </div>

          {/* Amigos Sugeridos */}
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">{t('pool.suggestions')}</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {availableFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => addFriendToPool(friend)}
                className="flex flex-col items-center gap-2 min-w-[70px] active:scale-95 transition-transform"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-sm hover:border-[#7FDBCA] transition-colors">
                  <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 text-center">{friend.name}</span>
              </button>
            ))}

            {/* Botão Convidar Mais */}
            <button className="flex flex-col items-center gap-2 min-w-[70px] active:scale-95 transition-transform">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFB088] to-[#FF9E6B] flex items-center justify-center shadow-md">
                <Plus className="w-8 h-8 text-white stroke-[3]" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200 text-center">{t('pool.invite')}</span>
            </button>
          </div>
        </div>

        {/* Seção 2: Divisão de Valor */}
        <div className="px-5 py-6 bg-gradient-to-br from-[#7FDBCA]/5 to-[#FFB088]/5 dark:from-[#7FDBCA]/10 dark:to-[#FFB088]/10">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('pool.how_split')}</h2>

          {/* Card de Valor Total */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 shadow-lg border-2 border-[#7FDBCA]/20 dark:border-[#7FDBCA]/30 mb-4 transition-colors">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('pool.estimated_total')}</p>
              <p className="text-4xl font-bold text-[#52BFB0]">R$ {totalAmount.toFixed(2)}</p>
            </div>

            {/* Divisor */}
            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>

            {/* Lista de Divisão */}
            <div className="space-y-3">
              {selectedFriends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700">
                      {friend.isUser ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] flex items-center justify-center text-lg">
                          {friend.avatar}
                        </div>
                      ) : (
                        <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {friend.isUser ? t('pool.you') : friend.name}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">R$ {friend.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 transition-colors">
            <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-blue-900 dark:text-blue-300 font-medium mb-1">{t('pool.economy_tip')}</p>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                {t('pool.economy_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Seção 3: Sugestões de Combos */}
        <div className="px-5 py-6">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('pool.perfect_combos')}</h2>

          <div className="space-y-4">
            {comboDishes.map((dish) => (
              <button
                key={dish.id}
                onClick={() => selectCombo(dish.id)}
                className={`w-full text-left bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-sm border-2 hover:shadow-md transition-all ${
                  selectedCombo === dish.id
                    ? 'border-[#7FDBCA] ring-2 ring-[#7FDBCA]/20'
                    : 'border-gray-100 dark:border-gray-700'
                }`}
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-28 h-28 flex-shrink-0 overflow-hidden">
                    <ImageWithFallback
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-3 pr-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">{dish.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">{dish.description}</p>

                    {/* Badge e Preço */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-[#7FDBCA]/10 dark:bg-[#7FDBCA]/20 px-2 py-1 rounded-full">
                        <UtensilsCrossed className="w-3 h-3 text-[#52BFB0]" />
                        <span className="text-xs font-medium text-[#52BFB0]">{dish.servings}</span>
                      </div>
                      <span className="text-lg font-bold text-[#FFB088]">R$ {dish.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Button - Fixed */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#1E1E1E] border-t border-gray-200 dark:border-gray-700 px-5 py-4 shadow-lg transition-colors">
        <button className="w-full bg-gradient-to-r from-[#7FDBCA] to-[#5FC9B8] text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl active:scale-98 transition-all">
          <div className="flex items-center justify-center gap-2">
            <Users className="w-5 h-5" />
            <span>{t('pool.start_group')}</span>
          </div>
        </button>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
          {selectedFriends.length} {selectedFriends.length === 1 ? t('pool.person') : t('pool.people')} {t('pool.people_in_pool')} • R$ {(totalAmount / selectedFriends.length).toFixed(2)} {t('pool.per_person')}
        </p>
      </div>
    </div>
  );
}
