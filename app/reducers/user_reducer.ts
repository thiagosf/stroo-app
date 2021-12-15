import { PathTopPosition } from '../contexts/structure_context'

export interface UserState {
  currentPath?: string[];
  clickFrom?: string;
  pathsTopPositions?: PathTopPosition[];
}

export interface UserAction {
  type: string;
  data: any;
}

export const UserReducer = (
  state: UserState,
  action: UserAction,
): UserState => {
  const nextState = { ...state }
  const actions = {
    SET_CURRENT_PATH: () => {
      nextState.currentPath = action.data
    },
    SET_CLICK_FROM: () => {
      nextState.clickFrom = action.data
    },
    SET_PATHS_TOP_POSITIONS: () => {
      nextState.pathsTopPositions = action.data
    },
  }
  if (actions[action.type]) {
    actions[action.type]()
  }
  return nextState;
};
