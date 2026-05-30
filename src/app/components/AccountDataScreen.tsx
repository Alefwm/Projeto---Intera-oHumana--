import { ChevronLeft, Edit2, User, Mail, Phone, Calendar, GraduationCap, CreditCard } from 'lucide-react';
import { useState } from 'react';
import Toast from './Toast';

interface AccountDataScreenProps {
  onClose: () => void;
}

export default function AccountDataScreen({ onClose }: AccountDataScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Estado controlado para feedback em tempo real
  const [fullName, setFullName] = useState('Lucas Silva de Oliveira');
  const [cpf, setCpf] = useState('000.555.888-99');
  const [email, setEmail] = useState('lucas.oliveira@ufrgs.edu.br');
  const [phone, setPhone] = useState('(51) 98888-7766');
  const [birthDate, setBirthDate] = useState('15/05/2004');
  const [course, setCourse] = useState('Análise e Desenvolvimento de Sistemas');

  const handleSave = () => {
    // Aqui seria feita a persistência dos dados (API/localStorage)
    console.log('Dados salvos:', { fullName, cpf, email, phone, birthDate, course });
    setIsEditing(false);
    setShowToast(true);
  };

  return (
    <div className="absolute inset-0 bg-white z-50 overflow-y-auto pb-8">
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Dados salvos com sucesso!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Dados da Conta</h1>
          </div>

          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all active:scale-95 ${
              isEditing
                ? 'bg-[#7FDBCA] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Edit2 className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isEditing ? 'Salvar' : 'Editar'}
            </span>
          </button>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center px-5 mt-8">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-[#7FDBCA] to-[#5FC9B8] rounded-full flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-white stroke-2" />
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#FFB088] rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform">
              <Edit2 className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-4">{fullName}</h2>
        <p className="text-xs text-gray-500 mt-1">Estudante Universitário</p>
      </div>

      {/* Formulário de Dados */}
      <div className="px-5 mt-8 space-y-5">
        {/* Nome Completo */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <User className="w-4 h-4" />
            Nome Completo
          </label>
          {isEditing ? (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
            />
          ) : (
            <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 font-medium">
              {fullName}
            </div>
          )}
        </div>

        {/* CPF */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <CreditCard className="w-4 h-4" />
            CPF
          </label>
          {isEditing ? (
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
            />
          ) : (
            <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 font-medium">
              {cpf}
            </div>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <Mail className="w-4 h-4" />
            E-mail Acadêmico
          </label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
            />
          ) : (
            <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 font-medium">
              {email}
            </div>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <Phone className="w-4 h-4" />
            Telefone
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
            />
          ) : (
            <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 font-medium">
              {phone}
            </div>
          )}
        </div>

        {/* Data de Nascimento */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            Data de Nascimento
          </label>
          {isEditing ? (
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
            />
          ) : (
            <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 font-medium">
              {birthDate}
            </div>
          )}
        </div>

        {/* Curso */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <GraduationCap className="w-4 h-4" />
            Curso
          </label>
          {isEditing ? (
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
            />
          ) : (
            <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 font-medium">
              {course}
            </div>
          )}
        </div>
      </div>

      {/* Info Footer */}
      {!isEditing && (
        <div className="px-5 mt-8">
          <div className="bg-blue-50 border-l-4 border-[#7FDBCA] rounded-lg p-4">
            <p className="text-xs text-gray-600">
              Para alterar seus dados, clique no botão "Editar" no topo da tela. Suas informações estão protegidas e serão usadas apenas para melhorar sua experiência.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
