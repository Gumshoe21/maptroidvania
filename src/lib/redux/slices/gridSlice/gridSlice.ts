import { createSlice } from "@reduxjs/toolkit";

const initialState: GridSliceState = {
	cells: [],
};

export const gridSlice = createSlice({
	name: "grid",
	initialState,
	reducers: {
		addCell(state, action) {
			const { id } = action.payload;

			const existingCell = state.cells.filter(cell => cell.id === id).length === 0;
			if (existingCell) {
				state.cells.push(action.payload);
			}
		},
		removeCell(state, action) {
			const { id } = action.payload;

			const existingCell = state.cells.filter(cell => cell.id !== id);
			state.cells = state.cells.filter(cell => cell.id !== id);
		},
	},
});

export interface Cell {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface GridSliceState {
	cells: Cell[];
}
