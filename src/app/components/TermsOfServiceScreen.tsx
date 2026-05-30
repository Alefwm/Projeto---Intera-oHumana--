import { ChevronLeft, FileText } from 'lucide-react';

interface TermsOfServiceScreenProps {
  onClose: () => void;
}

export default function TermsOfServiceScreen({ onClose }: TermsOfServiceScreenProps) {
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors">Termos de Uso</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-5 mt-6">
        {/* Ícone e Introdução */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FFB088]/20 dark:bg-[#FFB088]/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
            <FileText className="w-8 h-8 text-[#FF9965] dark:text-[#FFB088]" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
            Última atualização: <strong className="text-gray-900 dark:text-gray-100 transition-colors">31 de março de 2026</strong>
          </p>
        </div>

        {/* Conteúdo Jurídico */}
        <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">1. Aceitação dos Termos</h2>
            <p>
              Ao usar o Healthy Campus, você concorda com estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve usar nosso aplicativo ou serviços.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">2. Descrição do Serviço</h2>
            <p className="mb-3">
              O Healthy Campus é uma plataforma de delivery de alimentação voltada para estudantes universitários, que conecta usuários a restaurantes parceiros. Oferecemos:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Pedidos online de refeições e produtos</li>
              <li>Sistema de pagamento integrado (PIX, cartão de crédito/débito)</li>
              <li>Rastreamento de pedidos em tempo real</li>
              <li>Programa de fidelidade e cupons de desconto</li>
              <li>Funcionalidade "Pedido Pool" para divisão de pedidos entre amigos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">3. Elegibilidade</h2>
            <p>
              Para usar o Healthy Campus, você deve:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 mt-3">
              <li>Ter pelo menos 18 anos de idade ou consentimento dos pais/responsáveis</li>
              <li>Possuir um e-mail acadêmico válido (.edu.br ou similar)</li>
              <li>Fornecer informações verdadeiras e atualizadas</li>
              <li>Não ter sido banido anteriormente por violação dos termos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">4. Conta do Usuário</h2>
            <p className="mb-3">
              Você é responsável por:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Manter a confidencialidade de sua senha</li>
              <li>Todas as atividades realizadas em sua conta</li>
              <li>Notificar-nos imediatamente sobre uso não autorizado</li>
              <li>Não compartilhar sua conta com terceiros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">5. Pedidos e Pagamentos</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors">5.1 Realização de Pedidos</h3>
                <p>
                  Ao confirmar um pedido, você está fazendo uma oferta de compra. Todos os pedidos estão sujeitos à aceitação pelo restaurante e disponibilidade dos itens.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors">5.2 Preços e Taxas</h3>
                <p>
                  Os preços são definidos pelos restaurantes parceiros. Podemos cobrar taxas de entrega e serviço, que serão claramente informadas antes da finalização do pedido.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors">5.3 Pagamento</h3>
                <p>
                  Aceitamos PIX, cartão de crédito e débito. O pagamento é processado através de parceiros seguros (PCI-DSS compliant).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors">5.4 Cancelamentos e Reembolsos</h3>
                <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                  <li>Cancelamentos antes da confirmação: reembolso integral</li>
                  <li>Após confirmação pelo restaurante: sujeito à política do estabelecimento</li>
                  <li>Problemas com o pedido: entre em contato imediatamente via chat</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">6. Código de Conduta</h2>
            <p className="mb-3">
              Você concorda em NÃO:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Usar o serviço para atividades ilegais ou fraudulentas</li>
              <li>Fornecer informações falsas ou enganosas</li>
              <li>Abusar, assediar ou ameaçar entregadores ou funcionários de restaurantes</li>
              <li>Fazer pedidos falsos ou cancelamentos excessivos</li>
              <li>Tentar hackear, descompilar ou fazer engenharia reversa do aplicativo</li>
              <li>Usar bots ou scripts automatizados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">7. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do Healthy Campus (logotipos, textos, gráficos, código) é protegido por direitos autorais e marcas registradas. Você não pode copiar, modificar ou distribuir sem nossa autorização expressa.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">8. Limitação de Responsabilidade</h2>
            <p className="mb-3">
              O Healthy Campus atua como intermediário entre você e os restaurantes. Não somos responsáveis por:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Qualidade, segurança ou adequação dos alimentos</li>
              <li>Atrasos ou cancelamentos causados pelos restaurantes ou entregadores</li>
              <li>Alergias ou reações adversas aos alimentos</li>
              <li>Danos indiretos ou lucros cessantes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">9. Suspensão e Encerramento</h2>
            <p>
              Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer momento, sem aviso prévio, em caso de violação destes termos ou comportamento inadequado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">10. Modificações dos Termos</h2>
            <p>
              Podemos modificar estes Termos de Uso a qualquer momento. Mudanças significativas serão notificadas por e-mail ou no aplicativo. O uso continuado após mudanças constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">11. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca de Porto Alegre/RS.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors">12. Contato</h2>
            <p>
              Para dúvidas sobre estes Termos de Uso:
            </p>
            <div className="mt-3 bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-4 transition-colors">
              <p className="text-gray-900 dark:text-gray-100 transition-colors"><strong>Healthy Campus - Suporte Jurídico</strong></p>
              <p className="text-gray-700 dark:text-gray-300 transition-colors">E-mail: juridico@healthycampus.com.br</p>
              <p className="text-gray-700 dark:text-gray-300 transition-colors">Telefone: (51) 3000-0000</p>
              <p className="text-gray-700 dark:text-gray-300 transition-colors">Horário: Segunda a Sexta, 9h-18h</p>
            </div>
          </section>

          <div className="mt-8 p-4 bg-[#7FDBCA]/10 dark:bg-[#7FDBCA]/20 border-l-4 border-[#7FDBCA] rounded-lg transition-colors">
            <p className="text-xs text-gray-700 dark:text-gray-300 transition-colors">
              <strong>Importante:</strong> Ao usar o Healthy Campus, você declara ter lido, compreendido e concordado com todos os termos e condições descritos neste documento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
