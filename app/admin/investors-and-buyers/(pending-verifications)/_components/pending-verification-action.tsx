"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { verifyQRTransectionApi } from "@/lib/api/transection/qrTransectionApi";
import Toast from "@/components/Toast/Toast";

interface PendingVerificationActionProps {
  id: string;
  onActionComplete?: () => void; // optional callback to refresh data if needed
}

const PendingVerificationAction: React.FC<PendingVerificationActionProps> = ({
  id,
  onActionComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!actionType) return;
    setLoading(true);

    try {
      const payload = {
        status: actionType === "APPROVE" ? "SUCCESS" : "FAILURE",
      };

      const res = await verifyQRTransectionApi(id, payload);

      if (res?.status === 200) {
        const message = `Payment ${actionType === "APPROVE" ? "Approved" : "Rejected"
          } Successfully!`
        Toast.success(message);
        // Optional callback to refresh table after success
        onActionComplete?.();
      }


    } catch (err: any) {
      console.error("Action failed:", err);
      Toast.success(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const openConfirmModal = (type: "APPROVE" | "REJECT") => {
    setActionType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <button
          className="rounded-md py-1 px-2 border border-green-500 text-green-600 bg-green-50 hover:bg-green-100 transition"
          onClick={() => openConfirmModal("APPROVE")}
        >
          Approve
        </button>

        <button
          className="rounded-md py-1 px-3 border border-red-500 text-red-600 bg-red-50 hover:bg-red-100 transition"
          onClick={() => openConfirmModal("REJECT")}
        >
          Reject
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {actionType === "APPROVE"
              ? "Approve Transaction?"
              : "Reject Transaction?"}
          </h2>
          <p className="text-sm text-gray-500">
            Are you sure you want to{" "}
            {actionType === "APPROVE" ? "approve" : "reject"} this payment
            verification?
          </p>

          <div className="flex justify-center gap-4 mt-3">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`rounded-md px-4 py-2 text-white ${actionType === "APPROVE"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
                } transition`}
            >
              {loading ? "Processing..." : "Yes, Confirm"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
              className="rounded-md px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PendingVerificationAction;
