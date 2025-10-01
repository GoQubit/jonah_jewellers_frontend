import { Button } from '@/components/ui/buttons/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'

type Props = {}

const Header = (props: Props) => {
    return (
        <header className='sticky top-0 z-50 h-16 w-full px-8 py-3 bg-white shadow flex items-center justify-between gap-5 border-b'>

            {/* Logo */}
            <Link href={"/admin"} className='flex items-center gap-3' >
                <Image
                    src={"/images/logo1.png"}
                    alt='jonah-logo'
                    height={50}
                    width={40}
                />
                <span className="font-semibold text-lg">Admin Dashboard</span>
            </Link>

            <div className='flex items-center justify-end gap-3'>

                {/* Search */}
                <div className="w-[305px] h-9 rounded-full bg-grayLight px-5">
                    <input
                        type="text"
                        placeholder='Search data, users and reports'
                        className='w-[250px] h-full bg-transparent outline-none focus:outline-none'
                    />
                </div>

                {/* Notification */}
                <Button
                    variant={"ghost"}
                    className='hover:bg-transparent'
                >
                    <IoMdNotificationsOutline className="w-6 h-6" />
                </Button>

                {/* Profile */}
                <div className="rounded-full overflow-hidden">
                    <Image
                        src="/images/dummy-avatar.jpeg"
                        alt="profile-avatar"
                        width={40}
                        height={40}
                        className='bg-cover'
                    />
                </div>
            </div>

        </header>
    )
}

export default Header