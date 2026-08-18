import { cn } from '@/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './buttons/Button'

const EmptyCart = () => {
  return (
    <section
      className={`mx-auto flex w-full max-w-2xl flex-col items-center text-center gap-6 py-16`}
      aria-labelledby="empty-cart-title"
    >
      <Image
        src="/images/empty_cart.png"
        alt="Illustration of an empty shopping bag"
        width={220}
        height={220}
        priority
      />

      <div className="space-y-2">
        <h2 id="empty-cart-title" className="text-balance text-3xl font-medium tracking-tight md:text-3xl">
          Ohh... Your Cart Is Empty
        </h2>
        <p className="text-pretty text-muted-foreground md:text-lg">
          Looks like you haven’t made your choice yet!
        </p>
      </div>

      {
        <Link href={'/shop/jewellery'} className="mt-2" >
          <Button
            variant='brand-solid'
            size="lg" className=" !py-4 px-6 !w-[200px] text-base">
            Shop Now
          </Button>
        </Link>
      }
    </section>
  )
}

export default EmptyCart