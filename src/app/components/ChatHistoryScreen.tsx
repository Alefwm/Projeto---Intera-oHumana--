import { ChevronLeft, MessageCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatHistoryScreenProps {
  onClose: () => void;
}

interface Conversation {
  id: number;
  restaurantName: string;
  restaurantLogo: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  topic: 'atraso' | 'faltante' | 'fria' | 'errado' | 'cancelamento';
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'restaurant';
  time: string;
}

export default function ChatHistoryScreen({ onClose }: ChatHistoryScreenProps) {
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const conversations: Conversation[] = [
    {
      id: 1,
      restaurantName: 'Natural Campus',
      restaurantLogo: 'https://images.unsplash.com/photo-1581894408375-cc0738fef8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      lastMessage: 'Pedimos desculpas, o entregador teve um imprevisto...',
      time: '10 min atrás',
      unread: true,
      topic: 'atraso'
    },
    {
      id: 2,
      restaurantName: 'Sabor Universitário',
      restaurantLogo: 'https://images.unsplash.com/photo-1766848605292-06f971164f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      lastMessage: 'Vamos enviar um cupom de reembolso para sua carteira.',
      time: '1 hora atrás',
      unread: false,
      topic: 'faltante'
    },
    {
      id: 3,
      restaurantName: 'Tokyo Express',
      restaurantLogo: 'https://images.unsplash.com/photo-1562296761-5d2add43d7d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      lastMessage: 'Sentimos muito. Gostaria de um novo envio?',
      time: 'Ontem',
      unread: false,
      topic: 'fria'
    },
    {
      id: 4,
      restaurantName: 'Verde Vida',
      restaurantLogo: 'https://images.unsplash.com/photo-1591803970266-37c21cfd7c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      lastMessage: 'O entregador está voltando para trocar agora.',
      time: 'Ontem',
      unread: false,
      topic: 'errado'
    },
    {
      id: 5,
      restaurantName: 'Pizza Campus',
      restaurantLogo: 'https://images.unsplash.com/photo-1653557659183-9701378e2c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      lastMessage: 'Cancelamento confirmado. O estorno aparecerá em instantes.',
      time: '2 dias atrás',
      unread: false,
      topic: 'cancelamento'
    }
  ];

  const getConversationMessages = (topic: string): Message[] => {
    const messagesByTopic: Record<string, Message[]> = {
      atraso: [
        { id: 1, text: 'Olá, meu pedido está atrasado há 20 min.', sender: 'user', time: '14:20' },
        { id: 2, text: 'Pedimos desculpas, o entregador teve um imprevisto, mas já está chegando!', sender: 'restaurant', time: '14:22' },
        { id: 3, text: 'Quanto tempo mais ou menos?', sender: 'user', time: '14:23' },
        { id: 4, text: 'Deve chegar em aproximadamente 5 minutos. Novamente, pedimos desculpas pelo transtorno.', sender: 'restaurant', time: '14:24' }
      ],
      faltante: [
        { id: 1, text: 'Faltou a bebida no meu combo.', sender: 'user', time: '12:30' },
        { id: 2, text: 'Verificamos aqui. Vamos enviar um cupom de reembolso para sua carteira.', sender: 'restaurant', time: '12:32' },
        { id: 3, text: 'Obrigado! Quanto será o cupom?', sender: 'user', time: '12:33' },
        { id: 4, text: 'O cupom de R$ 8,00 já foi creditado em sua conta. Confira na aba "Cupons"!', sender: 'restaurant', time: '12:35' }
      ],
      fria: [
        { id: 1, text: 'A marmita chegou fria.', sender: 'user', time: '13:15' },
        { id: 2, text: 'Sentimos muito. Gostaria de um novo envio ou estorno do valor?', sender: 'restaurant', time: '13:17' },
        { id: 3, text: 'Prefiro o estorno, por favor.', sender: 'user', time: '13:18' },
        { id: 4, text: 'Estorno de R$ 21,90 realizado. O valor estará disponível em sua carteira em até 24 horas.', sender: 'restaurant', time: '13:20' }
      ],
      errado: [
        { id: 1, text: 'Recebi frango, mas pedi o bowl vegano.', sender: 'user', time: '19:45' },
        { id: 2, text: 'Houve uma troca na expedição. O entregador está voltando para trocar agora.', sender: 'restaurant', time: '19:47' },
        { id: 3, text: 'Ok, obrigado!', sender: 'user', time: '19:48' },
        { id: 4, text: 'Pedido correto entregue. Desculpe pelo transtorno!', sender: 'restaurant', time: '20:10' }
      ],
      cancelamento: [
        { id: 1, text: 'Gostaria de cancelar, demorou demais.', sender: 'user', time: '21:00' },
        { id: 2, text: 'Cancelamento confirmado. O estorno aparecerá em seu saldo em instantes.', sender: 'restaurant', time: '21:02' },
        { id: 3, text: 'Obrigado pela atenção.', sender: 'user', time: '21:03' },
        { id: 4, text: 'Disponha! Lamentamos não ter conseguido atender sua expectativa desta vez.', sender: 'restaurant', time: '21:04' }
      ]
    };

    return messagesByTopic[topic] || [];
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  if (selectedConversation && selectedConv) {
    const messages = getConversationMessages(selectedConv.topic);

    return (
      <div className="absolute inset-0 bg-white dark:bg-[#121212] z-50 flex flex-col transition-colors">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-700 px-5 py-4 transition-colors">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedConversation(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2A2A] active:scale-95 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
            <img
              src={selectedConv.restaurantLogo}
              alt={selectedConv.restaurantName}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">{selectedConv.restaurantName}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('chat.online')}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-[#7FDBCA] text-white'
                    : 'bg-gray-100 dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span
                  className={`text-xs mt-1 block ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input (Disabled - Read Only) */}
        <div className="bg-white dark:bg-[#1E1E1E] border-t border-gray-200 dark:border-gray-700 px-5 py-4 transition-colors">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#2A2A2A] rounded-full px-4 py-3">
            <input
              type="text"
              placeholder={t('chat.closed')}
              disabled
              className="flex-1 bg-transparent text-sm text-gray-400 dark:text-gray-500 outline-none cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-white dark:bg-[#121212] z-50 flex flex-col transition-colors">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-700 px-5 py-4 transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2A2A] active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('chat.title')}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('chat.subtitle')}</p>
          </div>
          <div className="w-10 h-10 bg-[#7FDBCA] rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation.id)}
            className="w-full px-5 py-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1E1E1E] active:bg-gray-100 dark:active:bg-[#2A2A2A] transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Restaurant Logo */}
              <div className="relative flex-shrink-0">
                <img
                  src={conversation.restaurantLogo}
                  alt={conversation.restaurantName}
                  className="w-14 h-14 rounded-full"
                />
                {conversation.unread && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#7FDBCA] rounded-full border-2 border-white dark:border-[#121212]"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    {conversation.restaurantName}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{conversation.time}</span>
                  </div>
                </div>
                <p
                  className={`text-sm truncate ${
                    conversation.unread
                      ? 'text-gray-900 dark:text-gray-100 font-medium'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </button>
        ))}

        {/* Empty State */}
        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-5">
            <div className="w-20 h-20 bg-gray-100 dark:bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t('chat.empty')}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
              {t('chat.empty_desc')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
