import { DesignerComponent } from "@/interfaces/designer/designerComponent";

export const componentsArrayInitialState: Array<DesignerComponent> = [];

export type ActionArray =
    | {
          type: "SET_COMPONENTS_ARRAY";
          payload: Array<DesignerComponent>;
      }
    | {
          type: "REPLACE_ARRAY_COMPONENT";
          index: number;
          functionToRun: () => void;
          component: DesignerComponent;
      };

export const componentsArrayReducer = (
    state: Array<DesignerComponent>,
    action: ActionArray,
): Array<DesignerComponent> => {
    switch (action.type) {
        case "SET_COMPONENTS_ARRAY":
            return action.payload;
        case "REPLACE_ARRAY_COMPONENT":
            action.functionToRun();
            return updateArray<DesignerComponent>(
                state,
                action.index,
                action.component,
            );
        default:
            return state;
    }
};

function updateArray<T>(bigArray: T[], index: number, newElement: T): T[] {
    return bigArray.map((element, eIndex) =>
        index === eIndex ? newElement : element,
    );
}

export function setComponentsArray(
    dispatch: React.Dispatch<ActionArray>,
    newArray: Array<DesignerComponent>,
) {
    dispatch({ type: "SET_COMPONENTS_ARRAY", payload: newArray });
}

export function replaceComponentInArray(
    dispatch: React.Dispatch<ActionArray>,
    index: number,
    functionToRun: () => void,
    component: DesignerComponent,
) {
    dispatch({
        type: "REPLACE_ARRAY_COMPONENT",
        index: index,
        component: component,
        functionToRun: functionToRun,
    });
}
