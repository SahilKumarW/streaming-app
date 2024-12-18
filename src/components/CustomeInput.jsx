import React from 'react';

const CustomInput = ({
  placeholder,
  icon,
  onIconClick,
  label,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className={`relative mb-[20px] ${className}`}>
      {label && (
        <label className="block text-white text-sm mb-1" htmlFor={props.id || placeholder}>
          {label}
        </label>
      )}
      <input
        id={props.id || placeholder}
        type={type}
        className="w-[557px] h-[56px] border border-[#FFFFFF] rounded-[14px] bg-transparent text-white placeholder-[#FFFFFF] pt-[19px] pb-[19px] pl-[50px] pr-[50px] focus:outline-none"
        placeholder={placeholder}
        {...props}
      />
      {icon && (
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          onClick={onIconClick}
          aria-label={placeholder}
        >
          {icon}
        </button>
      )}
    </div>
  );
};

export default CustomInput;
