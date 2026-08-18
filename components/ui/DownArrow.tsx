import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const DownArrow = ({ isOpen, className }: { isOpen: boolean, className?: string }) => {
  return (
    <IoIosArrowDown className={` text-gray-500 transition-all duration-300 ${isOpen ? 'rotate-180' : ''} ${className} `} />
  )
}

export default DownArrow