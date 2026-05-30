import { ChevronLeft, Truck, GraduationCap, Leaf, Clock, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CouponsScreenProps {
  onClose: () => void;
}

interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  icon: 'truck' | 'graduation' | 'leaf';
  bgColor: string;
  expiresAt: string;
  minValue?: number;
  isActive: boolean;
}

export default function CouponsScreen({ onClose }: CouponsScreenProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const coupons: Coupon[] = [
    {
      id: '1',
      code: 'FRETEGRATIS',
      title: 'Entrega Grátis',
      description: 'Em pedidos acima de R$ 30',
      discount: 'R$ 0,00',
      icon: 'truck',
      bgColor: 'from-[#7FDBCA] to-[#5FC9B8]',
      expiresAt: '31/03/2026',
      minValue: 30,
      isActive: true,
    },
    {
      id: '2',
      code: 'CALOURO20',
      title: 'Bem-vindo Calouro!',
      description: '20% de desconto na sua primeira refeição',
      discount: '20%',
      icon: 'graduation',
      bgColor: 'from-[#FFB088] to-[#FF9965]',
      expiresAt: '15/04/2026',
      isActive: true,
    },
    {
      id: '3',
      code: 'SAUDAVEL10',
      title: 'Marmita Fit',
      description: 'R$ 10,00 de desconto em Marmitas Fit',
      discount: 'R$ 10,00',
      icon: 'leaf',
      bgColor: 'from-[#A78BFA] to-[#8B5CF6]',
      expiresAt: '30/04/2026',
      isActive: true,
    },
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'truck':
        return Truck;
      case 'graduation':
        return GraduationCap;
      case 'leaf':
        return Leaf;
      default:
        return Leaf;
    }
  };

  const handleCopyCoupon = (code: string, id: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = code;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      alert('Código: ' + code);
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
          <h1 className="text-xl font-bold text-gray-900">Cupons de Desconto</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-5 mt-6">
        <p className="text-sm text-gray-600 mb-6">
          Aproveite nossos cupons exclusivos para economizar ainda mais!
        </p>

        {/* Lista de Cupons */}
        <div className="space-y-4">
          {coupons.map((coupon) => {
            const Icon = getIcon(coupon.icon);
            const isCopied = copiedId === coupon.id;

            return (
              <div
                key={coupon.id}
                className="relative overflow-hidden"
                style={{
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                }}
              >
                {/* Ticket Shape com recortes */}
                <div className={`bg-gradient-to-r ${coupon.bgColor} rounded-2xl p-5 text-white relative`}>
                  {/* Recorte semicircular esquerdo */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>

                  {/* Recorte semicircular direito */}
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>

                  {/* Linha pontilhada vertical */}
                  <div className="absolute right-20 top-4 bottom-4 border-l-2 border-dashed border-white/30"></div>

                  <div className="flex items-start gap-4">
                    {/* Lado Esquerdo: Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{coupon.title}</h3>
                          <p className="text-xs text-white/80">{coupon.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Válido até {coupon.expiresAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Lado Direito: Ação */}
                    <div className="flex flex-col items-center gap-2 min-w-[72px]">
                      <div className="text-center mb-1">
                        <p className="text-2xl font-bold">{coupon.discount}</p>
                        <p className="text-xs opacity-80">OFF</p>
                      </div>
                      <button
                        onClick={() => handleCopyCoupon(coupon.code, coupon.id)}
                        className={`w-full px-3 py-2 rounded-lg font-semibold text-xs transition-all active:scale-95 flex items-center justify-center gap-1 ${
                          isCopied
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Código do Cupom */}
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs opacity-70 mb-1">Código:</p>
                    <p className="font-mono font-bold tracking-wider">{coupon.code}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estado Vazio (exemplo futuro) */}
        {coupons.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">Nenhum cupom disponível no momento</p>
          </div>
        )}
      </div>
    </div>
  );
}
