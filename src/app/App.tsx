import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SearchScreen from "./components/SearchScreen";
import AddressSelector from "./components/AddressSelector";
import ReviewsScreen from "./components/ReviewsScreen";
import ChatScreen from "./components/ChatScreen";
import ProfileScreen from "./components/ProfileScreen";
import PoolOrderScreen from "./components/PoolOrderScreen";
import OrdersScreen from "./components/OrdersScreen";
import PaymentMethodsScreen from "./components/PaymentMethodsScreen";
import DeliveryCodeScreen from "./components/DeliveryCodeScreen";
import AccountDataScreen from "./components/AccountDataScreen";
import AddressesScreen from "./components/AddressesScreen";
import AddBalanceScreen from "./components/AddBalanceScreen";
import CouponsScreen from "./components/CouponsScreen";
import SettingsScreen from "./components/SettingsScreen";
import NotificationPreferencesScreen from "./components/NotificationPreferencesScreen";
import PrivacyPolicyScreen from "./components/PrivacyPolicyScreen";
import TermsOfServiceScreen from "./components/TermsOfServiceScreen";
import ChatHistoryScreen from "./components/ChatHistoryScreen";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import {
  MapPin,
  Bell,
  Zap,
  DollarSign,
  Leaf,
  MessageCircle,
  UserCircle,
  User,
  Home,
  Search,
  ShoppingBag,
  Star,
  Clock,
  ChevronDown,
  Candy,
  Store,
  Cross,
  X,
  HelpCircle,
  LayoutGrid,
  ScanLine,
  UtensilsCrossed,
  GraduationCap,
  LayoutDashboard,
  Telescope,
  Utensils,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";

function AppContent() {
  const { t } = useLanguage();
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  // Painel dropdown de notificações (sino)
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddressSelector, setShowAddressSelector] =
    useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    id: 1,
    name: "Campus Principal",
    details: "Av. Sen. Salgado Filho, 1610 – Prédio 2",
  });
  const [showReviews, setShowReviews] = useState(false);
  const [selectedDish, setSelectedDish] = useState<
    (typeof dishes)[0] | null
  >(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMode, setChatMode] = useState<
    "humanized" | "restaurant" | "faq"
  >("humanized");
  const [showPoolOrder, setShowPoolOrder] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showDeliveryCode, setShowDeliveryCode] = useState(false);
  const [showAccountData, setShowAccountData] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  // Tela completa de preferências de notificação (diferente do dropdown)
  const [showNotificationPreferences, setShowNotificationPreferences] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [balance, setBalance] = useState(150);
  const [recentSearches, setRecentSearches] = useState<
    string[]
  >(() => {
    // Carrega as buscas recentes do localStorage ao iniciar com proteção
    try {
      const saved = localStorage.getItem("recentSearches");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      // Se localStorage estiver bloqueado (Safari iframe), retorna array vazio
      console.warn("localStorage não disponível:", error);
      return [];
    }
  });

  const addresses = [
    {
      id: 1,
      name: "Campus Principal",
      details: "Av. Sen. Salgado Filho, 1610 – Prédio 2",
    },
    {
      id: 3,
      name: "Moradia Estudantil",
      details: "Rua Eng. Luiz Englert, 333 – Bloco A",
    },
    {
      id: 4,
      name: "Centro Acadêmico",
      details: "Av. Bento Gonçalves, 9500 – Setor 4",
    },
  ];

  const heroOffers = [
    {
      id: 1,
      title: "Marmita Saudável do Dia",
      description:
        "Frango grelhado, arroz integral, brócolis e tomate cereja",
      price: 19.9,
      image:
        "https://images.unsplash.com/photo-1762631383520-df106b252f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      id: 2,
      title: "Bowl Vegano de Quinoa",
      description:
        "Quinoa, grão de bico, vegetais frescos e molho tahine",
      price: 22.9,
      image:
        "https://images.unsplash.com/photo-1623428187425-873f16e10554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      id: 3,
      title: "Salmão Grelhado Premium",
      description:
        "Salmão fresco, legumes assados e molho de ervas",
      price: 32.9,
      image:
        "https://images.unsplash.com/photo-1759271082074-6cde09f86550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      id: 4,
      title: "Bowl Fit Completo",
      description:
        "Mix de grãos, proteína vegetal, vegetais e azeite extravirgem",
      price: 24.9,
      image:
        "https://images.unsplash.com/photo-1673292636579-2343673a945d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      id: 5,
      title: "Açaí Bowl Energético",
      description:
        "Açaí puro, frutas frescas, granola e mel orgânico",
      price: 18.9,
      image:
        "https://images.unsplash.com/photo-1643973315594-1c367425097b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
  ];

  const quickFilters = [
    {
      id: -1,
      label: "Pedido Pool",
      icon: Users,
      highlighted: true,
    }, // Novo - Primeiro item em destaque
    { id: 0, label: "Pedidos Rápidos", icon: Zap },
    { id: 1, label: "Até R$ 20,00", icon: DollarSign },
    { id: 2, label: "Saudáveis", icon: Leaf },
    { id: 3, label: "Doces", icon: Candy },
    { id: 4, label: "Mercado", icon: Store },
    { id: 5, label: "Farmácia", icon: Cross },
  ];

  const notifications = [
    {
      id: 1,
      title: "Pedido em rota de entrega",
      message:
        "Seu pedido #1234 está a caminho! Tempo estimado: 15 min",
      time: "5 min atrás",
      unread: true,
    },
    {
      id: 2,
      title: "Promoção imperdível!",
      message: "Pizza Artesanal com 30% de desconto at às 23h",
      time: "1 hora atrás",
      unread: true,
    },
    {
      id: 3,
      title: "Avalie seu último pedido",
      message:
        "Como foi sua experiência com o Sabor Universitário?",
      time: "3 horas atrás",
      unread: false,
    },
    {
      id: 4,
      title: "Cupom liberado!",
      message:
        "Você ganhou R$ 10 OFF na próxima compra acima de R$ 30",
      time: "Ontem",
      unread: false,
    },
  ];

  const trendingSearches = [
    "Marmita Fitness",
    "Açaí do DCE",
    "Pastel R$ 5,00",
    "Pizza Calabresa",
    "Suco Natural",
    "Pão de Queijo",
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroOffers.length);
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(timer);
  }, [heroOffers.length]);

  // Função para adicionar busca recente
  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;

    const updated = [
      query,
      ...recentSearches.filter((s) => s !== query),
    ].slice(0, 10);
    setRecentSearches(updated);

    // Salvar no localStorage com proteção contra bloqueio
    try {
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updated),
      );
    } catch (error) {
      // Se localStorage estiver bloqueado, apenas ignora (Safari iframe)
      console.warn(
        "Não foi possível salvar no localStorage:",
        error,
      );
    }
  };

  const dishes = [
    {
      id: 1,
      name: "Salada Fresca Premium",
      restaurant: "Vida & Saúde",
      image:
        "https://images.unsplash.com/photo-1758721218560-aec50748d450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      rating: 4.9,
      deliveryTime: "15-20 min",
      price: 18.9,
    },
    {
      id: 2,
      name: "Bowl de Frutas Tropicais",
      restaurant: "Natural Campus",
      image:
        "https://images.unsplash.com/photo-1602234382521-610b2abf9029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      rating: 4.8,
      deliveryTime: "10-15 min",
      price: 15.5,
    },
    {
      id: 3,
      name: "Marmita Executiva",
      restaurant: "Sabor Universitário",
      image:
        "https://images.unsplash.com/photo-1543353071-c953d88f7033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      rating: 4.7,
      deliveryTime: "20-25 min",
      price: 19.9,
    },
    {
      id: 4,
      name: "Sushi Fresh Box",
      restaurant: "Tokyo Express",
      image:
        "https://images.unsplash.com/photo-1763647756796-af9230245bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      rating: 4.9,
      deliveryTime: "25-30 min",
      price: 24.9,
    },
    {
      id: 5,
      name: "Bowl Vegano Completo",
      restaurant: "Verde Vida",
      image:
        "https://images.unsplash.com/photo-1719677775416-1dd6a93f1a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      rating: 4.8,
      deliveryTime: "18-22 min",
      price: 17.9,
    },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] md:flex md:items-center md:justify-center md:p-4 transition-colors">
        {/* Mobile: Full Screen | Desktop: iPhone 15 Container Preview */}
        <div className="w-full h-screen md:max-w-[393px] md:h-[852px] bg-white dark:bg-[#121212] md:rounded-[3rem] md:shadow-2xl overflow-hidden relative transition-colors">
        {/* Search Screen Overlay */}
        {searchFocused && (
          <SearchScreen
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClose={() => {
              setSearchFocused(false);
              setActiveTab("home");
              setSearchQuery(""); // Limpa o texto de busca ao fechar
            }}
            trendingSearches={trendingSearches}
            recentSearches={recentSearches}
            onOpenReviews={(restaurantName, rating) => {
              setSelectedDish({
                name: "",
                restaurant: restaurantName,
                rating,
              } as (typeof dishes)[0]);
              setShowReviews(true);
            }}
            onAddRecentSearch={addRecentSearch}
          />
        )}

        {/* Address Selector Overlay */}
        {showAddressSelector && (
          <AddressSelector
            addresses={addresses}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
            onClose={() => setShowAddressSelector(false)}
          />
        )}

        {/* Reviews Screen */}
        {showReviews && selectedDish && (
          <ReviewsScreen
            dishName={selectedDish.name}
            restaurantName={selectedDish.restaurant}
            averageRating={selectedDish.rating}
            totalReviews={167}
            onClose={() => {
              setShowReviews(false);
              setSelectedDish(null);
            }}
          />
        )}

        {/* Chat Screen */}
        {showChat && (
          <ChatScreen
            mode={chatMode}
            restaurantName={selectedDish?.restaurant}
            onClose={() => setShowChat(false)}
          />
        )}

        {/* Pool Order Screen */}
        {showPoolOrder && (
          <PoolOrderScreen
            onClose={() => setShowPoolOrder(false)}
          />
        )}

        {/* Payment Methods Screen */}
        {showPaymentMethods && (
          <PaymentMethodsScreen
            onClose={() => setShowPaymentMethods(false)}
          />
        )}

        {/* Delivery Code Screen */}
        {showDeliveryCode && (
          <DeliveryCodeScreen
            onClose={() => setShowDeliveryCode(false)}
          />
        )}

        {/* Account Data Screen */}
        {showAccountData && (
          <AccountDataScreen
            onClose={() => setShowAccountData(false)}
          />
        )}

        {/* Addresses Screen */}
        {showAddresses && (
          <AddressesScreen
            onClose={() => setShowAddresses(false)}
          />
        )}

        {/* Add Balance Screen */}
        {showAddBalance && (
          <AddBalanceScreen
            onClose={() => setShowAddBalance(false)}
            onBalanceUpdated={(newBalance) => setBalance(newBalance)}
          />
        )}

        {/* Coupons Screen */}
        {showCoupons && (
          <CouponsScreen
            onClose={() => setShowCoupons(false)}
          />
        )}

        {/* Settings Screen */}
        {showSettings && (
          <SettingsScreen
            onClose={() => setShowSettings(false)}
            onOpenNotifications={() => {
              setShowSettings(false);
              setShowNotificationPreferences(true);
            }}
            onOpenPrivacyPolicy={() => {
              setShowSettings(false);
              setShowPrivacyPolicy(true);
            }}
            onOpenTerms={() => {
              setShowSettings(false);
              setShowTerms(true);
            }}
          />
        )}

        {/* Notification Preferences Screen */}
        {showNotificationPreferences && (
          <NotificationPreferencesScreen
            onClose={() => setShowNotificationPreferences(false)}
          />
        )}

        {/* Privacy Policy Screen */}
        {showPrivacyPolicy && (
          <PrivacyPolicyScreen
            onClose={() => setShowPrivacyPolicy(false)}
          />
        )}

        {/* Terms of Service Screen */}
        {showTerms && (
          <TermsOfServiceScreen
            onClose={() => setShowTerms(false)}
          />
        )}

        {/* Chat History Screen */}
        {showChatHistory && (
          <ChatHistoryScreen
            onClose={() => setShowChatHistory(false)}
          />
        )}

        {/* Status Bar Spacer */}
        <div className="h-12 bg-white dark:bg-[#121212] transition-colors"></div>

        {/* Main Content */}
        <div className="h-full overflow-y-auto pb-24 scrollbar-hide bg-white dark:bg-[#121212] transition-colors">
          {/* Renderizar baseado na aba ativa */}
          {activeTab === "profile" ? (
            <ProfileScreen
              onOpenAccountData={() => setShowAccountData(true)}
              onOpenPaymentMethods={() => setShowPaymentMethods(true)}
              onOpenDeliveryCode={() => setShowDeliveryCode(true)}
              onOpenAddresses={() => setShowAddresses(true)}
              onOpenCoupons={() => setShowCoupons(true)}
              onOpenSettings={() => setShowSettings(true)}
              onOpenAddBalance={() => setShowAddBalance(true)}
              onOpenChatHistory={() => setShowChatHistory(true)}
            />
          ) : activeTab === "orders" ? (
            <OrdersScreen
              onOpenReviews={(restaurantName, rating) => {
                setSelectedDish({
                  name: "",
                  restaurant: restaurantName,
                  rating,
                } as (typeof dishes)[0]);
                setShowReviews(true);
              }}
              onOpenChat={(restaurantName) => {
                setSelectedDish({
                  name: "",
                  restaurant: restaurantName,
                  rating: 0,
                } as (typeof dishes)[0]);
                setChatMode("restaurant");
                setShowChat(true);
              }}
            />
          ) : (
            <>
              {/* Top Bar */}
              <div className="sticky top-0 z-20 bg-white dark:bg-[#1E1E1E] px-5 py-4 border-b border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  {/* Location */}
                  <button
                    onClick={() =>
                      setShowAddressSelector(
                        !showAddressSelector,
                      )
                    }
                    className="flex items-center gap-2 flex-1 active:scale-98 transition-transform"
                  >
                    <MapPin className="w-5 h-5 text-[#7FDBCA]" />
                    <div className="flex-1 text-left">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {t('topbar.deliver_to')}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {selectedAddress.details}
                        </p>
                        <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      </div>
                    </div>
                  </button>
                  {/* Notification Bell */}
                  <button
                    onClick={() =>
                      setShowNotifications(!showNotifications)
                    }
                    className="relative active:scale-90 transition-transform"
                  >
                    <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    {notifications.some((n) => n.unread) && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* Notifications Panel */}
              {showNotifications && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowNotifications(false)}
                  ></div>

                  {/* Panel */}
                  <div className="absolute top-20 left-5 right-5 max-h-96 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-30 transition-colors">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Notificações
                      </h3>
                      <button
                        onClick={() =>
                          setShowNotifications(false)
                        }
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Notifications List */}
                    <div className="overflow-y-auto max-h-80">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-5 py-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors ${
                            notification.unread
                              ? "bg-blue-50/50 dark:bg-[#7FDBCA]/10"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-[#7FDBCA] rounded-full mt-2 flex-shrink-0"></div>
                            )}
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {notification.title}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                {notification.message}
                              </p>
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Hero Section - Carousel de Ofertas */}
              <div className="relative h-56 mx-5 mt-5 rounded-3xl overflow-hidden shadow-md">
                {/* Carousel Container */}
                <div
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {heroOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className="min-w-full h-full relative"
                    >
                      <ImageWithFallback
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      {/* Text Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h2 className="text-lg font-bold mb-1">
                          {offer.title}
                        </h2>
                        <p className="text-xs mb-3 text-white/90 line-clamp-1">
                          {offer.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">
                            R$ {offer.price.toFixed(2)}
                          </span>
                          <button className="px-6 py-2 bg-[#FFB088] text-white rounded-full text-sm font-medium hover:bg-[#FF9E6B] active:scale-95 transition-all shadow-lg">
                            {t('home.order_now')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators (Dots) */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroOffers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all ${
                        index === currentSlide
                          ? "w-8 h-2 bg-white"
                          : "w-2 h-2 bg-white/50 hover:bg-white/70"
                      } rounded-full`}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Filters Section */}
              <div className="px-5 mt-8">
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  {t('home.what_need')}
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {quickFilters.map((filter) => {
                    const Icon = filter.icon;
                    const isSelected =
                      selectedFilter === filter.id;
                    const isHighlighted = filter.highlighted;

                    return (
                      <button
                        key={filter.id}
                        onClick={() => {
                          if (filter.id === -1) {
                            // Pedido Pool - abre tela especial
                            setShowPoolOrder(true);
                          } else {
                            setSelectedFilter(filter.id);
                          }
                        }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap active:scale-95 transition-all shadow-md ${
                          isHighlighted
                            ? "bg-[#FF6B6B] text-white" // Coral Vibrante para Pedido Pool
                            : isSelected
                              ? "bg-[#7FDBCA] text-white"
                              : "bg-gray-100 dark:bg-[#2A2A2A] text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#353535]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {filter.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dishes Feed */}
              <div className="px-5 mt-8 pb-8">
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  {t('home.recommended')}
                </h3>
                <div className="space-y-4">
                  {dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="bg-white dark:bg-[#1E1E1E] rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                    >
                      {/* Dish Image */}
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Dish Info */}
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {dish.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {dish.restaurant}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Rating - Clickable */}
                            <button
                              onClick={() => {
                                setSelectedDish(dish);
                                setShowReviews(true);
                              }}
                              className="flex items-center gap-1 active:scale-95 transition-transform"
                            >
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {dish.rating}
                              </span>
                            </button>
                            {/* Delivery Time */}
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {dish.deliveryTime}
                              </span>
                            </div>
                          </div>
                          {/* Price */}
                          <div className="text-lg font-bold text-[#FFB088]">
                            R$ {dish.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Floating Action Button - Chat */}
        <div className="absolute bottom-24 right-6 z-30">
          {/* Chat Menu */}
          {showChatMenu && (
            <div className="absolute bottom-16 right-0 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-2 w-72 transition-colors">
              {/* Header */}
              <div className="px-5 py-4 bg-gradient-to-r from-[#7FDBCA]/10 to-[#FFB088]/10 dark:from-[#7FDBCA]/20 dark:to-[#FFB088]/20 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
                  Como podemos te ajudar hoje?
                </h3>
              </div>

              {/* Chat Options */}
              <button
                onClick={() => {
                  setChatMode("humanized");
                  setShowChat(true);
                  setShowChatMenu(false);
                }}
                className="w-full px-5 py-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] active:scale-98 transition-all border-b border-gray-100 dark:border-gray-700"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-[#7FDBCA] rounded-full flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-[#1E1E1E] rounded-full"></div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    Luana
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Chat Humanizado
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setChatMode("restaurant");
                  setShowChat(true);
                  setShowChatMenu(false);
                }}
                className="w-full px-5 py-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] active:scale-98 transition-all border-b border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-[#FFB088] rounded-full flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    Falar com Restaurante
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Média de resposta: 5 min
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setChatMode("faq");
                  setShowChat(true);
                  setShowChatMenu(false);
                }}
                className="w-full px-5 py-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] active:scale-98 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#7FDBCA] to-[#FFB088] rounded-full flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    Dúvidas Frequentes
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Respostas rápidas
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* FAB Button */}
          <button
            onClick={() => setShowChatMenu(!showChatMenu)}
            className="w-14 h-14 bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#F3F4F6] dark:bg-[#1E1E1E] border-t border-[#E5E7EB] dark:border-gray-700 px-6 py-3 z-20 transition-colors">
          <div className="flex items-center justify-around max-w-[393px] mx-auto">
            {/* Home - LayoutDashboard (Painel de Controle) */}
            <button
              onClick={() => setActiveTab("home")}
              className="relative transition-all"
            >
              {/* Bolha Quadrada - Active State */}
              {activeTab === "home" && (
                <div className="absolute inset-0 -inset-x-4 -inset-y-2 bg-[#7FDBCA]/20 rounded-xl"></div>
              )}
              <div className="relative z-10 flex flex-col items-center gap-1 px-4 py-2">
                <LayoutDashboard
                  className={`w-6 h-6 stroke-2 ${activeTab === "home" ? "text-[#52BFB0]" : "text-[#9CA3AF] dark:text-gray-500"}`}
                />
                <span
                  className={`text-xs ${activeTab === "home" ? "text-[#52BFB0] font-bold" : "text-[#9CA3AF] dark:text-gray-500"}`}
                >
                  {t('nav.home')}
                </span>
              </div>
            </button>

            {/* Search - Lupa Clássica */}
            <button
              onClick={() => {
                setActiveTab("search");
                setSearchFocused(true);
              }}
              className="relative transition-all"
            >
              {/* Bolha Quadrada - Active State */}
              {activeTab === "search" && (
                <div className="absolute inset-0 -inset-x-4 -inset-y-2 bg-[#7FDBCA]/20 rounded-xl"></div>
              )}
              <div className="relative z-10 flex flex-col items-center gap-1 px-4 py-2">
                <Search
                  className={`w-6 h-6 stroke-2 ${activeTab === "search" ? "text-[#52BFB0]" : "text-[#9CA3AF] dark:text-gray-500"}`}
                />
                <span
                  className={`text-xs ${activeTab === "search" ? "text-[#52BFB0] font-bold" : "text-[#9CA3AF] dark:text-gray-500"}`}
                >
                  {t('nav.search')}
                </span>
              </div>
            </button>

            {/* Orders - Utensils (Garfo e Faca) */}
            <button
              onClick={() => setActiveTab("orders")}
              className="relative transition-all"
            >
              {/* Bolha Quadrada - Active State */}
              {activeTab === "orders" && (
                <div className="absolute inset-0 -inset-x-4 -inset-y-2 bg-[#7FDBCA]/20 rounded-xl"></div>
              )}
              <div className="relative z-10 flex flex-col items-center gap-1 px-4 py-2">
                <Utensils
                  className={`w-6 h-6 stroke-2 ${activeTab === "orders" ? "text-[#52BFB0]" : "text-[#9CA3AF] dark:text-gray-500"}`}
                />
                <span
                  className={`text-xs ${activeTab === "orders" ? "text-[#52BFB0] font-bold" : "text-[#9CA3AF] dark:text-gray-500"}`}
                >
                  {t('nav.orders')}
                </span>
              </div>
            </button>

            {/* Profile - User (Silhueta) */}
            <button
              onClick={() => setActiveTab("profile")}
              className="relative transition-all"
            >
              {/* Bolha Quadrada - Active State */}
              {activeTab === "profile" && (
                <div className="absolute inset-0 -inset-x-4 -inset-y-2 bg-[#7FDBCA]/20 rounded-xl"></div>
              )}
              <div className="relative z-10 flex flex-col items-center gap-1 px-4 py-2">
                <User
                  className={`w-6 h-6 stroke-2 ${activeTab === "profile" ? "text-[#52BFB0]" : "text-[#9CA3AF] dark:text-gray-500"}`}
                />
                <span
                  className={`text-xs ${activeTab === "profile" ? "text-[#52BFB0] font-bold" : "text-[#9CA3AF] dark:text-gray-500"}`}
                >
                  {t('nav.profile')}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}