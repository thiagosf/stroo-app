export type RandomType = 'happy' | 'unhappy'

export const list = {
  party: '🥳',
  sunglasses: '😎',
  tada: '🎉',
  anxious: '😰',
  fear: '😱',
  warning: '🚨',
}

export const happy = [
  list.party,
  list.sunglasses,
  list.tada,
]

export const unhappy = [
  list.anxious,
  list.fear,
  list.warning,
]

const randomLists = { happy, unhappy }

export function getEmoji(name: keyof typeof list): string {
  return list[name]
}

export function randomEmoji(name: RandomType): string {
  const list = randomLists[name]
  return list[Math.floor(Math.random() * list.length)]
}
