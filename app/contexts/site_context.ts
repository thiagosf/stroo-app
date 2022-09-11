import React from 'react'
import { StructureEntity } from '../pages/[username]/[slug]';

export interface Alert {
  title: string;
  icon?: string;
  description?: string;
  delay?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface SiteContextProps {
  alert?: Alert;
  structure?: StructureEntity;
  isLeaving?: boolean;
  setAlert: (alert: Alert) => void;
  cleanAlert: () => void;
  setStructure: (structure: StructureEntity) => void;
}

export const SiteContext = React.createContext<SiteContextProps>(null)
