import React from 'react'

export interface Alert {
  title: string;
  icon?: string;
  description?: string;
  isConfirmation?: boolean;
  delay?: number;
}

export interface SiteContextProps {
  alert?: Alert;
  isLeaving?: boolean;
  setAlert: (alert: Alert) => void;
  clean: () => void;
}

export const SiteContext = React.createContext<SiteContextProps>(null)
