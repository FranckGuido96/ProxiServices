import React, { useId, useRef } from 'react';
import { X } from 'lucide-react';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Monté seulement quand la fenêtre est ouverte
const ModalDialog: React.FC<Omit<DashboardModalProps, 'isOpen'>> = ({ onClose, title, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialogFocus(dialogRef, onClose);

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[80vh] overflow-y-auto shadow-2xl outline-none"
      >
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-white/10 sticky top-0 bg-surface dark:bg-[#121215]">
          <h3 id={titleId} className="text-sm font-bold text-text dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="p-1.5 rounded-lg text-text-secondary dark:text-white/50 hover:bg-background dark:hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const DashboardModal: React.FC<DashboardModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <ModalDialog onClose={onClose} title={title}>
      {children}
    </ModalDialog>
  );
};