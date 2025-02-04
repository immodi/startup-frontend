export const animationInitialState: AnimatingState = {
    index: 0,
    payload: false,
};

export type AnimatingState = {
    index: number;
    payload: boolean;
};

export type AnimatingAction =
    | {
          type: "ANIMATE";
          action: AnimatingState;
      }
    | {
          type: "STOP_ANIMATING";
          action: AnimatingState;
      };

export const animatingReducer = (
    state: AnimatingState,
    action: AnimatingAction,
): AnimatingState => {
    switch (action.type) {
        case "ANIMATE":
            if (action.action.payload) {
                return action.action;
            } else {
                return state;
            }
        case "STOP_ANIMATING":
            if (!action.action.payload) {
                return action.action;
            } else {
                return state;
            }
        default:
            return state;
    }
};

export function animate(
    dispatch: React.Dispatch<AnimatingAction>,
    index: number,
): void {
    dispatch({
        type: "ANIMATE",
        action: { index, payload: true },
    });
}

export function stopAnimating(
    dispatch: React.Dispatch<AnimatingAction>,
    index: number,
): void {
    dispatch({
        type: "STOP_ANIMATING",
        action: { index, payload: false },
    });
}
