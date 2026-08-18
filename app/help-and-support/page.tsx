import { Card, CardContent } from "@/components/ui/Card"
import { ArrowLeft, Phone, Mail, Menu } from "lucide-react"

export default function HelpSupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Support Cards */}
      <main className="wrapper mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Call Us Card */}
          <Card>
            <CardContent className="p-3">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">Call Us</h2>
                  <p className="text-muted-foreground mb-3">Mon - Sat (10-7pm)</p>
                  <a
                    href="tel:+919391008801"
                    className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    +91 766 886 4212
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Support Card */}
          <Card>
            <CardContent className="p-3">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">Email Support</h2>
                  <p className="text-muted-foreground mb-3">24/7 Email Support</p>
                  <a
                    href="mailto:support@jonah.com"
                    className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    support@jonahjewels.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
