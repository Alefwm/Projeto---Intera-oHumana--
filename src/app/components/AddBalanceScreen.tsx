import { ChevronLeft, QrCode, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface AddBalanceScreenProps {
  onClose: () => void;
  onBalanceUpdated: (newBalance: number) => void;
}

export default function AddBalanceScreen({ onClose, onBalanceUpdated }: AddBalanceScreenProps) {
  const [step, setStep] = useState<'amount' | 'qrcode' | 'success'>('amount');
  const [amount, setAmount] = useState('');
  const [pixKey] = useState('lucas.oliveira@ufrgs.edu.br');

  const formatCurrency = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const number = Number(cleaned) / 100;
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleAmountChange = (value: string) => {
    const formatted = formatCurrency(value);
    setAmount(formatted);
  };

  const handleContinue = () => {
    if (parseFloat(amount.replace(',', '.')) < 10) {
      alert('O valor mínimo para recarga é R$ 10,00');
      return;
    }
    setStep('qrcode');

    // Simula confirmação de pagamento após 3 segundos
    setTimeout(() => {
      setStep('success');
      const newBalance = 150 + parseFloat(amount.replace(',', '.'));
      onBalanceUpdated(newBalance);

      // Fecha após 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 3000);
  };

  const handleCopyPixKey = () => {
    const textArea = document.createElement('textarea');
    textArea.value = pixKey;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      alert('Chave PIX copiada!');
    } catch (err) {
      alert('Chave PIX: ' + pixKey);
    }

    document.body.removeChild(textArea);
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
          <h1 className="text-xl font-bold text-gray-900">Adicionar Saldo</h1>
        </div>
      </div>

      {/* Etapa 1: Valor */}
      {step === 'amount' && (
        <div className="px-5 mt-8">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-2">Quanto você quer adicionar?</p>
            <div className="relative">
              <span className="absolute left-1/2 -translate-x-full top-1/2 -translate-y-1/2 text-5xl font-bold text-[#52BFB0] mr-2">
                R$
              </span>
              <input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0,00"
                className="text-5xl font-bold text-[#52BFB0] text-center w-full focus:outline-none pl-16"
              />
            </div>
          </div>

          {/* Valores Rápidos */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {['20,00', '50,00', '100,00'].map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className="py-3 bg-[#7FDBCA]/10 hover:bg-[#7FDBCA]/20 border-2 border-[#7FDBCA]/30 rounded-xl font-semibold text-[#52BFB0] transition-all active:scale-95"
              >
                R$ {value}
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700">
              <strong>Valor mínimo:</strong> R$ 10,00<br />
              <strong>Método:</strong> PIX instantâneo<br />
              <strong>Sem taxas!</strong> O valor será creditado em até 5 minutos.
            </p>
          </div>

          {/* Botão Continuar */}
          <button
            onClick={handleContinue}
            disabled={!amount || parseFloat(amount.replace(',', '.')) < 10}
            className="w-full bg-gradient-to-r from-[#7FDBCA] to-[#5FC9B8] hover:from-[#6CCBB9] hover:to-[#4FB8A7] disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 rounded-2xl active:scale-95 transition-all shadow-lg"
          >
            Continuar
          </button>
        </div>
      )}

      {/* Etapa 2: QR Code */}
      {step === 'qrcode' && (
        <div className="px-5 mt-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Escaneie o QR Code
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Abra o app do seu banco e escaneie o código abaixo
          </p>

          {/* QR Code Placeholder */}
          <div className="bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-3xl p-8 mb-6">
            <div className="w-full aspect-square bg-white rounded-2xl flex items-center justify-center shadow-inner">
              <QrCode className="w-32 h-32 text-[#52BFB0]" />
            </div>
          </div>

          {/* Valor */}
          <div className="bg-[#7FDBCA]/10 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Valor a pagar</p>
            <p className="text-3xl font-bold text-[#52BFB0]">R$ {amount}</p>
          </div>

          {/* Chave PIX */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Ou copie a chave PIX</p>
            <button
              onClick={handleCopyPixKey}
              className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl transition-all active:scale-95"
            >
              <span className="text-sm font-medium text-gray-700">{pixKey}</span>
              <Copy className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Spinner de Aguardando */}
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <div className="w-5 h-5 border-3 border-[#7FDBCA] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Aguardando pagamento...</span>
          </div>
        </div>
      )}

      {/* Etapa 3: Sucesso */}
      {step === 'success' && (
        <div className="px-5 mt-16 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scaleIn">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pagamento Confirmado!
          </h2>
          <p className="text-gray-600 mb-4">
            Seu saldo foi atualizado com sucesso
          </p>

          <div className="bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-2xl p-6 text-white">
            <p className="text-sm opacity-80 mb-1">Novo Saldo</p>
            <p className="text-4xl font-bold">
              R$ {(150 + parseFloat(amount.replace(',', '.'))).toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 400ms ease-out;
        }
      `}</style>
    </div>
  );
}
