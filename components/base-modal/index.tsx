import {
    Dialog,
    DialogOverlay,
    DialogContent,
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/useModal';

import { cn } from '@/utils/cn';

interface BaseModalProps {
    children: React.ReactNode
    overlayClose?: boolean
    defaultOpen?: boolean
    heading?: React.ReactNode
    contentClassName?: string
}

const BaseModal = ({ children, overlayClose=true, defaultOpen=false, heading=null, contentClassName = "" }: BaseModalProps) => {
    const { isOpen, setClose } = useModal()
    return (
        <Dialog
            open={isOpen || defaultOpen}
            onOpenChange={overlayClose ? setClose : ()=>{}}
        >
            <DialogOverlay className={"fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"}>
                <DialogContent className={cn("h-screen md:h-fit p-0 border-none min-w-fit bg-transparent", contentClassName)}>
                    {heading}
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}

export default BaseModal;