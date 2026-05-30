import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bg: 'bg-green-500',
      text: 'text-white',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-red-500',
      text: 'text-white',
    },
    info: {
      icon: Info,
      bg: 'bg-blue-500',
      text: 'text-white',
    },
  };

  const { icon: Icon, bg, text } = config[type];

  return (
    <div className="fixed top-20 left-0 right-0 z-[200] flex justify-center px-5 animate-slideDown">
      <div className={`${bg} ${text} rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 max-w-md w-full`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 300ms ease-out;
        }
      `}</style>
    </div>
  );
}
