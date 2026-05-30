import { User, Settings, MapPin, Ticket, MessageSquare, Sliders, Plus, ChevronRight, UtensilsCrossed, Check, LogOut, CreditCard, ScanLine, UserCheck } from 'lucide-react';

interface ProfileScreenProps {
  onOpenAccountData?: () => void;
  onOpenPaymentMethods?: () => void;
  onOpenDeliveryCode?: () => void;
  onOpenAddresses?: () => void;
  onOpenCoupons?: () => void;
  onOpenSettings?: () => void;
  onOpenAddBalance?: () => void;
  onOpenChatHistory?: () => void;
}

export default function ProfileScreen({ onOpenAccountData, onOpenPaymentMethods, onOpenDeliveryCode, onOpenAddresses, onOpenCoupons, onOpenSettings, onOpenAddBalance, onOpenChatHistory }: ProfileScreenProps) {
  // Estado do cartão fidelidade (7 de 10 preenchidos)
  const loyaltyProgress = 7;
  const loyaltyTotal = 10;
  const remainingMeals = loyaltyTotal - loyaltyProgress;

  const menuOptions = [
    {
      id: 1,
      label: 'Dados da Conta',
      icon: UserCheck,
      onClick: () => onOpenAccountData?.()
    },
    {
      id: 2,
      label: 'Meus Endereços',
      icon: MapPin,
      onClick: () => onOpenAddresses?.()
    },
    {
      id: 3,
      label: 'Formas de Pagamento',
      icon: CreditCard,
      onClick: () => onOpenPaymentMethods?.()
    },
    {
      id: 4,
      label: 'Código de Entrega',
      icon: ScanLine,
      onClick: () => onOpenDeliveryCode?.()
    },
    {
      id: 5,
      label: 'Cupons de Desconto',
      icon: Ticket,
      onClick: () => onOpenCoupons?.()
    },
    {
      id: 6,
      label: 'Histórico de Conversas',
      icon: MessageSquare,
      onClick: () => onOpenChatHistory?.()
    },
    {
      id: 7,
      label: 'Configurações',
      icon: Settings,
      onClick: () => onOpenSettings?.()
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-white dark:bg-[#121212] pb-24 transition-colors">
      {/* Cabeçalho - Fundo Cinza Platina */}
      <div className="bg-[#F3F4F6] dark:bg-[#1E1E1E] px-5 pt-8 pb-6 transition-colors">
        {/* Avatar e Identidade */}
        <div className="flex flex-col items-center">
          {/* Avatar Circle */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-full flex items-center justify-center mb-4 shadow-lg">
            <User className="w-10 h-10 text-white stroke-2" />
          </div>

          {/* Nome e Curso */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors">Lucas Silva</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[280px] text-center transition-colors">Análise e Desenvolvimento de Sistemas</p>
        </div>
      </div>

      {/* Seção "Minha Carteira" */}
      <div className="px-5 mt-6">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors">Minha Carteira</h3>
        
        {/* Card de Saldo */}
        <div className="bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-[20px] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-white/80 mb-1">Saldo Disponível</p>
              <p className="text-3xl font-bold text-white">R$ 150,00</p>
            </div>
            
            {/* Botão Adicionar Saldo */}
            <button
              onClick={() => onOpenAddBalance?.()}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-sm px-4 py-3 rounded-xl transition-all"
            >
              <Plus className="w-5 h-5 text-white stroke-[3]" />
              <span className="text-sm font-medium text-white">Adicionar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gamificação: Selos de Fidelidade */}
      <div className="px-5 mt-8">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors">Selos de Fidelidade</h3>
        
        {/* Card Fidelidade */}
        <div className="bg-gradient-to-br from-[#FFB088]/10 to-[#7FDBCA]/10 dark:from-[#FFB088]/20 dark:to-[#7FDBCA]/20 rounded-[20px] p-5 border-2 border-[#7FDBCA]/20 dark:border-[#7FDBCA]/30 transition-colors">
          {/* Grade de Círculos 2x5 */}
          <div className="flex flex-col gap-4 mb-4">
            {/* Primeira Linha - 5 círculos */}
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    index <= loyaltyProgress
                      ? 'bg-[#52BFB0] shadow-md'
                      : 'border-2 border-dashed border-gray-300'
                  }`}
                >
                  {index <= loyaltyProgress ? (
                    <UtensilsCrossed className="w-6 h-6 text-white" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Segunda Linha - 5 círculos */}
            <div className="flex justify-between">
              {[6, 7, 8, 9, 10].map((index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    index <= loyaltyProgress
                      ? 'bg-[#52BFB0] shadow-md'
                      : 'border-2 border-dashed border-gray-300'
                  }`}
                >
                  {index <= loyaltyProgress ? (
                    <UtensilsCrossed className="w-6 h-6 text-white" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-[#7FDBCA] to-[#FFB088] transition-all duration-500"
              style={{ width: `${(loyaltyProgress / loyaltyTotal) * 100}%` }}
            ></div>
          </div>
          
          {/* Legenda */}
          <p className="text-sm text-center text-gray-700 dark:text-gray-200">
            Faltam apenas <span className="font-bold text-[#52BFB0]">{remainingMeals} refeições</span> para ganhar seu bônus de até{' '}
            <span className="font-bold text-[#FFB088]">R$ 20,00</span>!
          </p>
        </div>
      </div>

      {/* Lista de Opções - Menu Vertical */}
      <div className="px-5 mt-8">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors">Menu</h3>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
          {menuOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={option.onClick}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] active:bg-gray-100 dark:active:bg-[#333] transition-colors"
              >
                {/* Ícone */}
                <div className="w-10 h-10 bg-[#7FDBCA]/10 dark:bg-[#7FDBCA]/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-5 h-5 text-[#52BFB0] dark:text-[#7FDBCA] transition-colors" />
                </div>

                {/* Label */}
                <span className="flex-1 text-left text-sm font-medium text-gray-800 dark:text-gray-100 transition-colors">
                  {option.label}
                </span>

                {/* Seta */}
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
              </button>
            );
          })}
          
          {/* Botão Sair da Conta - Ação Destrutiva */}
          <button
            onClick={() => {
              if (confirm('Tem certeza que deseja sair da sua conta?')) {
                console.log('Logout realizado');
                // Aqui seria implementada a lógica de logout
              }
            }}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-900/20 active:bg-red-100 dark:active:bg-red-900/30 transition-colors"
          >
            {/* Ícone - Vermelho */}
            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
              <LogOut className="w-5 h-5 text-[#EF4444] dark:text-red-400 transition-colors" />
            </div>

            {/* Label - Vermelho */}
            <span className="flex-1 text-left text-sm font-medium text-[#EF4444] dark:text-red-400 transition-colors">
              Sair da Conta
            </span>

            {/* Seta - Vermelho */}
            <ChevronRight className="w-5 h-5 text-[#EF4444] dark:text-red-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Espaçador Inferior */}
      <div className="h-8"></div>
    </div>
  );
}