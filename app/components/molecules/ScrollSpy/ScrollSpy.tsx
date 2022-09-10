import React, { useRef } from 'react'

export interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  threshold?: number;
  onReachedBottom?: () => void;
}

export const ScrollSpy: React.FC<Props> = function ({
  threshold = 0,
  children,
  onReachedBottom,
  ...props
}) {
  const ref = useRef()

  function onScroll() {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current
      const refScroll = scrollTop + clientHeight + threshold
      if (refScroll >= scrollHeight) {
        if (onReachedBottom) onReachedBottom()
      }
    }
  }

  return (
    <div ref={ref} {...props} onScroll={onScroll}>
      {children}
    </div>
  )
}
