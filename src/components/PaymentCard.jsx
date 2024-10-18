import React from 'react'

const PaymentCard = ({title, description, price}) => {
  return (
    <div className='w-[413px] h-[345px] bg-[#1A1A1A] border border-[#262626] rounded-[10px]'> 
    <p className='text-white font-medium text-[20px] leading-[30px] px-[40px] pt-[40px]'>{title}</p>
    <p className='text-[#999999] font-normal text-[16px] leading-[24px] px-[40px] pt-[12px]'>{description}</p>
    <p className='text-white font-semibold text-[30px] leading-[22px] px-[40px] mt-[40px]'>{price}<span className='text-[#999999] font-semibold text-[16px] leading-[12px]'>/month</span></p>
    <div className='flex mt-[40px] pl-[40px] gap-3'>
        <button className=' w-[160px] h-[49px] font-semibold text-[14px] leading-[21px] bg-black rounded-md'>Start Free Trail</button>
        <button className=' w-[160px] h-[49px] font-semibold text-[14px] leading-[21px] bg-custom-gradient rounded-md'>Choose a Plan</button>
    </div>
    </div>
  )
}

export default PaymentCard