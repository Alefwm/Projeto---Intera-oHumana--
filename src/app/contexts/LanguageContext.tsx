import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt-BR' | 'en-US';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations: Record<Language, Record<string, string>> = {
  'pt-BR': {
    // Navigation
    'nav.home': 'Início',
    'nav.search': 'Busca',
    'nav.orders': 'Pedidos',
    'nav.profile': 'Perfil',

    // Top Bar
    'topbar.deliver_to': 'Entregar em',

    // Home
    'home.what_need': 'O que você precisa agora?',
    'home.recommended': 'Recomendados perto do campus',
    'home.order_now': 'Peça agora!',

    // Filters
    'filter.quick_orders': 'Pedidos Rápidos',
    'filter.up_to_20': 'Até R$ 20,00',
    'filter.healthy': 'Saudáveis',
    'filter.sweets': 'Doces',
    'filter.market': 'Mercado',
    'filter.pharmacy': 'Farmácia',
    'filter.pool_order': 'Pedido Pool',

    // Orders Screen
    'orders.title': 'Meus Pedidos',
    'orders.track': 'Acompanhe seu Pedido',
    'orders.previous': 'Pedidos Anteriores',
    'orders.delivered': 'Entregue',
    'orders.items': 'Itens',
    'orders.total': 'Valor Total',
    'orders.rate': 'Avaliar',
    'orders.reorder': 'Pedir Novamente',
    'orders.empty': 'Nenhum pedido ainda',
    'orders.empty_desc': 'Que tal fazer seu primeiro pedido? Explore restaurantes incríveis perto do campus!',
    'orders.confirmed': 'Confirmado',
    'orders.preparing': 'Em Preparo',
    'orders.delivery': 'Saiu p/ Entrega',
    'orders.estimated_arrival': 'Previsão de chegada',
    'orders.items_label': 'Itens do pedido:',

    // Pool Order
    'pool.title': 'Pedido Pool',
    'pool.subtitle': 'Divida e economize com amigos',
    'pool.who_split': 'Quem vai dividir com você?',
    'pool.suggestions': 'Sugestões de amigos',
    'pool.invite': 'Convidar',
    'pool.how_split': 'Como vai ficar a divisão',
    'pool.estimated_total': 'Valor Total Estimado',
    'pool.economy_tip': 'Dica de Economia',
    'pool.economy_desc': 'Quanto mais pessoas no pool, menor o valor da taxa de entrega para cada um!',
    'pool.perfect_combos': 'Combos Perfeitos para Dividir',
    'pool.start_group': 'Iniciar Pedido em Grupo',
    'pool.people_in_pool': 'no pool',
    'pool.per_person': 'por pessoa',
    'pool.person': 'pessoa',
    'pool.people': 'pessoas',
    'pool.you': 'você',

    // Profile
    'profile.account_data': 'Dados da Conta',
    'profile.addresses': 'Meus Endereços',
    'profile.payment_methods': 'Formas de Pagamento',
    'profile.delivery_code': 'Código de Entrega',
    'profile.coupons': 'Cupons de Desconto',
    'profile.chat_history': 'Histórico de Conversas',
    'profile.settings': 'Configurações',
    'profile.logout': 'Sair da Conta',
    'profile.loyalty_card': 'Cartão Fidelidade',
    'profile.loyalty_desc': 'Faltam apenas',
    'profile.loyalty_meals': 'refeições',
    'profile.loyalty_bonus': 'para ganhar seu bônus de até',
    'profile.add_balance': 'Adicionar Saldo',

    // Settings
    'settings.title': 'Configurações',
    'settings.appearance': 'Aparência',
    'settings.dark_mode': 'Modo Escuro',
    'settings.dark_mode_desc': 'Ativar tema escuro',
    'settings.language': 'Idioma',
    'settings.language_desc': 'Alterar idioma do aplicativo',
    'settings.preferences': 'Preferências',
    'settings.notifications': 'Notificações',
    'settings.notifications_desc': 'Gerenciar preferências de notificação',
    'settings.legal': 'Jurídico',
    'settings.privacy': 'Política de Privacidade',
    'settings.privacy_desc': 'Ver política de privacidade',
    'settings.terms': 'Termos de Serviço',
    'settings.terms_desc': 'Ver termos de serviço',
    'settings.support': 'Suporte',
    'settings.help': 'Central de Ajuda',
    'settings.help_desc': 'Obter ajuda e suporte',

    // Chat History
    'chat.title': 'Histórico de Conversas',
    'chat.subtitle': 'Suporte aos seus pedidos',
    'chat.empty': 'Nenhuma conversa ainda',
    'chat.empty_desc': 'Suas conversas com restaurantes sobre problemas em pedidos aparecerão aqui.',
    'chat.online': 'Online',
    'chat.closed': 'Conversa encerrada',

    // Search
    'search.placeholder': 'Busque por restaurantes ou pratos',
    'search.results': 'resultados encontrados',
    'search.result': 'resultado encontrado',
    'search.no_results': 'Nenhum resultado encontrado',
    'search.try_search': 'Tente buscar por: pizza, hambúrguer, sanduíche, vegano, bolo, salada, café, italiano ou árabe',
    'search.trending': 'Em Alta no Campus',
    'search.recent': 'Buscas Recentes',

    // Reviews
    'reviews.reviews': 'avaliações',
    'reviews.photos': 'fotos de clientes mostrando o produto',
    'reviews.helpful': 'Útil',

    // Chat FAB
    'chat.how_help': 'Como podemos te ajudar hoje?',
    'chat.humanized': 'Chat Humanizado',
    'chat.restaurant': 'Falar com Restaurante',
    'chat.restaurant_time': 'Média de resposta: 5 min',
    'chat.faq': 'Dúvidas Frequentes',
    'chat.faq_desc': 'Respostas rápidas',

    // Notifications
    'notifications.title': 'Notificações',

    // Common
    'common.back': 'Voltar',
    'common.close': 'Fechar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.yes': 'Sim',
    'common.no': 'Não',
  },
  'en-US': {
    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.orders': 'Orders',
    'nav.profile': 'Profile',

    // Top Bar
    'topbar.deliver_to': 'Deliver to',

    // Home
    'home.what_need': 'What do you need now?',
    'home.recommended': 'Recommended near campus',
    'home.order_now': 'Order now!',

    // Filters
    'filter.quick_orders': 'Quick Orders',
    'filter.up_to_20': 'Up to $5.00',
    'filter.healthy': 'Healthy',
    'filter.sweets': 'Sweets',
    'filter.market': 'Market',
    'filter.pharmacy': 'Pharmacy',
    'filter.pool_order': 'Pool Order',

    // Orders Screen
    'orders.title': 'My Orders',
    'orders.track': 'Track your Order',
    'orders.previous': 'Previous Orders',
    'orders.delivered': 'Delivered',
    'orders.items': 'Items',
    'orders.total': 'Total Value',
    'orders.rate': 'Rate',
    'orders.reorder': 'Order Again',
    'orders.empty': 'No orders yet',
    'orders.empty_desc': 'How about making your first order? Explore amazing restaurants near campus!',
    'orders.confirmed': 'Confirmed',
    'orders.preparing': 'Preparing',
    'orders.delivery': 'Out for Delivery',
    'orders.estimated_arrival': 'Estimated arrival',
    'orders.items_label': 'Order items:',

    // Pool Order
    'pool.title': 'Pool Order',
    'pool.subtitle': 'Split and save with friends',
    'pool.who_split': 'Who will split with you?',
    'pool.suggestions': 'Friend suggestions',
    'pool.invite': 'Invite',
    'pool.how_split': 'How the split will work',
    'pool.estimated_total': 'Estimated Total',
    'pool.economy_tip': 'Saving Tip',
    'pool.economy_desc': 'The more people in the pool, the lower the delivery fee for each one!',
    'pool.perfect_combos': 'Perfect Combos to Share',
    'pool.start_group': 'Start Group Order',
    'pool.people_in_pool': 'in pool',
    'pool.per_person': 'per person',
    'pool.person': 'person',
    'pool.people': 'people',
    'pool.you': 'you',

    // Profile
    'profile.account_data': 'Account Data',
    'profile.addresses': 'My Addresses',
    'profile.payment_methods': 'Payment Methods',
    'profile.delivery_code': 'Delivery Code',
    'profile.coupons': 'Discount Coupons',
    'profile.chat_history': 'Chat History',
    'profile.settings': 'Settings',
    'profile.logout': 'Sign Out',
    'profile.loyalty_card': 'Loyalty Card',
    'profile.loyalty_desc': 'Only',
    'profile.loyalty_meals': 'meals left',
    'profile.loyalty_bonus': 'to earn your bonus up to',
    'profile.add_balance': 'Add Balance',

    // Settings
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.dark_mode': 'Dark Mode',
    'settings.dark_mode_desc': 'Enable dark theme',
    'settings.language': 'Language',
    'settings.language_desc': 'Change app language',
    'settings.preferences': 'Preferences',
    'settings.notifications': 'Notifications',
    'settings.notifications_desc': 'Manage notification preferences',
    'settings.legal': 'Legal',
    'settings.privacy': 'Privacy Policy',
    'settings.privacy_desc': 'View privacy policy',
    'settings.terms': 'Terms of Service',
    'settings.terms_desc': 'View terms of service',
    'settings.support': 'Support',
    'settings.help': 'Help Center',
    'settings.help_desc': 'Get help and support',

    // Chat History
    'chat.title': 'Chat History',
    'chat.subtitle': 'Support for your orders',
    'chat.empty': 'No conversations yet',
    'chat.empty_desc': 'Your conversations with restaurants about order issues will appear here.',
    'chat.online': 'Online',
    'chat.closed': 'Conversation closed',

    // Search
    'search.placeholder': 'Search for restaurants or dishes',
    'search.results': 'results found',
    'search.result': 'result found',
    'search.no_results': 'No results found',
    'search.try_search': 'Try searching: pizza, burger, sandwich, vegan, cake, salad, coffee, italian or arabic',
    'search.trending': 'Trending on Campus',
    'search.recent': 'Recent Searches',

    // Reviews
    'reviews.reviews': 'reviews',
    'reviews.photos': 'customer photos showing the product',
    'reviews.helpful': 'Helpful',

    // Chat FAB
    'chat.how_help': 'How can we help you today?',
    'chat.humanized': 'Humanized Chat',
    'chat.restaurant': 'Talk to Restaurant',
    'chat.restaurant_time': 'Average response: 5 min',
    'chat.faq': 'Frequently Asked Questions',
    'chat.faq_desc': 'Quick answers',

    // Notifications
    'notifications.title': 'Notifications',

    // Common
    'common.back': 'Back',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      return (saved as Language) || 'pt-BR';
    } catch {
      return 'pt-BR';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.warn('Não foi possível salvar preferência de idioma:', error);
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
