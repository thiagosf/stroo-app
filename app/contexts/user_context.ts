import React from 'react'

export interface UserEntity {
  name: string;
  username: string;
  avatar: string;
}

export interface UserLoginEntity extends UserEntity {
  token: string;
}

export interface UserContextProps {
  currentUser?: UserLoginEntity;
  setCurrentUser: (currentUser: UserLoginEntity) => void;
  onLogout?: () => void;
  openModal?: () => void;
  closeModal?: () => void;
}

export const UserContext = React.createContext<UserContextProps>(null)
