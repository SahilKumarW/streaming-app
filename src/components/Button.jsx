import React from 'react'

const Button = ({ name, onClick, className }) => {
  return (
    <button 
    className={`w-[170px] h-[40px] rounded-lg  text-white text-[12px] font-semibold leading-[18px] bg-custom-gradient ${className}`} 
    onClick={onClick}
  >
    {name}
  </button>
  )
}

export default Button