import { verifyRazorPayOrderApi } from "@/lib/api/order/orderApis";
import React from "react";


function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RazorpayButton({
  amount,
  orderId,
  currency = "INR",
  orderMeta,
  onSuccess,
  onError,
}: {
  amount: number;
  orderId: string
  currency?: string;
  orderMeta: {
    orderId: string; // 👈 from backend (razorpayOrder.id)
    receipt?: string;
    name?: string;
    description?: string;
    prefill?: { name?: string; email?: string; contact?: string };
    notes?: Record<string, any>;
    themeColor?: string;
  };
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
}) {
  const handlePayment = async () => {
    const ok = await loadRazorpayScript();
    if (!ok) return onError?.("Razorpay SDK failed");

    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, // convert ₹ → paise
      currency,
      name: orderMeta.name,
      description: orderMeta.description,
      order_id: orderMeta.orderId, // 👈 use backend razorpay order id
      handler: async function (response: any) {
        try {
          const payload = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            orderId: orderId,
          }
          const verifyRes = await verifyRazorPayOrderApi(payload);

          const verifyJson = await verifyRes.json();
          if (verifyJson.success) {
            onSuccess?.(verifyJson);
          } else {
            onError?.(verifyJson);
          }
        } catch (err) {
          onError?.(err);
        }
      },
      prefill: orderMeta.prefill,
      notes: orderMeta.notes || {},
      theme: { color: orderMeta.themeColor || "#F37254" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", (res: any) => onError?.(res));
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-brand text-white py-3 rounded-md"
    >
      Pay ₹ {amount.toLocaleString()}
    </button>
  );
}
