import { UserEntity } from '../contexts/user_context'

export function getUserProfileLink(user: UserEntity): string {
  return `/@${user.username}`
}
