import React from 'react'

export interface UserEntity {
  id: string,
  name: string;
  avatar: string;
  token: string;
}

export interface UserContextProps {
  currentUser?: UserEntity;
  onLogin?: () => void;
  openModal?: () => void;
  closeModal?: () => void;
}

export const UserContext = React.createContext<UserContextProps>({})
