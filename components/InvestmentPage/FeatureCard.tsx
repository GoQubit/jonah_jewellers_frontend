
interface FeatureCardProps {
  icon: any
  title: string
  subtitle: string
  description: string
  bgColor: string
  iconColor: string
}

export function FeatureCard({ icon: Icon, title, subtitle, description, bgColor, iconColor }: FeatureCardProps) {
  return (
    <div className="group transition-all duration-300 border-0 bg-[#F4F4F4] rounded-md ">
      <div className="p-8 text-center">
        <div
          className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>

        <h3 className=" font-nunito text-2xl font-semibold text-gray-800 ">{title}</h3>

        <p className="text-[#878787] text-lg mb-3">{subtitle}</p>

        <p className="text-[#878787] text-lg leading-relaxed font-nunito ">{description}</p>
      </div>
    </div>
  )
}
