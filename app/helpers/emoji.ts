export type RandomType = 'happy' | 'unhappy'

export const list = {
  invalid: '⚠️',
  party: '🥳',
  sunglasses: '😎',
  tada: '🎉',
  anxious: '😰',
  fear: '😱',
}

export const happy = [
  list.party,
  list.sunglasses,
  list.tada,
]

export const unhappy = [
  list.anxious,
  list.fear,
]

const randomLists = { happy, unhappy }

export function getEmoji(name: RandomType): string {
  return list[name]
}

export function randomEmoji(name: RandomType): string {
  const list = randomLists[name]
  return list[Math.floor(Math.random() * list.length)]
}
