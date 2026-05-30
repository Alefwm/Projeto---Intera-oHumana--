import { ChevronLeft, Moon, Bell, Globe, Lock, HelpCircle, FileText, Shield, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface SettingsScreenProps {
  onClose: () => void;
  onOpenNotifications?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenTerms?: () => void;
}

export default function SettingsScreen({ onClose, onOpenNotifications, onOpenPrivacyPolicy, onOpenTerms }: SettingsScreenProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const settingsOptions = [
    {
      id: 'notifications',
      label: 'Preferências de Notificação',
      icon: Bell,
      action: () => onOpenNotifications?.(),
      type: 'navigation' as const,
    },
    {
      id: 'language',
      label: t('settings.language'),
      icon: Globe,
      action: () => setShowLanguageModal(true),
      type: 'navigation' as const,
      subtitle: language === 'pt-BR' ? 'Português (Brasil)' : 'English (US)',
    },
    {
      id: 'privacy',
      label: 'Política de Privacidade',
      icon: Shield,
      action: () => onOpenPrivacyPolicy?.(),
      type: 'navigation' as const,
    },
    {
      id: 'terms',
      label: 'Termos de Uso',
      icon: FileText,
      action: () => onOpenTerms?.(),
      type: 'navigation' as const,
    },
    {
      id: 'security',
      label: 'Segurança e Senha',
      icon: Lock,
      action: () => console.log('Segurança'),
      type: 'navigation' as const,
    },
    {
      id: 'help',
      label: 'Central de Ajuda',
      icon: HelpCircle,
      action: () => console.log('Ajuda'),
      type: 'navigation' as const,
    },
  ];

  return (
    <div className="absolute inset-0 bg-white dark:bg-[#121212] z-50 overflow-y-auto pb-8 transition-colors">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-700 px-5 py-4 transition-colors">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 dark:bg-[#1E1E1E] rounded-full flex items-center justify-center active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors">Configurações</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-5 mt-6">
        {/* Seção: Aparência */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 transition-colors">
            Aparência
          </h3>

          {/* Dark Mode Toggle */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 dark:bg-[#7FDBCA] rounded-full flex items-center justify-center transition-colors">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors">Modo Escuro</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Ativar tema escuro</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={toggleDarkMode}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  isDarkMode ? 'bg-[#7FDBCA]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Seção: Preferências */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 transition-colors">
            Preferências
          </h3>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
            {settingsOptions.slice(0, 2).map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={option.action}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] active:bg-gray-100 dark:active:bg-[#333] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#7FDBCA]/10 dark:bg-[#7FDBCA]/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-[#52BFB0] dark:text-[#7FDBCA] transition-colors" />
                  </div>

                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">{option.label}</p>
                    {option.subtitle && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 transition-colors">{option.subtitle}</p>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Seção: Jurídico */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 transition-colors">
            Jurídico e Segurança
          </h3>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
            {settingsOptions.slice(2, 5).map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={option.action}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] active:bg-gray-100 dark:active:bg-[#333] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#7FDBCA]/10 dark:bg-[#7FDBCA]/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-[#52BFB0] dark:text-[#7FDBCA] transition-colors" />
                  </div>

                  <p className="flex-1 text-left text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">
                    {option.label}
                  </p>

                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Seção: Suporte */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 transition-colors">
            Suporte
          </h3>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            {settingsOptions.slice(5).map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={option.action}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] active:bg-gray-100 dark:active:bg-[#333] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#7FDBCA]/10 dark:bg-[#7FDBCA]/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-[#52BFB0] dark:text-[#7FDBCA] transition-colors" />
                  </div>

                  <p className="flex-1 text-left text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">
                    {option.label}
                  </p>

                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Versão do App */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mb-4 transition-colors">
          Versão 1.0.0 (Build 2026.03.31)
        </div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowLanguageModal(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-[#1E1E1E] rounded-t-3xl p-6 animate-slideUp transition-colors">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('settings.language')}
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setLanguage('pt-BR');
                  setShowLanguageModal(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all ${
                  language === 'pt-BR'
                    ? 'bg-[#7FDBCA]/10 border-2 border-[#7FDBCA]'
                    : 'bg-gray-50 dark:bg-[#2A2A2A] border-2 border-transparent hover:bg-gray-100 dark:hover:bg-[#353535]'
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Português (Brasil)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Portuguese (Brazil)</p>
                </div>
                {language === 'pt-BR' && (
                  <Check className="w-6 h-6 text-[#52BFB0]" />
                )}
              </button>

              <button
                onClick={() => {
                  setLanguage('en-US');
                  setShowLanguageModal(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all ${
                  language === 'en-US'
                    ? 'bg-[#7FDBCA]/10 border-2 border-[#7FDBCA]'
                    : 'bg-gray-50 dark:bg-[#2A2A2A] border-2 border-transparent hover:bg-gray-100 dark:hover:bg-[#353535]'
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">English (US)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Inglês (Estados Unidos)</p>
                </div>
                {language === 'en-US' && (
                  <Check className="w-6 h-6 text-[#52BFB0]" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
