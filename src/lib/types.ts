export type ToolId = "understand" | "generate" | "edit";
export type PreviewState = "idle" | "invalid" | "ready_for_integration";
export type FutureRequestState = "processing" | "success" | "error";
export type CapabilityState = "unverified" | "available" | "unsupported" | "unreachable";

export type Tool = {
  id: ToolId;
  name: string;
  category: string;
  task: string;
  description: string;
  input: string;
  output: string;
  href: string;
  mark: string;
};
