import { StructureEntity } from '../pages/[username]/[slug]'

export function formatItem(item: any): StructureEntity {
  return {
    code: item.code,
    name: item.name,
    avatar: item.user.avatar,
    author: item.user.name,
    type: item.type,
    structure: item.content,
    date: item.created_at,
    link: `/@${item.user.username}/${item.slug}-${item.code}`,
  }
}
