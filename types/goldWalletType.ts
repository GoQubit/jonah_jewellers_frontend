export interface GoldWalletInfo {
  goldWeight: number
  availableGoldWeight: number
  lockedGoldWeight: number
  totalInvestedAmount: number
  averagePerGram: number
  currentGoldRatePer10g: number
  currentValueInr: number
}

export interface GoldInvestment {
  id: string
  userId: number
  amount: number
  goldRate: number
  goldAssigned: number
  qrTransactionId: number
  status: "PENDING" | "SUCCESS" | "FAILURE"
  createdAt: string
  updatedAt: string
}

export type GoldWithdrawalStatus = "PENDING_ADMIN" | "PENDING_USER" | "SUCCESS" | "FAILURE"

export interface GoldWithdrawal {
  id: string
  userId: number
  goldWeight: number
  goldRateAtRequest: number
  reason: string
  status: GoldWithdrawalStatus
  adminApprovedAt?: string | null
  adminApprovedBy?: number | null
  adminRejectedAt?: string | null
  adminRejectedBy?: number | null
  userConfirmedAt?: string | null
  userCancelledAt?: string | null
  createdAt: string
  updatedAt: string
}
