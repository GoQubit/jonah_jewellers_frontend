"use client";

import React, { useState } from "react";
import { getSellerUserDetailApi } from "@/lib/api/admin/buyerUserAdminApi";
import { formatDate } from "@/utils/formatDate";

interface SellerDetailActionProps {
  id: string;
}

type DetailState = { isLoading: boolean; data: null | any; error: null | string };
const initialDetail: DetailState = { isLoading: false, data: null, error: null };

const statusColor = (status?: string) => {
  if (!status) return "#6B7280";
  if (["SUCCESS", "ACTIVE", "COMPLETED"].includes(status)) return "#14863D";
  if (["PENDING", "AWAITING_COMPLETION"].includes(status)) return "#E8A83E";
  if (["FAILED"].includes(status)) return "#FF0000";
  return "#6B7280";
};

const SellerDetailAction: React.FC<SellerDetailActionProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState<DetailState>(initialDetail);

  const fetchDetail = async () => {
    setDetail({ ...initialDetail, isLoading: true });
    try {
      const response = await getSellerUserDetailApi(id);
      if (response?.status === 200) {
        setDetail({ isLoading: false, data: response.data, error: null });
      } else {
        throw new Error(response?.data?.message || "Couldn't load seller details!");
      }
    } catch (e: any) {
      setDetail({ isLoading: false, data: null, error: e?.message || "Something went wrong!" });
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    fetchDetail();
  };

  const user = detail.data?.user;
  const investments = detail.data?.investments?.results || [];

  return (
    <>
      <button
        onClick={handleOpen}
        className="rounded-md py-1 px-3 border border-brand text-brand bg-orange-50 hover:bg-orange-100 transition"
      >
        View
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-lg relative w-full max-w-3xl max-h-[85vh] overflow-y-auto p-4 md:p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-1.5"
              aria-label="Close"
            >
              ✕
            </button>

            {detail.isLoading && (
              <div className="py-10 text-center text-gray-500">Loading seller details...</div>
            )}

            {detail.error && !detail.isLoading && (
              <div className="py-10 text-center text-red-600">{detail.error}</div>
            )}

            {user && !detail.isLoading && !detail.error && (
              <div className="flex flex-col gap-6">
                {/* Profile */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {[user.firstName, user.lastName].filter(Boolean).join(" ") || "-"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div><span className="text-gray-500">Mobile Number:</span> {user.mobileNumber || "-"}</div>
                    <div><span className="text-gray-500">Email:</span> {user.email || "-"}</div>
                    <div><span className="text-gray-500">Gender:</span> {user.gender || "-"}</div>
                    <div>
                      <span className="text-gray-500">Status:</span>{" "}
                      <span style={{ color: statusColor(user.isApproved ? "SUCCESS" : "PENDING") }}>
                        {user.isApproved ? "Approved" : "Pending"}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-gray-500">Address:</span>{" "}
                      {[user.address?.line1, user.address?.line2, user.address?.city, user.address?.state, user.address?.pinCode]
                        .filter(Boolean)
                        .join(", ") || "-"}
                    </div>
                    <div><span className="text-gray-500">Email Verified:</span> {user.isEmailVerified ? "Yes" : "No"}</div>
                    <div><span className="text-gray-500">Mobile Verified:</span> {user.isMobileVerified ? "Yes" : "No"}</div>
                    <div className="sm:col-span-2"><span className="text-gray-500">Joined On:</span> {user.createdAt ? formatDate(user.createdAt) : "-"}</div>
                  </div>
                </div>

                {/* Investments */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Investments ({investments.length})</h3>
                  {investments.length === 0 ? (
                    <p className="text-sm text-gray-500">No investments</p>
                  ) : (
                    <div className="overflow-x-auto border rounded-md">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left px-3 py-2 font-medium">Amount</th>
                            <th className="text-left px-3 py-2 font-medium">Gold Rate</th>
                            <th className="text-left px-3 py-2 font-medium">Gold Assigned</th>
                            <th className="text-left px-3 py-2 font-medium">Date</th>
                            <th className="text-left px-3 py-2 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {investments.map((investment: any) => (
                            <tr key={investment.id} className="border-t">
                              <td className="px-3 py-2">₹{investment.amount?.toLocaleString("en-IN")}</td>
                              <td className="px-3 py-2">₹{investment.goldRate?.toLocaleString("en-IN")}</td>
                              <td className="px-3 py-2">{investment.goldAssigned}g</td>
                              <td className="px-3 py-2">{investment.createdAt ? formatDate(investment.createdAt) : "-"}</td>
                              <td className="px-3 py-2">
                                <span style={{ color: statusColor(investment.transactionStatus) }}>
                                  {investment.transactionStatus || "-"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SellerDetailAction;
