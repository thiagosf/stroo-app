import React from 'react'

export type StructureClickFrom =
  | 'item'
  | 'title'

export interface PathTopPosition {
  path: string,
  top: number;
}

export interface StructureContextProps {
  currentPath: string[];
  clickFrom: StructureClickFrom;
  pathsTopPositions: PathTopPosition[];
  dispatch: (key: string, value: any) => void;
}

export const StructureContext = React.createContext<StructureContextProps>({
  currentPath: [],
  clickFrom: null,
  pathsTopPositions: [],
  dispatch: (key: string, value: any) => {/* noop */},
})
