import React from 'react'

export interface Props {
  title: string;
  children?: React.ReactNode;
}

export const StructureActionDialog: React.FC<Props> = function ({ title, children }) {
  return (
    <div className="absolute top-0 right-10 bg-black bg-opacity-60 w-80 p-4 rounded-lg animate-scale-grow">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <h2 className="text-lg font-bold text-green-500">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
