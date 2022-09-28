interface Props {
  children: React.ReactNode;
}

export const FlexFixed: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0">
      {children}
    </div>
  )
}
