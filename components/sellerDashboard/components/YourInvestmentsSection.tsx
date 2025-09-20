import { Card, CardContent } from "@/components/ui/Card"


export function YourInvestmentsTab() {
  const investments = [
    { id: 1, title: "Gold Investment #1", date: "Aug 1, 2025", amount: "₹10,000" },
    { id: 2, title: "Gold Investment #2", date: "Aug 1, 2025", amount: "₹10,000" },
    { id: 3, title: "Gold Investment #3", date: "Aug 1, 2025", amount: "₹10,000" },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-amber-500 rounded-sm"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{investment.title}</h3>
                  <p className="text-sm text-gray-500">{investment.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-amber-600">{investment.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
