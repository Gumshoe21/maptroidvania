import { toolSlice } from "./slices/toolSlice/toolsSlice";
/* Instruments */
import { counterSlice } from "./slices";

export const reducer = {
	counter: counterSlice.reducer,
	tool: toolSlice.reducer,
};
