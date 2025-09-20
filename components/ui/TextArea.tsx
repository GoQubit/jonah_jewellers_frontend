"use client"

interface TextAreaProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  rows?: number
  maxLength?: number
  showCharCount?: boolean
}

export function TextArea({
  label,
  placeholder = 'write here...',
  value,
  onChange,
  required = false,
  rows = 4,
  maxLength,
  showCharCount = false,
}: TextAreaProps) {
  return (
    <div className="space-y-1">
      <label className="text-start block text-sm text-[#777777]">
        {label}
        {required && "*"}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className="w-full px-3 py-2 border border-[#777777] rounded-md outline-none focus:border-logo placeholder-[#CACACA] resize-none"
      />
      {showCharCount && maxLength && (
        <div className="text-xs text-[#777777] text-right">
          {value.length}/{maxLength} characters • Minimum 50 words recommended
        </div>
      )}
    </div>
  )
}
