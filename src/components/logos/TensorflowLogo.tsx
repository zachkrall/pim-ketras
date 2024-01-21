import { ComponentProps } from 'react'

export const TensorflowLogo = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      width="47"
      height="53"
      viewBox="0 0 47 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M47 12.8L24.5 0V52.6L33.5 47.4V32.6L40.3 36.5L40.2 26.4L33.5 22.5V16.6L47 24.5V12.8Z"
        fill="currentColor"
      />
      <path
        d="M0 12.8L22.5 0V52.6L13.5 47.4V16.6L0 24.5V12.8Z"
        fill="currentColor"
      />
    </svg>
  )
}
