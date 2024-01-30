import type { ReduxState } from "@/lib/redux";

export const selectToolName = (state: ReduxState) => state.tool.name;
