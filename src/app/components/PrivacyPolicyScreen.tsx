import { ChevronLeft, Shield } from 'lucide-react';

interface PrivacyPolicyScreenProps {
  onClose: () => void;
}

export default function PrivacyPolicyScreen({ onClose }: PrivacyPolicyScreenProps) {
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors">Política de Privacidade</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-5 mt-6">
        {/* Ícone e Introdução */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#7FDBCA]/20 dark:bg-[#7FDBCA]/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
            <Shield className="w-8 h-8 text-[#52BFB0] dark:text-[#7FDBCA]" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
            Última atualização: <strong className="text-gray-900 dark:text-gray-100 transition-colors">31 de março de 2026</strong>
          </p>
        </div>

        {/* Conteúdo Jurídico */}
        <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">1. Coleta de Dados</h2>
            <p className="mb-3">
              O Healthy Campus coleta informações pessoais que você nos fornece diretamente ao criar uma conta, fazer um pedido ou entrar em contato conosco. Isso inclui:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Nome completo e CPF</li>
              <li>Endereço de e-mail acadêmico</li>
              <li>Número de telefone</li>
              <li>Endereços de entrega</li>
              <li>Informações de pagamento (armazenadas de forma criptografada)</li>
              <li>Histórico de pedidos e preferências alimentares</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">2. Uso de Informações</h2>
            <p className="mb-3">
              Utilizamos suas informações pessoais para:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Processar e entregar seus pedidos</li>
              <li>Comunicar sobre o status de entrega</li>
              <li>Personalizar sua experiência no app</li>
              <li>Enviar ofertas e promoções relevantes (com sua permissão)</li>
              <li>Melhorar nossos serviços através de análise de dados anonimizados</li>
              <li>Cumprir obrigações legais e fiscais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">3. Compartilhamento de Dados</h2>
            <p className="mb-3">
              Compartilhamos suas informações apenas quando necessário:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Restaurantes parceiros:</strong> Nome, endereço de entrega e itens do pedido</li>
              <li><strong>Processadores de pagamento:</strong> Informações necessárias para transações (PCI-DSS compliant)</li>
              <li><strong>Serviços de entrega:</strong> Nome, telefone e endereço para coordenar a entrega</li>
              <li><strong>Autoridades legais:</strong> Quando exigido por lei ou ordem judicial</li>
            </ul>
            <p className="mt-3">
              <strong>Nunca vendemos seus dados pessoais a terceiros.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">4. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 mt-3">
              <li>Criptografia SSL/TLS para transmissão de dados</li>
              <li>Armazenamento criptografado de informações sensíveis</li>
              <li>Autenticação de dois fatores opcional</li>
              <li>Auditorias de segurança regulares</li>
              <li>Acesso restrito aos dados apenas para funcionários autorizados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">5. Seus Direitos (LGPD)</h2>
            <p className="mb-3">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Portabilidade de dados para outro fornecedor</li>
              <li>Informações sobre o uso e compartilhamento de seus dados</li>
            </ul>
            <p className="mt-3">
              Para exercer seus direitos, entre em contato: <strong>privacidade@healthycampus.com.br</strong>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">6. Cookies e Tecnologias Similares</h2>
            <p>
              Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, lembrar preferências e analisar o uso do aplicativo. Você pode gerenciar cookies nas configurações do seu dispositivo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">7. Retenção de Dados</h2>
            <p>
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, a menos que um período de retenção maior seja exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">8. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas por e-mail ou notificação no aplicativo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">9. Contato</h2>
            <p>
              Para dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais:
            </p>
            <div className="mt-3 bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-4 transition-colors">
              <p className="text-gray-900 dark:text-gray-100 transition-colors"><strong>Encarregado de Dados (DPO)</strong></p>
              <p className="text-gray-700 dark:text-gray-300 transition-colors">E-mail: privacidade@healthycampus.com.br</p>
              <p className="text-gray-700 dark:text-gray-300 transition-colors">Telefone: (51) 3000-0000</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
