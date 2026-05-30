import { MapPin, Check } from 'lucide-react';

interface Address {
  id: number;
  name: string;
  details: string;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: Address;
  onSelectAddress: (address: Address) => void;
  onClose: () => void;
}

export default function AddressSelector({
  addresses,
  selectedAddress,
  onSelectAddress,
  onClose
}: AddressSelectorProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-20"
        onClick={onClose}
      ></div>

      {/* Address Selection Panel */}
      <div className="absolute top-20 left-5 right-5 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-30">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Selecione o endereço</h3>
          <p className="text-xs text-gray-500 mt-1">Escolha onde deseja receber seu pedido</p>
        </div>

        {/* Address List */}
        <div className="max-h-80 overflow-y-auto">
          {addresses.map((address) => (
            <button
              key={address.id}
              onClick={() => {
                onSelectAddress(address);
                onClose();
              }}
              className={`w-full px-5 py-4 flex items-start gap-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedAddress.id === address.id ? 'bg-[#7FDBCA]/5' : ''
              }`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                selectedAddress.id === address.id ? 'bg-[#7FDBCA]' : 'bg-gray-100'
              }`}>
                <MapPin className={`w-5 h-5 ${
                  selectedAddress.id === address.id ? 'text-white' : 'text-gray-400'
                }`} />
              </div>

              {/* Address Info */}
              <div className="flex-1 text-left">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {address.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {address.details}
                </p>
              </div>

              {/* Check Icon */}
              {selectedAddress.id === address.id && (
                <Check className="w-5 h-5 text-[#7FDBCA] flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
          <button className="w-full py-3 bg-gradient-to-r from-[#7FDBCA] to-[#5FC9B8] text-white rounded-full text-sm font-medium hover:shadow-lg transition-shadow">
            + Adicionar novo endereço
          </button>
        </div>
      </div>
    </>
  );
}
