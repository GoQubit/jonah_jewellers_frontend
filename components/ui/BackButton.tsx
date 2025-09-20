import { useRouter } from 'next/navigation';
import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

const BackButton = ({stepBack ,label = '', className }: {stepBack:any, label?: string, className?: string }) => {
  const router = useRouter();
  return (
    <button onClick={stepBack}
      className='flex items-center gap-2'
    >
      <MdOutlineKeyboardBackspace size={20} className={` ${className}`} />
      {label && <span className={` ${className}`}>{label}</span>}
    </button>
  )
}

export default BackButton