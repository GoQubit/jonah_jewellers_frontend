"use client"

import { ChangeEvent, useRef, useState } from "react"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { BiCloset, BiHome } from "react-icons/bi"
import { IoClose } from "react-icons/io5"
import { MdOutlinePayments } from "react-icons/md"

interface PaymentConfirmationModalProps {
  amount: number
  onConfirm: (transactionId: string) => void
  onCancel: () => void
}

interface FileItem {
  name: string;
  size: string;
  type: string;
  file?: File; // Add the actual File object to your interface
}

export function PaymentConfirmationModal({ amount, onConfirm, onCancel }: PaymentConfirmationModalProps) {
  const [transactionId, setTransactionId] = useState("")
  const [file, setFile] = useState<FileItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    
    if (transactionId.trim()) {
      onConfirm(transactionId.trim())
    }

  }

  const isImageFile = (file: File): boolean => {
    // Check if the file type starts with 'image/'
    return file.type.startsWith('image/');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);
    if (selectedFile) {
      // Validate the file is an image
      if (!isImageFile(selectedFile)) {
        setFileError("Only image files are allowed. Please select a valid image file.");
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
      // Convert file size to MB
      const fileSizeInMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
      setFile({
        name: selectedFile.name,
        size: `${fileSizeInMB}MB`,
        type: selectedFile.type,
        file: selectedFile
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white max-w-md w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MdOutlinePayments size={20} />
          <h2 className="text-xl font-semibold text-gray-900">Confirm Your Payment</h2>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-green-800 mb-2">Payment Confirmation Required</h3>
        <p className="text-sm text-green-700">
          Please enter the transaction ID from your UPI app to confirm your payment of ₹{amount.toLocaleString()}.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">UPI Transaction ID*</label>
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="# Enter UPI Transaction ID (e.g. TXN1234567)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand"
        />
      </div>

      <>
        {/* Upload area */}
        <div>
          <label htmlFor="attachment">Upload Image*</label>
          <div
            onClick={handleUploadClick}
            className={`border-2 border-dashed border-gray-200 rounded-lg p-2 mb-4 flex flex-col items-center justify-center cursor-pointer ${!file ? "hover:bg-gray-50" : "hidden"}`}
          >
            <div className="bg-gray-100 p-2 rounded-full mb-3">
              <AiOutlineCloudUpload size={20} />
            </div>
            <p className="text-logo text-sm font-medium mb-1">Click to upload</p>
            <p className="text-gray-500 text-xs">Only image files are accepted</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
        {/* File preview */}
        {file && (
          <div className="border border-gray-200 rounded-lg p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded mr-3">
                <div className="bg-yellow-300 w-8 h-8 flex items-center justify-center rounded">
                  <span className="text-xs font-bold bg-blue-600 text-white px-1 rounded">IMG</span>
                </div>
              </div>
              <div className="max-w-[160px]">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-gray-500 text-sm">{file.size}</p>
              </div>
            </div>
            <button onClick={handleRemoveFile} className="text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}
      </>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={!transactionId.trim() && !file?.file}
          className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  )
}
