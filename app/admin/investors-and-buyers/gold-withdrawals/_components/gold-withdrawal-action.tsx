"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { approveGoldWithdrawalAdminApi } from "@/lib/api/admin/goldWithdrawalAdminApi";
import Toast from "@/components/Toast/Toast";

interface GoldWithdrawalActionProps {
  id: string;
  onActionComplete?: () => void;
}

const GoldWithdrawalAction: React.FC<GoldWithdrawalActionProps> = ({
  id,
  onActionComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const res = await approveGoldWithdrawalAdminApi(id);

      if (res?.status === 200 || res?.status === 201) {
        Toast.success(
          "Withdrawal approved! The buyer will be asked to confirm they've received the gold."
        );
        onActionComplete?.();
      } else {
        Toast.error("Something went wrong, please try again.");
      }
    } catch (err: any) {
      console.error("Action failed:", err);
      Toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <button
          className="rounded-md py-1 px-2 border border-green-500 text-green-600 bg-green-50 hover:bg-green-100 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Approve
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Approve Gold Withdrawal?
          </h2>
          <p className="text-sm text-gray-500">
            Only approve this once you've physically handed over the gold to the buyer at the
            store. They'll be asked to confirm receipt afterward.
          </p>

          <div className="flex justify-center gap-4 mt-3">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="rounded-md px-4 py-2 text-white bg-green-600 hover:bg-green-700 transition"
            >
              {loading ? "Processing..." : "Yes, Approve"}
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

export default GoldWithdrawalAction;
