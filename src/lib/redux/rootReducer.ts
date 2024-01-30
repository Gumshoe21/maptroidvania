import { toolSlice } from "./slices/";

import { counterSlice } from "./slices";
import { gridSlice } from "./slices";
import { canvasSlice } from "./slices/canvasSlice";

export const reducer = {
	counter: counterSlice.reducer,
	tool: toolSlice.reducer,
	canvas: canvasSlice.reducer,
	grid: gridSlice.reducer,
};
