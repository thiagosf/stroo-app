import { StructureEntity } from '../pages/[username]/[slug]'

export function formatItem(item: any): StructureEntity {
  return {
    code: item.code,
    name: item.name,
    avatar: item.user.avatar,
    username: item.user.name,
    type: item.type,
    content: item.content,
    date: item.created_at,
    link: getStructureLink(item),
  }
}

export function parseCodeFromSlug(slug: string): string {
  return slug.split('-').pop()
}

export function getStructureLink(item: any): string {
  return `/@${item.user.username}/${item.slug}-${item.code}`
}
