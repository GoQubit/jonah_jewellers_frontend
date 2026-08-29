"use client"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Pagination } from "@/components/ui/Pagination"
import Toast from "@/components/Toast/Toast"
import {
  confirmGoldWithdrawalApi,
  getGoldWithdrawalsApi,
} from "@/lib/api/goldWalletApis/goldWithdrawalApis"
import { GoldWithdrawal } from "@/types/goldWalletType"
import { formatDate } from "@/utils/formatDate"
import { useEffect, useState } from "react"
import { BiBarChart } from "react-icons/bi"
import { FaCircleCheck } from "react-icons/fa6"
import { FiAlertCircle } from "react-icons/fi"
import { MdOutlineNotificationsActive } from "react-icons/md"

interface GoldWithdrawalRequestTabProps {
  onWithdrawalRequest: () => void
  availableGoldWeight: number
  refreshKey: number
  onRefresh: () => void
}

const statusLabel: Record<string, string> = {
  PENDING_ADMIN: "Awaiting Admin Approval",
  PENDING_USER: "Ready — Confirm Receipt",
  SUCCESS: "Completed",
  FAILURE: "Rejected",
}

const badgeVariant = (status: string) => {
  if (status === "SUCCESS") return "success"
  if (status === "FAILURE") return "failed"
  return "pending"
}

const WITHDRAWALS_PAGE_SIZE = 10

export function GoldWithdrawalRequestTab({
  onWithdrawalRequest,
  availableGoldWeight,
  refreshKey,
  onRefresh,
}: GoldWithdrawalRequestTabProps) {
  const [withdrawalsList, setWithdrawalsList] = useState<GoldWithdrawal[]>([])
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchWithdrawals = async (pageNumber: number) => {
    const params = { limit: WITHDRAWALS_PAGE_SIZE, page: pageNumber, sortBy: "-createdAt" }
    const res = await getGoldWithdrawalsApi(params)
    if (res?.status === 200) {
      setWithdrawalsList(res?.data?.results || [])
      setTotalPages(res?.data?.totalPages || 1)
    }
  }

  useEffect(() => {
    fetchWithdrawals(page)
  }, [refreshKey, page])

  const pendingUserConfirmations = withdrawalsList.filter((w) => w.status === "PENDING_USER")

  const handleConfirmReceived = async (id: string) => {
    setConfirmingId(id)
    try {
      const res = await confirmGoldWithdrawalApi(id)
      if (res?.status === 200 || res?.status === 201) {
        Toast.success("Thanks for confirming! This withdrawal is now complete.")
        fetchWithdrawals(page)
        onRefresh()
      } else {
        Toast.error("Something went wrong, please try again.")
      }
    } catch (error) {
      console.error("error", error)
      Toast.error("Something went wrong, please try again.")
    } finally {
      setConfirmingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Notification banner: admin has approved, waiting on the buyer to confirm they physically received the gold */}
      {pendingUserConfirmations.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
          {pendingUserConfirmations.map((withdrawal) => (
            <div
              key={withdrawal.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-2"
            >
              <div className="flex items-start gap-3">
                <MdOutlineNotificationsActive className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800">
                    Admin approved your withdrawal of {withdrawal.goldWeight}g of gold.
                  </p>
                  <p className="text-sm text-amber-700">
                    Please visit the store to collect your gold, then confirm below once you've
                    received it. Only confirm if you've actually received the gold — this cannot
                    be undone.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleConfirmReceived(withdrawal.id)}
                disabled={confirmingId === withdrawal.id}
                className="!bg-amber-600 hover:!bg-amber-700 text-white whitespace-nowrap"
              >
                {confirmingId === withdrawal.id ? "Confirming..." : "Confirm Received"}
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Withdrawal Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Request Gold Withdrawal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600 mb-1">
                {availableGoldWeight.toFixed(3)}g
              </p>
              <p className="text-green-700 font-medium">Gold Available to Withdraw</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🛡️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Withdrawal Process</h4>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Submit a request below, and our admin team will review it manually. Once
                    approved, visit our store to collect your gold, then confirm receipt here to
                    complete the withdrawal.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={onWithdrawalRequest}
              className="w-full !bg-[#B8860B] hover:!bg-[#a07609] text-white py-3"
            >
              Submit New Withdrawal Request
            </Button>
          </CardContent>
        </Card>

        {/* Withdrawal History Section */}
        <Card className="!gap-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BiBarChart className="w-5 h-5" />
              Withdrawal Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {withdrawalsList.length === 0 && (
              <p className="text-center text-gray-500 py-6">No withdrawal requests yet</p>
            )}
            {withdrawalsList?.map((withdrawal) => (
              <div key={withdrawal.id} className="flex items-center justify-between py-2 bg-gray-50">
                <div className="flex items-center gap-3">
                  {withdrawal.status === "SUCCESS" ? (
                    <FaCircleCheck className="w-8 h-8 text-green-500" />
                  ) : (
                    <FiAlertCircle className="w-8 h-8 text-brand" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{withdrawal.goldWeight}g</p>
                    <p className="text-sm text-gray-500">{formatDate(withdrawal.createdAt)}</p>
                  </div>
                </div>
                <Badge variant={badgeVariant(withdrawal.status)}>
                  {statusLabel[withdrawal.status] || withdrawal.status}
                </Badge>
              </div>
            ))}
          </CardContent>
          <div className="px-6 pb-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
