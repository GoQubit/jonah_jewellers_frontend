import React from 'react'

import { Card } from '@/components/ui/Card'
import { cn } from '@/utils/cn'

export type StatsCardProp = {
    key: string,
    title: string,
    value: string | React.ReactNode,
    icon: React.ElementType,
    textColor: string;
    bgColor: string;
    boxBgColor?: string;
}

const StatsCard = ({
    title,
    value,
    icon: Icon,
    textColor,
    bgColor,
    boxBgColor
}: StatsCardProp) => {
    return (
        <Card className={`w-full max-w-[400px] h-full p-2 md:p-6 border border-[#BFBFBF] flex md:flex-row flex-col items-center justify-center md:justify-between ${boxBgColor} `}>
            <div className="order-2 md:order-1 space-y-1">
                <p className={` text-xs md:text-sm font-nunito  whitespace-nowrap ${boxBgColor ? 'text-white' : 'text-[#898989]'} `}>{title}</p>
                <p className=" text-xl md:text-2xl font-bold font-nunito  whitespace-break-spaces">{value}</p>
            </div>
            <div className={cn("order-1 md:order-2 p-3 flex items-center justify-center rounded-full", bgColor)}>
                <Icon className={cn("h-5 w-5 md:h-8 md:w-8 lg:h-10 lg:w-10 bg-transparent", textColor)} />
            </div>
        </Card>
    )
}

export default StatsCard