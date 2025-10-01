import React from 'react'
import Header from './_components/header'
import SideBar from './_components/sidebar'

type Props = {
    children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col">
            <Header />
            <div className='flex flex-row'>
                <SideBar />
                <div className='grow'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout