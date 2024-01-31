/* Instruments */
import type { ReduxState } from "@/lib/redux";

export const selectCanvasDimensions = (state: ReduxState) => state.canvas.dimensions;
export const selectCanvasScale = (state: ReduxState) => state.canvas.scale;
