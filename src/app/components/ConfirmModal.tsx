import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const variantColors = {
    danger: {
      bg: 'bg-red-50',
      icon: 'text-red-500',
      button: 'bg-red-500 hover:bg-red-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-500',
      button: 'bg-yellow-500 hover:bg-yellow-600',
    },
    info: {
      bg: 'bg-blue-50',
      icon: 'text-blue-500',
      button: 'bg-blue-500 hover:bg-blue-600',
    },
  };

  const colors = variantColors[variant];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Icon */}
        <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-4`}>
          <AlertTriangle className={`w-8 h-8 ${colors.icon}`} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all active:scale-95"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 ${colors.button} text-white font-semibold rounded-xl transition-all active:scale-95`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 200ms ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 300ms ease-out;
        }
      `}</style>
    </div>
  );
}
