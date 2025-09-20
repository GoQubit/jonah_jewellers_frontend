const SectionHeading = ({ title, Subtitle, size = 'lg' }: { title: string, Subtitle: string, size?: string }) => {

  //size = lg , md, sm
  const propsImgSize = size === 'lg' ? 'w-[150px] h-[14px]' : size === 'md' ? 'w-[80px] h-[14px]' : 'w-[50px] h-[14px]';
  const lineSize = size === 'lg' ? 'max-w-full' : size === 'md' ? 'max-w-xs' : 'max-w-[200px]';


  return (
    <div className="w-full max-w-full mx-auto py-6 md:py-8">
      <div className="text-center">
        {/* Main heading */}
        <h2 className="text-2xl 500:text-3xl  md:text-[44px] !font-besley text-black mb-3 tracking-wide  font-medium ">{title}</h2>

        {/* Subtitle */}
        <p className="text-brand text-base md:text-xl mb-3 font-light font-nunito ">{Subtitle}</p>

        {/* Decorative divider section */}
        <div className="flex items-center justify-center mb-4">
          {/* Left line */}
          <div className={`flex-1 h-[2px] bg-[#F4B41A] ${lineSize} `}></div>

          {/* Decorative ornament */}
          <div className="mx-3">
            <img src="/images/propsImgs/heading_divide_prop.png"
              alt="props"
              className={` ${propsImgSize}`}
            />
          </div>
          {/* Right line */}
          <div className={`flex-1 h-[2px] bg-[#F4B41A] ${lineSize} `}></div>
        </div>
      </div>
    </div>
  )
}



export default SectionHeading;