import { StructureEntity } from '../pages/[username]/[slug]'

export function formatItem(item: any): StructureEntity {
  return {
    code: item.code,
    name: item.name,
    type: item.type,
    content: item.content,
    date: item.created_at,
    link: getStructureLink(item),
    user: {
      name: item.user.name,
      avatar: item.user.avatar,
      username: item.user.username
    }
  }
}

export function parseCodeFromSlug(slug: string): string {
  return slug.split('-').pop()
}

export function getStructureLink(item: any): string {
  return `/@${item.user.username}/${item.slug}-${item.code}`
}
