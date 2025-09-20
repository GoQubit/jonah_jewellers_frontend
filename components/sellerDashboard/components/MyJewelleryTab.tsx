import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"


export function MyJewelleryTab() {
  const jewelleryItems = [
    {
      id: 1,
      title: "Dazzling Grace Drop Earrings",
      goldUsed: "0.1 Gram Gold Used",
      sellingPrice: "₹ 8,500",
      basicGoldPrice: "₹4,250",
      makingCharges: "₹4,250",
      additionalCharges: "₹4,250",
      yourProfit: "₹4,250",
      totalEarned: "₹4,250",
      status: "Active",
    },
    {
      id: 2,
      title: "Dazzling Grace Drop Earrings",
      goldUsed: "0.1 Gram Gold Used",
      sellingPrice: "₹ 8,500",
      basicGoldPrice: "₹4,250",
      makingCharges: "₹4,250",
      additionalCharges: "₹4,250",
      yourProfit: "₹4,250",
      totalEarned: "₹4,250",
      status: "Active",
    },
    {
      id: 3,
      title: "Dazzling Grace Drop Earrings",
      goldUsed: "0.1 Gram Gold Used",
      sellingPrice: "₹ 8,500",
      basicGoldPrice: "₹4,250",
      makingCharges: "₹4,250",
      additionalCharges: "₹4,250",
      yourProfit: "₹4,250",
      totalEarned: "₹4,250",
      status: "Active",
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-medium font-nunito text-gray-900 mb-2">Jewelry Made From Your Gold</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jewelleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden py-0 gap-0">
            <div className="relative">
              <img src="/images/productsImgs/1.png" alt={item.title} className="w-full h-56 object-cover" />
              <Badge className="absolute top-2 right-2 bg-black text-white">{item.status}</Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{item.goldUsed}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Selling Price</span>
                  <span className="font-medium">{item.sellingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Basic Gold Price:</span>
                  <span className="text-green-600 font-medium">{item.basicGoldPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Making Charges:</span>
                  <span className="text-green-600 font-medium">{item.makingCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Additional Charges</span>
                  <span className="text-green-600 font-medium">{item.additionalCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Profit:</span>
                  <span className="text-green-600 font-medium">{item.yourProfit}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium text-gray-900">Total Earned</span>
                  <span className="text-green-600 font-bold">{item.totalEarned}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
