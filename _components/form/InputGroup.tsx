import { ChangeEvent, FC, useEffect, useState } from 'react'

interface InputGroupProps {
  name?: string
  onChange?: (e: ChangeEvent) => void
  defaultValue?: string
  className?: string
  placeholder?: any
  size?: 'sm' | 'md' | 'lg'
  height?: number
  // theme?: 'primary' | 'danger' | 'warning' | 'info' | 'custom-blue'
  rounded?: boolean
  icon?: any
  controlled?: boolean
}

export const InputGroup: FC<InputGroupProps> = ({
  name = '',
  onChange = () => '',
  defaultValue = '',
  className = '',
  placeholder = '',
  rounded = false,
  icon = 'search',
  controlled = false,
  height = 40,
}) => {
  const [val, setVal] = useState<string>('')

  useEffect(() => {
    setVal(defaultValue)
  }, [defaultValue])

  return (
    <div
      className={`input-group d-flex align-items-center bg-gray-100 border border-gray-300 h-${height}px position-relative radius-${rounded ? 50 : 5} ${className}`}>
      <div className={`d-flex flex-center w-${height}px h-${height}px radius-${rounded ? 50 : 5}`}>
        {icon}
      </div>
      {controlled ? (
        <input
          type='text'
          name={name}
          value={val}
          className='form-control h-100 border-0 bg-transparent fs-13px ps-0 mb-1px'
          placeholder={placeholder}
          onChange={(e: ChangeEvent) => {
            onChange(e)
          }}
        />
      ) : (
        <input
          type='text'
          name={name}
          defaultValue={val}
          // className={`border-0 bg-white lh-0 ${configClass?.form}`}
          className='form-control h-36px border-0 bg-transparent fs-13px ps-5px pt-8px'
          placeholder={placeholder}
          onChange={(e: ChangeEvent) => {
            onChange(e)
          }}
        />
      )}
    </div>
  )
}
