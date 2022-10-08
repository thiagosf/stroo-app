export type ButtonColor =
  | 'white'
  | 'white-opacity'

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

      default:
        return 'bg-purple-500'
    }
  }
}
