import { ChevronLeft, MapPin, Plus, Trash2, Home, Building2, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

interface Address {
  id: string;
  name: string;
  details: string;
  icon: 'home' | 'building' | 'graduation';
}

interface AddressesScreenProps {
  onClose: () => void;
}

export default function AddressesScreen({ onClose }: AddressesScreenProps) {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Campus Principal',
      details: 'Av. Sen. Salgado Filho, 1610 – Prédio 2',
      icon: 'graduation',
    },
    {
      id: '2',
      name: 'Moradia Estudantil',
      details: 'Rua Eng. Luiz Englert, 333 – Bloco A',
      icon: 'building',
    },
    {
      id: '3',
      name: 'Casa',
      details: 'Rua das Flores, 456 – Apt 301',
      icon: 'home',
    },
  ]);

  const [newAddressName, setNewAddressName] = useState('');
  const [newAddressDetails, setNewAddressDetails] = useState('');
  const [newAddressIcon, setNewAddressIcon] = useState<'home' | 'building' | 'graduation'>('home');

  const handleDeleteAddress = (addressId: string) => {
    setAddressToDelete(addressId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      setAddresses(addresses.filter((addr) => addr.id !== addressToDelete));
      setShowConfirmModal(false);
      setAddressToDelete(null);
    }
  };

  const handleSaveAddress = () => {
    if (!newAddressName.trim() || !newAddressDetails.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newAddress: Address = {
      id: Date.now().toString(),
      name: newAddressName,
      details: newAddressDetails,
      icon: newAddressIcon,
    };

    setAddresses([...addresses, newAddress]);
    setNewAddressName('');
    setNewAddressDetails('');
    setNewAddressIcon('home');
    setShowAddAddress(false);
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'home':
        return Home;
      case 'building':
        return Building2;
      case 'graduation':
        return GraduationCap;
      default:
        return MapPin;
    }
  };

  if (showAddAddress) {
    return (
      <div className="absolute inset-0 bg-white z-50 overflow-y-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddAddress(false)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Novo Endereço</h1>
          </div>
        </div>

        {/* Form */}
        <div className="px-5 mt-6 space-y-5">
          {/* Nome do Endereço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Endereço
            </label>
            <input
              type="text"
              value={newAddressName}
              onChange={(e) => setNewAddressName(e.target.value)}
              placeholder="Ex: Casa, Trabalho, Campus"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
            />
          </div>

          {/* Endereço Completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço Completo
            </label>
            <input
              type="text"
              value={newAddressDetails}
              onChange={(e) => setNewAddressDetails(e.target.value)}
              placeholder="Rua, número, complemento"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7FDBCA] focus:border-transparent transition-all"
            />
          </div>

          {/* Tipo de Endereço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Endereço
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setNewAddressIcon('home')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                  newAddressIcon === 'home'
                    ? 'border-[#7FDBCA] bg-[#7FDBCA]/10 text-[#52BFB0]'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <Home className="w-5 h-5" />
                Casa
              </button>
              <button
                onClick={() => setNewAddressIcon('building')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                  newAddressIcon === 'building'
                    ? 'border-[#7FDBCA] bg-[#7FDBCA]/10 text-[#52BFB0]'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <Building2 className="w-5 h-5" />
                Apto
              </button>
              <button
                onClick={() => setNewAddressIcon('graduation')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                  newAddressIcon === 'graduation'
                    ? 'border-[#7FDBCA] bg-[#7FDBCA]/10 text-[#52BFB0]'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                Campus
              </button>
            </div>
          </div>

          {/* Botão Salvar */}
          <button
            onClick={handleSaveAddress}
            className="w-full bg-gradient-to-r from-[#7FDBCA] to-[#5FC9B8] hover:from-[#6CCBB9] hover:to-[#4FB8A7] text-white font-semibold py-4 rounded-2xl active:scale-95 transition-all shadow-lg mt-8"
          >
            Salvar Endereço
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-white z-50 overflow-y-auto pb-8">
      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Endereço"
        message="Tem certeza que deseja remover este endereço? Esta ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmModal(false)}
      />

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
            <h1 className="text-xl font-bold text-gray-900">Meus Endereços</h1>
          </div>

          <button
            onClick={() => setShowAddAddress(true)}
            className="flex items-center gap-2 bg-[#7FDBCA] hover:bg-[#6CCBB9] text-white px-4 py-2 rounded-xl transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-semibold">Novo</span>
          </button>
        </div>
      </div>

      {/* Lista de Endereços */}
      <div className="px-5 mt-6">
        <div className="space-y-3">
          {addresses.map((address) => {
            const IconComponent = getIcon(address.icon);
            return (
              <div
                key={address.id}
                className="bg-white rounded-[16px] border-2 border-gray-200 p-4 flex items-center gap-4 hover:border-[#7FDBCA]/50 transition-all"
              >
                <div className="w-12 h-12 bg-[#7FDBCA]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-[#52BFB0]" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{address.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{address.details}</p>
                </div>

                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="w-9 h-9 bg-gray-100 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors active:scale-95"
                >
                  <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            );
          })}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">Nenhum endereço cadastrado</p>
            <button
              onClick={() => setShowAddAddress(true)}
              className="mt-4 text-[#52BFB0] font-semibold text-sm"
            >
              Adicionar primeiro endereço
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
