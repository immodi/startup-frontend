import { DesignerComponent } from "@/interfaces/designer/designerComponent";

export const componentsPagedArrayInitialState: Array<Array<DesignerComponent>> =
    [];

export type Action =
    | {
          type: "SET_COMPONENTS_PAGED_ARRAY";
          payload: Array<Array<DesignerComponent>>;
      }
    | {
          type: "REPLACE_SUB_ARRAY_COMPONENT";
          arrayIndex: number;
          subArrayIndex: number;
          functionToRun: () => void;
          component: DesignerComponent;
      };

export const componentsReducer = (
    state: Array<Array<DesignerComponent>>,
    action: Action,
): Array<Array<DesignerComponent>> => {
    switch (action.type) {
        case "SET_COMPONENTS_PAGED_ARRAY":
            return action.payload;
        case "REPLACE_SUB_ARRAY_COMPONENT":
            action.functionToRun();
            return updateSubarray<DesignerComponent>(
                state,
                action.arrayIndex,
                action.subArrayIndex,
                action.component,
            );
        default:
            return state;
    }
};

function updateSubarray<T>(
    bigArray: T[][],
    bigIndex: number,
    subIndex: number,
    newElement: T,
): T[][] {
    return bigArray.map((subarray, index) =>
        index === bigIndex
            ? subarray.map((element, i) =>
                  i === subIndex ? newElement : element,
              )
            : subarray,
    );
}

export function setComponentsArray(
    dispatch: React.Dispatch<Action>,
    newArray: Array<Array<DesignerComponent>>,
) {
    dispatch({ type: "SET_COMPONENTS_PAGED_ARRAY", payload: newArray });
}

export function replaceComponentInSubArray(
    dispatch: React.Dispatch<Action>,
    currentArrayIndex: number,
    subArrayIndex: number,
    functionToRun: () => void,
    component: DesignerComponent,
) {
    dispatch({
        type: "REPLACE_SUB_ARRAY_COMPONENT",
        arrayIndex: currentArrayIndex,
        subArrayIndex: subArrayIndex,
        component: component,
        functionToRun: functionToRun,
    });
}
