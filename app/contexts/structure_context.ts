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
  expandAll: boolean;
  dispatch: (key: string, value: any) => void;
}

export const StructureContext = React.createContext<StructureContextProps>(null)
