const scrollUtils = {
  getElementTop(element: string): number {
    const item = document.querySelector(element)
    const bodyRect = document.body.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const offset   = itemRect.top - bodyRect.top
    return offset
  },
  to(top: number): void {
    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  },
}

export default scrollUtils
