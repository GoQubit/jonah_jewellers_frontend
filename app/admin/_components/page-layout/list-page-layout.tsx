import React from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { TooltipContent, TooltipTrigger, Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/utils/cn'

type Props = {
    title: string | React.ReactNode,
    titleClassName?: string,
    description?: string | React.ReactNode,
    descriptionClassName?: string,
    tooltip?: string | React.ReactNode,
    children?: React.ReactNode
}

const ListPageLayout = ({
    title,
    titleClassName,
    description,
    descriptionClassName,
    tooltip,
    children
}: Props) => {
    return (
        <div className="p-5 space-y-8">
            <div className="space-y-2">
                <div className="flex flex-nowrap items-center justify-start gap-3">
                    <h1 className={cn("text-2xl font-medium font-besley text-gray-900", titleClassName)}>{title}</h1>
                    {tooltip && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <IoMdInformationCircleOutline className="w-5 h-5" />
                            </TooltipTrigger>
                            <TooltipContent>
                                {tooltip}
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
                {description && (
                    <p className={cn("text-gray-500 font-nunito", descriptionClassName)}>
                        {description}
                    </p>
                )}
            </div>
            {children}
        </div>
    )
}

export default ListPageLayout