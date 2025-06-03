"use client";

import { ReactNode } from "react";

interface ModalAction {
  label: string;
  onClick: () => void;
  className?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  actions: ModalAction[];
}

export default function Modal({
  isOpen,
  onClose,
  children,
  actions,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg mx-4 sm:mx-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sm:text-sm text-xs">{children}</div>

          <div className="mt-6 flex justify-end gap-4">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className={`px-4 py-2 rounded-md font-medium sm:text-sm text-xs cursor-pointer ${
                  action.className ??
                  "bg-hana-green text-white hover:bg-hana-green/90"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
