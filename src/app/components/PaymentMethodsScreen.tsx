import { ChevronLeft, Plus, CreditCard, Wallet, QrCode, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import AddCardScreen, { CardData } from './AddCardScreen';

interface PaymentMethodsScreenProps {
  onClose: () => void;
}

export default function PaymentMethodsScreen({ onClose }: PaymentMethodsScreenProps) {
  const [showAddCard, setShowAddCard] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [cards, setCards] = useState<CardData[]>([
    {
      id: '1',
      number: '**** **** **** 4512',
      holder: 'LUCAS SILVA',
      cpf: '000.555.888-99',
      address: 'Av. Sen. Salgado Filho, 1610',
      type: 'credit',
      brand: 'Mastercard',
    },
    {
      id: '2',
      number: '**** **** **** 8821',
      holder: 'LUCAS SILVA',
      cpf: '000.555.888-99',
      address: 'Av. Sen. Salgado Filho, 1610',
      type: 'debit',
      brand: 'Visa',
    },
  ]);
  const handleDeleteCard = (cardId: string) => {
    setCardToDelete(cardId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      setCards(cards.filter((card) => card.id !== cardToDelete));
      setShowConfirmModal(false);
      setCardToDelete(null);
    }
  };

  const handleAddCard = (newCard: CardData) => {
    setCards([...cards, newCard]);
  };

  const transactions = [
    {
      id: 1,
      type: 'expense',
      description: 'Pagamento - Natural Campus',
      amount: 22.90,
      date: '30/03',
    },
    {
      id: 2,
      type: 'income',
      description: 'Recarga de Saldo',
      amount: 50.00,
      date: '28/03',
    },
    {
      id: 3,
      type: 'expense',
      description: 'Pagamento - Sabor Universitário',
      amount: 19.90,
      date: '27/03',
    },
    {
      id: 4,
      type: 'income',
      description: 'Recarga de Saldo',
      amount: 100.00,
      date: '25/03',
    },
    {
      id: 5,
      type: 'expense',
      description: 'Pagamento - Verde Vida',
      amount: 17.90,
      date: '24/03',
    },
    {
      id: 6,
      type: 'expense',
      description: 'Pagamento - Tokyo Express',
      amount: 24.90,
      date: '23/03',
    },
  ];

  if (showAddCard) {
    return <AddCardScreen onClose={() => setShowAddCard(false)} onSave={handleAddCard} />;
  }

  return (
    <div className="absolute inset-0 bg-white z-50 overflow-y-auto pb-8">
      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Cartão"
        message="Tem certeza que deseja remover este cartão? Esta ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmModal(false)}
      />
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Pagamento</h1>
        </div>
      </div>

      {/* Card de Saldo (Reuso) */}
      <div className="px-5 mt-6">
        <div className="bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-[20px] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-white/80 mb-1">Saldo Disponível</p>
              <p className="text-3xl font-bold text-white">R$ 150,00</p>
            </div>

            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-sm px-4 py-3 rounded-xl transition-all">
              <Plus className="w-5 h-5 text-white stroke-[3]" />
              <span className="text-sm font-medium text-white">Adicionar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Seção: Cartões Cadastrados */}
      <div className="px-5 mt-8">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Cartões Cadastrados</h3>

        <div className="space-y-3">
          {/* Card PIX */}
          <div className="bg-white rounded-[16px] border-2 border-gray-200 p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-xl flex items-center justify-center flex-shrink-0">
              <QrCode className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">PIX</p>
              <p className="text-xs text-gray-500 mt-0.5">lucas.oliveira@ufrgs.edu.br</p>
            </div>
          </div>

          {/* Cartões Dinâmicos */}
          {cards.map((card) => {
            const gradientColors = card.type === 'credit'
              ? 'from-[#FFB088] to-[#FF9965]'
              : 'from-[#A78BFA] to-[#8B5CF6]';

            return (
              <div
                key={card.id}
                className={`bg-gradient-to-br ${gradientColors} rounded-[16px] p-5 text-white shadow-md transition-all hover:shadow-lg`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-8 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  {card.brand && (
                    <div className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {card.brand}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <p className="text-xs text-white/70 mb-1">Número do Cartão</p>
                  <p className="text-lg font-bold tracking-wider">{card.number}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70 mb-0.5">Titular</p>
                    <p className="text-xs font-semibold">{card.holder}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="w-8 h-8 bg-white/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all active:scale-95 backdrop-blur-sm"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Botão Adicionar Novo Cartão */}
          <button
            onClick={() => setShowAddCard(true)}
            className="w-full bg-gradient-to-r from-[#7FDBCA]/10 to-[#FFB088]/10 hover:from-[#7FDBCA]/20 hover:to-[#FFB088]/20 border-2 border-dashed border-[#7FDBCA] rounded-[16px] p-4 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#52BFB0] stroke-[3]" />
            </div>
            <span className="text-sm font-semibold text-[#52BFB0]">
              Adicionar novo cartão
            </span>
          </button>
        </div>
      </div>

      {/* Seção: Histórico de Transações */}
      <div className="px-5 mt-8">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Histórico de Transações</h3>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="px-5 py-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                transaction.type === 'expense'
                  ? 'bg-red-50'
                  : 'bg-green-50'
              }`}>
                {transaction.type === 'expense' ? (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{transaction.date}</p>
              </div>

              <div className={`text-sm font-bold whitespace-nowrap ${
                transaction.type === 'expense'
                  ? 'text-red-500'
                  : 'text-green-500'
              }`}>
                {transaction.type === 'expense' ? '-' : '+'} R$ {transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
