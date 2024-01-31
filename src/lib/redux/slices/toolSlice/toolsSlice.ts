import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ToolSliceState = {
	name: "edit",
};

export const toolSlice = createSlice({
	name: "tool",
	initialState,
	reducers: {
		setEdit: state => {
			state.name = "edit";
		},
		setEraser: state => {
			state.name = "eraser";
		},
	},
});

// Types
export interface ToolSliceState {
	name: "edit" | "eraser";
}
