/* Instruments */
import type { ReduxState } from "@/lib/redux";

export const selectGridCells = (state: ReduxState) => state.grid.cells;
