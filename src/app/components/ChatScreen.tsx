import { X, Send, UserCircle, Store, HelpCircle, MapPin } from 'lucide-react';
import { useState } from 'react';
import VirtualKeyboard from './VirtualKeyboard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatScreenProps {
  mode: 'humanized' | 'restaurant' | 'faq';
  restaurantName?: string;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'restaurant';
  time: string;
  showMap?: boolean;
  showButtons?: {
    option1: string;
    option2: string;
  };
}

export default function ChatScreen({ mode, restaurantName, onClose }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (mode === 'humanized') {
      return [
        {
          id: 1,
          text: 'Olá! Sou a Ana, sua assistente virtual 😊 Como posso te ajudar hoje?',
          sender: 'bot',
          time: '14:32'
        }
      ];
    } else if (mode === 'restaurant') {
      return [
        {
          id: 1,
          text: `Olá! Você está em contato com ${restaurantName || 'o restaurante'}. Como podemos te ajudar? 🍽️`,
          sender: 'restaurant',
          time: '14:32'
        }
      ];
    } else {
      return [
        {
          id: 1,
          text: 'Olá! Confira abaixo as dúvidas mais frequentes:',
          sender: 'bot',
          time: '14:32'
        }
      ];
    }
  });
  
  const [inputMessage, setInputMessage] = useState('');

  const faqQuestions = [
    '📦 Como rastrear meu pedido?',
    '💳 Quais formas de pagamento aceitam?',
    '🚚 Qual o prazo de entrega?',
    '💰 Como usar cupons de desconto?',
    '🔄 Como cancelar um pedido?',
    '⭐ Como avaliar um restaurante?'
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    const userText = inputMessage.toLowerCase();
    setInputMessage('');

    // Simulate response
    setTimeout(() => {
      let responseText = '';
      let showMap = false;
      let showButtons;

      // Detecção de palavras-chave para ATRASO (Chat Restaurante)
      if (mode === 'restaurant' && (userText.includes('atraso') || userText.includes('atrasou') || userText.includes('demora') || userText.includes('demorado'))) {
        responseText = 'Olá! Sentimos muito pelo atraso. Tivemos um alta demanda no campus agora, mas seu pedido já saiu para entrega e deve chegar em 8 minutos. Agradecemos a paciência!';
        showMap = true;
      }
      // Detecção de palavras-chave para PEDIDO ERRADO (Chat Humanizado)
      else if (mode === 'humanized' && (userText.includes('errado') || userText.includes('faltou') || userText.includes('falta') || userText.includes('item'))) {
        responseText = 'Poxa, sinto muito por isso! Sou a Luana e vou resolver agora. Você prefere que o restaurante envie o item faltante imediatamente ou gostaria de um estorno do valor em créditos no app?';
        showButtons = {
          option1: 'Reenviar Item',
          option2: 'Receber Créditos'
        };
      }
      // Respostas padrão
      else if (mode === 'humanized') {
        responseText = 'Entendi! Vou verificar isso para você. Um momento... 🔍';
      } else if (mode === 'restaurant') {
        responseText = 'Já anotei seu pedido! Alguma observação especial? 📝';
      } else {
        responseText = 'Espero ter ajudado! Tem alguma outra dúvida? 😊';
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: mode === 'restaurant' ? 'restaurant' : 'bot',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        showMap: showMap,
        showButtons: showButtons
      };

      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleFaqClick = (question: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: question,
      sender: 'user',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);

    // Simulate response based on question
    setTimeout(() => {
      let responseText = '';
      if (question.includes('rastrear')) {
        responseText = 'Você pode rastrear seu pedido na aba "Pedidos" do menu inferior. Lá você verá o status em tempo real! 📍';
      } else if (question.includes('pagamento')) {
        responseText = 'Aceitamos: Cartão de crédito, débito, PIX, dinheiro e vale-refeição! 💳';
      } else if (question.includes('prazo')) {
        responseText = 'O prazo médio é de 20-40 minutos, mas varia conforme a distância e o restaurante! ⏱️';
      } else if (question.includes('cupons')) {
        responseText = 'Cole o código do cupom na tela de pagamento antes de finalizar! Os cupons aparecem na seção "Promoções" também. 🎟️';
      } else if (question.includes('cancelar')) {
        responseText = 'Você pode cancelar gratuitamente em até 5 minutos após fazer o pedido. Depois disso, entre em contato conosco! ❌';
      } else {
        responseText = 'Após receber seu pedido, você pode avaliar na tela de pedidos. Sua opinião é muito importante! ⭐';
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const getHeaderInfo = () => {
    switch (mode) {
      case 'humanized':
        return {
          icon: UserCircle,
          title: 'Luana',
          subtitle: 'Chat Humanizado',
          online: true
        };
      case 'restaurant':
        return {
          avatar: 'https://images.unsplash.com/photo-1512149519538-136d1b8c574a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHByb2Zlc3Npb25hbCUyMGtpdGNoZW58ZW58MXx8fHwxNzc0ODM0NTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
          title: restaurantName || 'Restaurante',
          subtitle: 'Média de resposta: 5 min',
          online: false
        };
      case 'faq':
        return {
          icon: HelpCircle,
          title: 'Dúvidas Frequentes',
          subtitle: 'Respostas rápidas',
          online: false
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center animate-fadeIn"
      onClick={onClose}
    >
      {/* Chat Container - 393px width */}
      <div 
        className="w-full max-w-[393px] h-[90vh] bg-white rounded-t-3xl overflow-hidden flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7FDBCA] to-[#5FC9B8] px-5 py-6 flex-shrink-0 rounded-t-3xl">
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={onClose}
              className="active:scale-90 transition-transform"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Avatar */}
            <div className="relative">
              {headerInfo.avatar ? (
                <>
                  <ImageWithFallback
                    src={headerInfo.avatar}
                    alt={headerInfo.title}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/40"
                  />
                  {headerInfo.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
                  )}
                </>
              ) : (
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  {headerInfo.icon && <headerInfo.icon className="w-6 h-6 text-white" />}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="font-semibold text-white">{headerInfo.title}</h2>
              <p className="text-xs text-white/80">{headerInfo.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-5 py-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#7FDBCA] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {message.time}
                  </p>
                  
                  {/* Map - Mostrar trajeto do entregador */}
                  {message.showMap && (
                    <div className="mt-3 bg-gray-100 rounded-xl overflow-hidden">
                      <div className="relative h-32 bg-gradient-to-br from-[#7FDBCA]/20 to-[#FFB088]/20 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-[#7FDBCA]" />
                        <div className="absolute bottom-2 left-2 right-2 bg-white/90 rounded-lg px-3 py-2">
                          <p className="text-xs font-semibold text-gray-800">📍 Entregador a caminho</p>
                          <p className="text-xs text-gray-600">Distância: ~800m • ETA: 8 min</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Botões de ação */}
                  {message.showButtons && (
                    <div className="mt-3 flex gap-2">
                      <button 
                        onClick={() => {
                          const confirmMessage: Message = {
                            id: messages.length + 1,
                            text: 'Perfeito! Já solicitei o reenvio do item. O restaurante irá preparar e enviar em até 15 minutos. Você receberá uma notificação quando sair para entrega! 🚀',
                            sender: 'bot',
                            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                          };
                          setMessages(prev => [...prev, confirmMessage]);
                        }}
                        className="flex-1 bg-[#7FDBCA] text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-[#5FC9B8] active:scale-95 transition-all"
                      >
                        {message.showButtons.option1}
                      </button>
                      <button 
                        onClick={() => {
                          const confirmMessage: Message = {
                            id: messages.length + 1,
                            text: 'Entendido! Acabei de adicionar R$ 12,50 em créditos na sua conta. Você pode usar no próximo pedido! 💰',
                            sender: 'bot',
                            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                          };
                          setMessages(prev => [...prev, confirmMessage]);
                        }}
                        className="flex-1 bg-white text-[#7FDBCA] text-xs font-medium py-2 px-3 rounded-lg border-2 border-[#7FDBCA] hover:bg-[#7FDBCA]/10 active:scale-95 transition-all"
                      >
                        {message.showButtons.option2}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* FAQ Quick Buttons */}
          {mode === 'faq' && (
            <div className="space-y-2 pt-4">
              {faqQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleFaqClick(question)}
                  className="w-full bg-white text-left px-4 py-3 rounded-xl shadow-sm border border-gray-100 hover:border-[#7FDBCA] active:scale-98 transition-all"
                >
                  <span className="text-sm text-gray-700">{question}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2 max-w-[350px] mx-auto">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#7FDBCA]"
              readOnly
            />
            <button
              onClick={handleSendMessage}
              className="w-11 h-11 flex-shrink-0 bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-md"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Virtual Keyboard - Only for humanized and restaurant modes */}
        {(mode === 'humanized' || mode === 'restaurant') && (
          <VirtualKeyboard
            onKeyPress={(key) => {
              if (key === 'backspace') {
                setInputMessage((prev) => prev.slice(0, -1));
              } else {
                setInputMessage((prev) => prev + key.toLowerCase());
              }
            }}
            onSubmit={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
}