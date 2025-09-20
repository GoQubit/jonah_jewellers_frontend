// components/SearchInput.tsx
import React from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;         // Wrapper class
  inputClassName?: string;    // Input field class
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onFocus,
  onBlur,
  className = "",
  inputClassName = "",
}) => {
  return (
    <div className={`flex-1 max-w-2xl relative ${className}`}>
      <div className="relative">
        <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-600 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`pl-10 pr-4 py-3  w-full border-2 border-grayLight hover:border-brand rounded-full outline-none transition-all duration-300 ease-in-out ${inputClassName}`}
        />
      </div>
    </div>
  );
};

export default SearchInput;
