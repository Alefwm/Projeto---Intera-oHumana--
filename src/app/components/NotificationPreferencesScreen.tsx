import { ChevronLeft, Smartphone, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface NotificationPreferencesScreenProps {
  onClose: () => void;
}

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  icon: any;
  enabled: boolean;
}

export default function NotificationPreferencesScreen({ onClose }: NotificationPreferencesScreenProps) {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'push',
      label: 'Notificações Push',
      description: 'Receber avisos sobre o status do pedido no celular',
      icon: Smartphone,
      enabled: true,
    },
    {
      id: 'email',
      label: 'E-mail',
      description: 'Resumo de pedidos e notas fiscais',
      icon: Mail,
      enabled: true,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      description: 'Avisos rápidos do entregador',
      icon: MessageCircle,
      enabled: false,
    },
    {
      id: 'sms',
      label: 'SMS',
      description: 'Alertas de segurança e promoções',
      icon: MessageSquare,
      enabled: false,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
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
          <h1 className="text-xl font-bold text-gray-900">Notificações</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-5 mt-6">
        <p className="text-sm text-gray-600 mb-6">
          Escolha como você quer receber atualizações sobre seus pedidos e ofertas especiais.
        </p>

        {/* Lista de Preferências */}
        <div className="space-y-4">
          {settings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.id}
                className="bg-white rounded-2xl border border-gray-200 p-4"
              >
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    setting.enabled
                      ? 'bg-[#7FDBCA]/20'
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      setting.enabled
                        ? 'text-[#52BFB0]'
                        : 'text-gray-400'
                    }`} />
                  </div>

                  {/* Texto */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {setting.label}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {setting.description}
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleSetting(setting.id)}
                    className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ${
                      setting.enabled ? 'bg-[#7FDBCA]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                        setting.enabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informação Adicional */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Dica:</strong> Mantenha as notificações push ativadas para acompanhar seu pedido em tempo real e não perder nenhuma promoção!
          </p>
        </div>

        {/* Estatísticas (Opcional) */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#7FDBCA]/10 to-[#7FDBCA]/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#52BFB0]">
              {settings.filter(s => s.enabled).length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Canais Ativos</p>
          </div>

          <div className="bg-gradient-to-br from-[#FFB088]/10 to-[#FFB088]/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#FF9965]">47</p>
            <p className="text-xs text-gray-600 mt-1">Notificações este mês</p>
          </div>
        </div>
      </div>
    </div>
  );
}
