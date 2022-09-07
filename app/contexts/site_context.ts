import React from 'react'

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
  isLeaving?: boolean;
  setAlert: (alert: Alert) => void;
  clean: () => void;
}

export const SiteContext = React.createContext<SiteContextProps>(null)
