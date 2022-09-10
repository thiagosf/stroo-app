import { UserEntity } from '../contexts/user_context'

export function getUserProfileLink(user: UserEntity): string {
  return `/@${user.username}`
}

export function unauthenticatedUser() {
  return {
    name: 'You',
    username: 'you',
    avatar: '',
  }
}
