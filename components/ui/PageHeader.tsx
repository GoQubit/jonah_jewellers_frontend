export function PageHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2 font-besley">{title}</h1>
      <p className="text-brand text-base md:text-lg font-nunito">{subtitle}</p>
    </div>
  )
}
