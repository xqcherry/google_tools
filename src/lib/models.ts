import type { ToolId } from "./types";

export const modelCandidates = [
  { id: "gemini-3.1-pro-high", label: "Gemini 3.1 Pro High" },
  { id: "gemini-3.1-flash-image", label: "Gemini 3.1 Flash Image" },
  { id: "gemini-3-flash-agent", label: "Gemini 3 Flash Agent" },
] as const;

export const preferredModel: Record<ToolId, string> = {
  understand: "gemini-3.1-pro-high",
  generate: "gemini-3.1-flash-image",
  edit: "gemini-3.1-flash-image",
};
