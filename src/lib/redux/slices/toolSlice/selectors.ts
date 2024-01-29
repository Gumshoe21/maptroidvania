import type { ReduxState } from "@/lib/redux";

export const selectName = (state: ReduxState) => state.tool.name;
