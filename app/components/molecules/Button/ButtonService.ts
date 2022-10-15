export type ButtonColor =
  | 'white'
  | 'white-opacity'
  | 'black'
  | 'light-blue'

export type ButtonSize =
  | 'small'
  | 'large'

export class ButtonService {
  color?: ButtonColor;

  constructor(color?: ButtonColor) {
    this.color = color
  }

  classList() {
    switch (this.color) {
      case 'white':
        return 'bg-white text-gray-500'

      case 'white-opacity':
        return 'bg-white bg-opacity-5'

      case 'black':
        return 'bg-black'

      case 'light-blue':
        return 'bg-blue-500'

      default:
        return 'bg-purple-500'
    }
  }
}
