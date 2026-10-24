import React, { useId, useRef } from 'react';
import { Bell, Star, TrendingUp, X } from 'lucide-react';
import { DashboardNotification, NotificationSegment } from '../../data/dashboardDemo';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: DashboardNotification[];
}

const renderSegment = (segment: NotificationSegment, index: number) => {
  switch (segment.emphasis) {
    case 'name':
      return (
        <strong key={index} className="text-text dark:text-white">
          {segment.text}
        </strong>
      );
    case 'quote':
      return <em key={index}>{segment.text}</em>;
    case 'accent':
      return (
        <strong key={index} className="text-primary-700 dark:text-emerald-400">
          {segment.text}
        </strong>
      );
    default:
      return <React.Fragment key={index}>{segment.text}</React.Fragment>;
  }
};

// Monté seulement quand le panneau est ouvert
const NotificationsDialog: React.FC<Omit<NotificationsPanelProps, 'isOpen'>> = ({ onClose, notifications }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialogFocus(panelRef, onClose);

  const newCount = notifications.filter((n) => n.isNew).length;

  return (
    <>
      {/* Calque d'arrière-plan : un clic à l'extérieur ferme le panneau */}
      <div role="presentation" className="fixed inset-0 z-40" onClick={onClose} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="fixed top-16 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] bg-surface dark:bg-[#121215] border border-border dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-black/60 overflow-hidden outline-none"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-white/5">
          <h3 id={titleId} className="text-xs font-bold text-text dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary-700 dark:text-emerald-400" aria-hidden="true" />
            <span>Mes Notifications</span>
          </h3>
          <div className="flex items-center gap-2">
            {newCount > 0 && (
              <span className="text-[10px] bg-primary-50 dark:bg-emerald-950 text-primary-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-primary-200 dark:border-emerald-500/30">
                {newCount} nouvelle{newCount > 1 ? 's' : ''}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-text-secondary dark:text-white/40 hover:text-text dark:hover:text-white hover:bg-background dark:hover:bg-white/5 transition"
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <p className="p-4 text-xs text-text-secondary dark:text-white/50 text-center">Aucune notification pour le moment.</p>
        ) : (
          <ul className="p-3 space-y-2.5">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-background dark:bg-[#18181C] p-3 rounded-xl border border-border dark:border-white/5 flex items-start gap-3"
              >
                {notification.icon === 'star' ? (
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-[#2A1D08] border border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0">
                    <Star className="w-4 h-4 fill-amber-500 dark:fill-amber-400" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-primary-50 dark:bg-emerald-950 border border-primary-200 dark:border-emerald-500/30 text-primary-700 dark:text-emerald-400 shrink-0">
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-text dark:text-white truncate">{notification.title}</h4>
                    <span className="text-[10px] text-text-secondary dark:text-white/40 shrink-0">{notification.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary dark:text-white/70 mt-1 leading-relaxed">
                    {notification.segments.map(renderSegment)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;
  return <NotificationsDialog onClose={onClose} notifications={notifications} />;
};