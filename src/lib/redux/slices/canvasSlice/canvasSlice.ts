import { createSlice } from "@reduxjs/toolkit";

const initialState: CanvasSliceState = {
	dimensions: {
		width: 1024,
		height: 768,
	},
	scale: {
		x: 1,
		y: 1,
	},
};

export const canvasSlice = createSlice({
	name: "canvas",
	initialState,
	reducers: {},
});

export interface CanvasSliceState {
	dimensions: {
		width: number;
		height: number;
	};
	scale: {
		x: number;
		y: number;
	};
}
