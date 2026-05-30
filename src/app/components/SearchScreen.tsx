import { Search, Clock, X, TrendingUp, Star, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useMemo, useState, useEffect, useRef } from 'react';

interface SearchScreenProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClose: () => void;
  trendingSearches: string[];
  recentSearches: string[];
  onOpenReviews: (restaurantName: string, rating: number) => void;
  onAddRecentSearch: (query: string) => void;
  isFocused?: boolean;
  onFocus?: () => void;
}

interface Restaurant {
  id: number;
  name: string;
  category: string;
  image: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  tags: string[];
}

export default function SearchScreen({
  searchQuery,
  setSearchQuery,
  onClose,
  trendingSearches,
  recentSearches,
  onOpenReviews,
  onAddRecentSearch,
  isFocused,
  onFocus
}: SearchScreenProps) {
  const [showKeyboard, setShowKeyboard] = useState(true);
  
  // Banco de dados de restaurantes
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Pizzaria Bella Napoli',
      category: 'Pizzaria • Italiana',
      image: 'https://images.unsplash.com/photo-1680405620826-83b0f0f61b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.8,
      deliveryTime: '25-35 min',
      distance: '1.2 km',
      tags: ['pizza', 'italiana', 'italiano']
    },
    {
      id: 2,
      name: 'Pizzaria do Campus',
      category: 'Pizzaria • Fast Food',
      image: 'https://images.unsplash.com/photo-1680405620826-83b0f0f61b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.5,
      deliveryTime: '20-30 min',
      distance: '0.8 km',
      tags: ['pizza']
    },
    {
      id: 3,
      name: 'Burger Station',
      category: 'Hamburgueria • Fast Food',
      image: 'https://images.unsplash.com/photo-1610970878459-a0e464d7592b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.7,
      deliveryTime: '15-25 min',
      distance: '1.0 km',
      tags: ['hamburguer', 'hamburger', 'burger']
    },
    {
      id: 4,
      name: 'The Burger Lab',
      category: 'Hamburgueria Gourmet',
      image: 'https://images.unsplash.com/photo-1610970878459-a0e464d7592b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.9,
      deliveryTime: '30-40 min',
      distance: '2.1 km',
      tags: ['hamburguer', 'hamburger', 'burger']
    },
    {
      id: 5,
      name: 'Verde Vida',
      category: 'Vegano • Saudável',
      image: 'https://images.unsplash.com/photo-1591803970266-37c21cfd7c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.8,
      deliveryTime: '20-30 min',
      distance: '1.5 km',
      tags: ['vegano', 'vegan', 'saudavel', 'salada']
    },
    {
      id: 6,
      name: 'Naturalmente Veg',
      category: 'Vegetariano • Vegano',
      image: 'https://images.unsplash.com/photo-1591803970266-37c21cfd7c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.6,
      deliveryTime: '25-35 min',
      distance: '1.8 km',
      tags: ['vegano', 'vegan', 'vegetariano', 'salada']
    },
    {
      id: 7,
      name: 'Trattoria Italiana',
      category: 'Italiana • Massas',
      image: 'https://images.unsplash.com/photo-1662197480393-2a82030b7b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.9,
      deliveryTime: '30-40 min',
      distance: '2.3 km',
      tags: ['italiano', 'italiana', 'massa', 'pasta']
    },
    {
      id: 8,
      name: 'Café Italiano',
      category: 'Cafeteria • Italiana',
      image: 'https://images.unsplash.com/photo-1662197480393-2a82030b7b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.7,
      deliveryTime: '15-25 min',
      distance: '1.1 km',
      tags: ['cafe', 'café', 'italiano', 'italiana']
    },
    {
      id: 9,
      name: 'Restaurante Árabe Al-Shaam',
      category: 'Árabe • Mediterrânea',
      image: 'https://images.unsplash.com/photo-1697126248475-a537cc5cce28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.8,
      deliveryTime: '25-35 min',
      distance: '1.7 km',
      tags: ['arabe', 'árabe', 'esfiha', 'kebab']
    },
    {
      id: 10,
      name: 'Empório Árabe',
      category: 'Culinária Árabe',
      image: 'https://images.unsplash.com/photo-1697126248475-a537cc5cce28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.6,
      deliveryTime: '20-30 min',
      distance: '1.4 km',
      tags: ['arabe', 'árabe', 'esfiha']
    },
    {
      id: 11,
      name: 'Salad Bar Premium',
      category: 'Saladas • Saudável',
      image: 'https://images.unsplash.com/photo-1769638913684-87c75872fda7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.7,
      deliveryTime: '15-20 min',
      distance: '0.9 km',
      tags: ['salada', 'saudavel', 'vegano']
    },
    {
      id: 12,
      name: 'Doce Encanto',
      category: 'Confeitaria • Bolos',
      image: 'https://images.unsplash.com/photo-1613323885373-6e91a09b598b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.9,
      deliveryTime: '20-30 min',
      distance: '1.3 km',
      tags: ['bolo', 'doce', 'sobremesa', 'confeitaria']
    },
    {
      id: 13,
      name: 'Confeitaria Delícia',
      category: 'Bolos & Tortas',
      image: 'https://images.unsplash.com/photo-1613323885373-6e91a09b598b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.8,
      deliveryTime: '25-35 min',
      distance: '1.6 km',
      tags: ['bolo', 'doce', 'sobremesa']
    },
    {
      id: 14,
      name: 'Sandwich Club',
      category: 'Sanduíches • Deli',
      image: 'https://images.unsplash.com/photo-1768854592371-1042a977798a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.6,
      deliveryTime: '15-25 min',
      distance: '1.0 km',
      tags: ['sanduiche', 'sandwich', 'lanche']
    },
    {
      id: 15,
      name: 'Deli & Cia',
      category: 'Deli • Sanduíches Artesanais',
      image: 'https://images.unsplash.com/photo-1768854592371-1042a977798a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      rating: 4.7,
      deliveryTime: '20-30 min',
      distance: '1.4 km',
      tags: ['sanduiche', 'sandwich', 'lanche']
    }
  ];

  // Função para normalizar texto (remover acentos e converter para minúsculas)
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Filtrar restaurantes com base na busca
  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = normalizeText(searchQuery);

    return restaurants.filter((restaurant) => {
      // Verifica se a query está nas tags do restaurante
      return restaurant.tags.some((tag) =>
        normalizeText(tag).includes(normalizedQuery)
      ) || normalizeText(restaurant.name).includes(normalizedQuery) ||
        normalizeText(restaurant.category).includes(normalizedQuery);
    });
  }, [searchQuery]);

  // Função para adicionar letra ao campo de busca
  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      // Backspace
      setSearchQuery(searchQuery.slice(0, -1));
    } else if (key === 'espaço') {
      setSearchQuery(searchQuery + ' ');
    } else if (key.length === 1) {
      setSearchQuery(searchQuery + key.toLowerCase());
    }
  };

  return (
    <div className="absolute inset-0 bg-white dark:bg-[#121212] z-40 flex flex-col transition-colors">
      {/* Status Bar Spacer */}
      <div className="h-12 bg-white dark:bg-[#121212] transition-colors"></div>

      {/* Search Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7FDBCA]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busque por restaurantes ou pratos"
            className="w-full pl-12 pr-12 py-3.5 bg-gray-100 dark:bg-[#2A2A2A] rounded-2xl text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:bg-white dark:focus:bg-[#1E1E1E] transition-colors"
            autoFocus
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 active:scale-90 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Content */}
      <div className="flex-1 overflow-y-auto pb-64">
        {/* Resultados da Busca */}
        {searchQuery && filteredRestaurants.length > 0 && (
          <div className="px-5 py-6">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </h3>
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  {/* Restaurant Image */}
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Restaurant Info */}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{restaurant.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{restaurant.category}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Rating - Clickable */}
                        <button
                          onClick={() => onOpenReviews(restaurant.name, restaurant.rating)}
                          className="flex items-center gap-1 active:scale-95 transition-transform"
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{restaurant.rating}</span>
                        </button>
                        {/* Delivery Time */}
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{restaurant.deliveryTime}</span>
                        </div>
                      </div>
                      {/* Distance */}
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#7FDBCA]" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{restaurant.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nenhum resultado */}
        {searchQuery && filteredRestaurants.length === 0 && (
          <div className="px-5 py-12 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Nenhum resultado encontrado</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tente buscar por: pizza, hambúrguer, sanduíche, vegano, bolo, salada, café, italiano ou árabe
            </p>
          </div>
        )}

        {/* Sem busca ativa - mostrar sugestões */}
        {!searchQuery && (
          <>
            {/* Em Alta no Campus */}
            <div className="px-5 py-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#FFB088]" />
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Em Alta no Campus</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-gradient-to-r from-[#7FDBCA]/10 to-[#FFB088]/10 border border-[#7FDBCA]/30 dark:border-[#7FDBCA]/50 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium hover:border-[#7FDBCA] hover:shadow-sm active:scale-95 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Buscas Recentes */}
            <div className="px-5 py-6 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Buscas Recentes</h3>
              <div className="space-y-3">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="w-full flex items-center gap-3 py-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-[#2A2A2A] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 text-left">{search}</span>
                    <X className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Simulated Keyboard */}
      {showKeyboard && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-200 dark:bg-[#2A2A2A] border-t border-gray-300 dark:border-gray-700 transition-colors">
          {/* Keyboard Row 1 */}
          <div className="flex gap-1 p-1">
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
              <button
                key={key}
                className="flex-1 py-3 bg-white dark:bg-[#3A3A3A] rounded text-sm font-medium text-gray-800 dark:text-gray-100 shadow-sm active:bg-gray-100 dark:active:bg-[#4A4A4A]"
                onClick={() => handleKeyPress(key)}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Keyboard Row 2 */}
          <div className="flex gap-1 p-1">
            <div className="w-4"></div>
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
              <button
                key={key}
                className="flex-1 py-3 bg-white dark:bg-[#3A3A3A] rounded text-sm font-medium text-gray-800 dark:text-gray-100 shadow-sm active:bg-gray-100 dark:active:bg-[#4A4A4A]"
                onClick={() => handleKeyPress(key)}
              >
                {key}
              </button>
            ))}
            <div className="w-4"></div>
          </div>

          {/* Keyboard Row 3 */}
          <div className="flex gap-1 p-1">
            <button className="px-4 py-3 bg-gray-300 dark:bg-[#4A4A4A] rounded text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm active:bg-gray-200 dark:active:bg-[#5A5A5A]">
              ⇧
            </button>
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
              <button
                key={key}
                className="flex-1 py-3 bg-white dark:bg-[#3A3A3A] rounded text-sm font-medium text-gray-800 dark:text-gray-100 shadow-sm active:bg-gray-100 dark:active:bg-[#4A4A4A]"
                onClick={() => handleKeyPress(key)}
              >
                {key}
              </button>
            ))}
            <button
              className="px-4 py-3 bg-gray-300 dark:bg-[#4A4A4A] rounded text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm active:bg-gray-200 dark:active:bg-[#5A5A5A]"
              onClick={() => handleKeyPress('⌫')}
            >
              ⌫
            </button>
          </div>

          {/* Keyboard Row 4 */}
          <div className="flex gap-1 p-1 pb-2">
            <button className="px-4 py-3 bg-gray-300 dark:bg-[#4A4A4A] rounded text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm active:bg-gray-200 dark:active:bg-[#5A5A5A]">
              123
            </button>
            <button
              className="px-4 py-3 bg-white dark:bg-[#3A3A3A] rounded text-sm font-medium text-gray-800 dark:text-gray-100 shadow-sm active:bg-gray-100 dark:active:bg-[#4A4A4A]"
              onClick={() => handleKeyPress('@')}
            >
              @
            </button>
            <button
              className="flex-1 py-3 bg-white dark:bg-[#3A3A3A] rounded text-sm font-medium text-gray-800 dark:text-gray-100 shadow-sm active:bg-gray-100 dark:active:bg-[#4A4A4A]"
              onClick={() => handleKeyPress('espaço')}
            >
              espaço
            </button>
            <button
              className="px-4 py-3 bg-white dark:bg-[#3A3A3A] rounded text-sm font-medium text-gray-800 dark:text-gray-100 shadow-sm active:bg-gray-100 dark:active:bg-[#4A4A4A]"
              onClick={() => handleKeyPress('.')}
            >
              .
            </button>
            <button className="px-6 py-3 bg-[#7FDBCA] rounded text-sm font-medium text-white shadow-sm active:bg-[#5FC9B8]"
              onClick={() => {
                if (searchQuery.trim()) {
                  onAddRecentSearch(searchQuery.trim());
                }
                setShowKeyboard(false);
              }}
            >
              Buscar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}