import React from 'react'
import PhoneLoginForm from './PhoneLoginForm'

const LoginPage = ({ nextStep }: { nextStep: Function }) => {

  return (
    <div className="flex w-full items-start gap-10 md:gap-20 ">
      <section className="w-full  md:w-[40%] ">
        <div className="space-y-3">
          <h1 className="text-pretty font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Welcome to Jonah Jewels!
          </h1>
          <p className="text-pretty font-nunito font-normal text-base text-brand">Login/Signup to get exclusive Jonah privileges</p>
        </div>

        <div className="mt-8">
          <PhoneLoginForm
            nextStep={nextStep}
          />
        </div>
      </section>


      <aside className=" w-full md:w-[60%] hidden md:flex ">
        <img
          src="/images/bannerImgs/login_page_img.webp"
          alt="login banner img"
          className="h-auto w-full rounded-lg bg-muted object-cover md:h-[520px]"
        />
      </aside>
    </div>
  )
}

export default LoginPage