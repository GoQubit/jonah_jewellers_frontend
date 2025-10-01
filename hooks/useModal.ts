"use client"

import { ModalContext } from "@/context/modal-provider"
import { useContext } from "react"

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within the modal provider')
    }
    return context
}