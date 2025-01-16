import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      aria-modal="true" 
    > 
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose} 
      />
      
      {/* Modal content */}
      <div className="relative z-51 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto bg-purple-950/90 rounded-lg shadow-xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white" 
          aria-label="Close Modal" 
        >
          {/* ... (your close button SVG) */}
        </button>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;