import { ReactNode } from "react";
import XIcon from "@/public/icons/XIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-[#171717] z-50">
      <div className="w-[90%] max-w-xl h-auto bg-white rounded-2xl p-8">
        <button className="absolute top-8 right-8" onClick={onClose}>
          <XIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
