"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import DownArrow from "./DownArrow";

interface DropdownProps {
  options: any[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  valueField?: string;
  labelField?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
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
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🧩 Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🧩 Recalculate menu position when opened
  useEffect(() => {
    if (open && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  const selectedLabel =
    options.find((opt) => opt[valueField] === value)?.[labelField] || placeholder;

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full gap-2 items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm bg-white
          hover:border-gray-400 ${triggerClassName}`}
      >
        <span>{selectedLabel}</span>
        <DownArrow isOpen={open} />
      </button>

      {/* Dropdown Menu (rendered in portal) */}
      {open &&
        menuPos &&
        createPortal(
          <ul
            className={`absolute z-[9999] rounded-md border bg-white shadow-lg max-h-60 overflow-y-auto scroller
              ${menuClassName}`}
            style={{
              top: menuPos.top,
              left: menuPos.left,
              width: menuPos.width,
              position: "absolute",
            }}
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
          </ul>,
          document.body // 👈 renders outside any scroll container
        )}
    </div>
  );
};

export default GenericDropdown;
