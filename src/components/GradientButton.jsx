import React from 'react'

const Button = ({ name, onClick, className }) => {
  return (
    <button 
    className={`w-[235px] h-[40px] rounded-lg  text-white text-[12px] font-semibold  border border-[#32AAA3] leading-[18px] bg-overlay ${className}`} 
    onClick={onClick}
  >
    {name}
  </button>
  )
}

export default Button