"use client"

import React from "react";

type CustomRadioProps = {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
};

const CustomRadio: React.FC<CustomRadioProps> = ({
  name,
  value,
  checked,
  label,
  onChange,
  onBlur,
  disabled = false,
  className = "",
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {/* Hidden real radio */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        onBlur={onBlur}
        disabled={disabled}
        className="sr-only"
      />

      {/* Custom circle */}
      <span
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors
          ${checked ? 'border-brand bg-brand' : 'border-gray-300 bg-white'}
        `}
      >
        {checked && (
          <span className="h-2.5 w-2.5 bg-white rounded-full"></span>
        )}
      </span>

      {/* Label */}
      <span className="text-gray-800">{label}</span>
    </label>
  );
};

export default CustomRadio;
