import type { Tool } from "./types";

export const tools: Tool[] = [
  { id: "understand", name: "图片理解", category: "图片", task: "分析图片", description: "上传图片并提出问题，为图像内容分析准备输入。", input: "图片 + 问题", output: "文本回答", href: "/tools/understand", mark: "识" },
  { id: "generate", name: "生图", category: "图片", task: "创作图片", description: "用文字描述想要的画面，整理生图提示词。", input: "文字提示词", output: "生成图片", href: "/tools/generate", mark: "生" },
  { id: "edit", name: "改图", category: "图片", task: "编辑图片", description: "选择原图并写下修改说明，准备图像编辑任务。", input: "原图 + 修改说明", output: "编辑后图片", href: "/tools/edit", mark: "改" },
];

export function getTool(id: Tool["id"]) {
  return tools.find((tool) => tool.id === id)!;
}
