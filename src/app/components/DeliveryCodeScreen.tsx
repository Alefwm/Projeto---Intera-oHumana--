import { ChevronLeft, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface DeliveryCodeScreenProps {
  onClose: () => void;
}

export default function DeliveryCodeScreen({ onClose }: DeliveryCodeScreenProps) {
  const deliveryCode = '5821';
  const orderId = '#1234';

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
          <h1 className="text-xl font-bold text-gray-900">Meu Código</h1>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="px-5 mt-8">
        {/* Título e Instrução */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Código de Confirmação
          </h2>
          <p className="text-sm text-gray-500">
            Apresente este código ao entregador para confirmar o recebimento
          </p>
        </div>

        {/* Card do Código */}
        <div className="bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-[24px] p-8 mb-6 shadow-inner">
          {/* Destaque do Código */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-4">
            <div className="flex items-center justify-center gap-4">
              {deliveryCode.split('').map((digit, index) => (
                <div
                  key={index}
                  className="w-16 h-20 bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-xl flex items-center justify-center shadow-md"
                >
                  <span className="text-4xl font-extrabold text-white">
                    {digit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ID do Pedido */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Pedido</p>
            <p className="text-sm font-bold text-gray-700">{orderId}</p>
          </div>
        </div>

        {/* Informações Essenciais */}
        <div className="space-y-4">
          {/* Info Card 1 */}
          <div className="bg-blue-50 border-l-4 border-[#7FDBCA] rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#52BFB0] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800 mb-1">
                Como usar
              </p>
              <p className="text-xs text-gray-600">
                Apresente este código ao entregador para confirmar o recebimento do seu pedido.
              </p>
            </div>
          </div>

          {/* Info Card 2 */}
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800 mb-1">
                Código único
              </p>
              <p className="text-xs text-gray-600">
                Este código é único para o seu pedido atual ({orderId}) e garante a segurança da entrega.
              </p>
            </div>
          </div>

          {/* Info Card 3 - Segurança */}
          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800 mb-1">
                Atenção: Segurança
              </p>
              <p className="text-xs text-gray-600">
                Nunca compartilhe este código via chat ou telefone. Apresente apenas ao entregador no momento da entrega.
              </p>
            </div>
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="mt-8">
          <button
            onClick={() => {
              // Fallback para copiar sem Clipboard API
              const textArea = document.createElement('textarea');
              textArea.value = deliveryCode;
              textArea.style.position = 'fixed';
              textArea.style.left = '-999999px';
              textArea.style.top = '-999999px';
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();

              try {
                const successful = document.execCommand('copy');
                if (successful) {
                  alert('Código copiado: ' + deliveryCode);
                } else {
                  alert('Código: ' + deliveryCode + '\n\nSelecione e copie manualmente.');
                }
              } catch (err) {
                alert('Código: ' + deliveryCode + '\n\nSelecione e copie manualmente.');
              }

              document.body.removeChild(textArea);
            }}
            className="w-full bg-gradient-to-r from-[#7FDBCA] to-[#5FC9B8] hover:from-[#6CCBB9] hover:to-[#4FB8A7] text-white font-semibold py-4 rounded-2xl active:scale-95 transition-all shadow-lg"
          >
            Copiar Código
          </button>
        </div>
      </div>
    </div>
  );
}
