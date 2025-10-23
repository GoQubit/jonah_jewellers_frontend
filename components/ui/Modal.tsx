"use client";
import React from "react";
import { IoClose } from "react-icons/io5"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isShowCloseBtn?: boolean
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, isShowCloseBtn = true, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-lg relative p-3 md:p-6 w-full max-w-md">
        {/* Close Button */}
        {isShowCloseBtn &&
          <button
            onClick={onClose}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 "
          >
            <IoClose size={20} />
          </button>
        }

        {/* Children content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
