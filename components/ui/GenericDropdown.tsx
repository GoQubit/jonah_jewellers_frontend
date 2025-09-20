"use client";
import React, { useState, useRef, useEffect } from "react";
import { BiArrowToBottom, BiDownArrow } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import DownArrow from "./DownArrow";

interface DropdownProps {
  options: any[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  valueField?: string; // key for option value, default is 'value'
  labelField?: string; // key for option label, default is 'label'
  className?: string; // wrapper styling
  triggerClassName?: string; // trigger styling
  menuClassName?: string; // dropdown styling
  itemClassName?: string; // item styling
}

const GenericDropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select...",
  value,
  onChange,
  valueField = "value",
  labelField = "label",
  className = "",
  triggerClassName = "",
  menuClassName = "",
  itemClassName = "",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt[valueField] === value)?.[labelField] || placeholder;

  return (
    <div ref={dropdownRef} className={`relative inline-block min-w-[100px] ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full gap-2 items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm bg-white
          hover:border-gray-400
          ${triggerClassName}`}
      >
        <span>{selectedLabel}</span>
        <DownArrow isOpen={open} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul
          className={`absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-y-auto scroller
            ${menuClassName}`}
        >
          {options.map((opt) => (
            <li
              key={opt[valueField]}
              onClick={() => {
                if (!opt.disabled) {
                  onChange?.(opt[valueField]);
                  setOpen(false);
                }
              }}
              className={`px-3 py-2 cursor-pointer text-sm 
                ${opt.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
                ${itemClassName}`}
            >
              {opt[labelField]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenericDropdown;
