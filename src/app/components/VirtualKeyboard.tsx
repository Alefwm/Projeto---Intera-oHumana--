interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onSubmit?: () => void;
  submitLabel?: string;
}

export default function VirtualKeyboard({ onKeyPress, onSubmit, submitLabel = 'Enviar' }: VirtualKeyboardProps) {
  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      onKeyPress('backspace');
    } else if (key === 'espaço') {
      onKeyPress(' ');
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="w-full max-w-[393px] bg-gray-200 border-t border-gray-300">
      {/* Keyboard Row 1 */}
      <div className="flex gap-0.5 p-1">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <button
            key={key}
            className="flex-1 py-2.5 bg-white rounded text-xs font-medium text-gray-800 shadow-sm active:bg-gray-100"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Keyboard Row 2 */}
      <div className="flex gap-0.5 p-1">
        <div className="w-2"></div>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <button
            key={key}
            className="flex-1 py-2.5 bg-white rounded text-xs font-medium text-gray-800 shadow-sm active:bg-gray-100"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
        <div className="w-2"></div>
      </div>

      {/* Keyboard Row 3 */}
      <div className="flex gap-0.5 p-1">
        <button className="px-3 py-2.5 bg-gray-300 rounded text-xs font-medium text-gray-700 shadow-sm active:bg-gray-200">
          ⇧
        </button>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <button
            key={key}
            className="flex-1 py-2.5 bg-white rounded text-xs font-medium text-gray-800 shadow-sm active:bg-gray-100"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
        <button
          className="px-3 py-2.5 bg-gray-300 rounded text-xs font-medium text-gray-700 shadow-sm active:bg-gray-200"
          onClick={() => handleKeyPress('⌫')}
        >
          ⌫
        </button>
      </div>

      {/* Keyboard Row 4 */}
      <div className="flex gap-0.5 p-1 pb-2">
        <button className="px-3 py-2.5 bg-gray-300 rounded text-xs font-medium text-gray-700 shadow-sm active:bg-gray-200">
          123
        </button>
        <button
          className="px-2 py-2.5 bg-white rounded text-xs font-medium text-gray-800 shadow-sm active:bg-gray-100"
          onClick={() => handleKeyPress('@')}
        >
          @
        </button>
        <button
          className="flex-1 py-2.5 bg-white rounded text-xs font-medium text-gray-800 shadow-sm active:bg-gray-100"
          onClick={() => handleKeyPress('espaço')}
        >
          espaço
        </button>
        <button
          className="px-2 py-2.5 bg-white rounded text-xs font-medium text-gray-800 shadow-sm active:bg-gray-100"
          onClick={() => handleKeyPress('.')}
        >
          .
        </button>
        {onSubmit && (
          <button
            onClick={onSubmit}
            className="px-4 py-2.5 bg-[#7FDBCA] rounded text-xs font-medium text-white shadow-sm active:bg-[#5FC9B8]"
          >
            {submitLabel}
          </button>
        )}
      </div>
    </div>
  );
}