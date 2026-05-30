import { ChevronLeft, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface AddCardScreenProps {
  onClose: () => void;
  onSave: (card: CardData) => void;
}

export interface CardData {
  id: string;
  number: string;
  holder: string;
  cpf: string;
  address: string;
  type: 'credit' | 'debit';
  brand?: string;
}

export default function AddCardScreen({ onClose, onSave }: AddCardScreenProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [cardType, setCardType] = useState<'credit' | 'debit'>('credit');

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // Max: 16 digits + 3 spaces
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return [match[1], match[2], match[3], match[4]].filter(Boolean).join('.').replace(/\.(\d{2})$/, '-$1');
    }
    return cleaned;
  };

  const detectCardBrand = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5')) return 'Mastercard';
    if (cleaned.startsWith('6')) return 'Elo';
    return '';
  };

  const handleSave = () => {
    if (!cardNumber || !holderName || !cpf || !address) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.length < 16) {
      alert('Número do cartão inválido.');
      return;
    }

    const newCard: CardData = {
      id: Date.now().toString(),
      number: cardNumber,
      holder: holderName,
      cpf,
      address,
      type: cardType,
      brand: detectCardBrand(cardNumber),
    };

    onSave(newCard);
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-white z-50 overflow-y-auto pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Adicionar Cartão</h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 mt-6 space-y-5">
        {/* Preview do Cartão */}
        <div className="bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-[20px] p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-10 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            {detectCardBrand(cardNumber) && (
              <div className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {detectCardBrand(cardNumber)}
              </div>
            )}
          </div>

          <div className="mb-4">
            <p className="text-xs text-white/70 mb-1">Número do Cartão</p>
            <p className="text-lg font-bold tracking-wider">
              {cardNumber || '**** **** **** ****'}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70 mb-0.5">Titular</p>
              <p className="text-sm font-semibold">{holderName || 'NOME DO TITULAR'}</p>
            </div>
            <div className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {cardType === 'credit' ? 'Crédito' : 'Débito'}
            </div>
          </div>
        </div>

        {/* Tipo de Cartão */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Cartão
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setCardType('credit')}
              className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                cardType === 'credit'
                  ? 'border-[#7FDBCA] bg-[#7FDBCA]/10 text-[#52BFB0]'
                  : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              Crédito
            </button>
            <button
              onClick={() => setCardType('debit')}
              className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                cardType === 'debit'
                  ? 'border-[#7FDBCA] bg-[#7FDBCA]/10 text-[#52BFB0]'
                  : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              Débito
            </button>
          </div>
        </div>

        {/* Número do Cartão */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número do Cartão
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="0000 0000 0000 0000"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
          />
        </div>

        {/* Nome do Titular */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Titular (conforme impresso)
          </label>
          <input
            type="text"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value.toUpperCase())}
            placeholder="LUCAS SILVA"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
          />
        </div>

        {/* CPF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CPF do Titular
          </label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            placeholder="000.000.000-00"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
          />
        </div>

        {/* Endereço de Cobrança */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Endereço de Cobrança
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Av. Sen. Salgado Filho, 1610 – Prédio 2"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
          />
        </div>

        {/* Botão Salvar */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-[#7FDBCA] to-[#5FC9B8] hover:from-[#6CCBB9] hover:to-[#4FB8A7] text-white font-semibold py-4 rounded-2xl active:scale-95 transition-all shadow-lg mt-8"
        >
          Salvar Cartão
        </button>
      </div>
    </div>
  );
}
