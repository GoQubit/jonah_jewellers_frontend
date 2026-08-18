"use client"
import React from "react"
import Modal from "@/components/ui/Modal"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" text-center max-w-[400px] ">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
