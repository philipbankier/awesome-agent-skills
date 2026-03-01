export interface Skill {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  platforms: string[];
  source: string;
  section?: string;
  githubOwner: string | null;
  githubRepo: string | null;
  stars: number | null;
  lastUpdated: string;
  repoUrl?: string;
  version?: string | null;
}

export interface CategoryInfo {
  slug: string;
  label: string;
  description: string;
  icon: string;
  count: number;
}

export const CATEGORY_META: Record<
  string,
  { label: string; description: string; icon: string }
> = {
  "mcp-server": {
    label: "MCP Servers",
    description:
      "Model Context Protocol servers that connect AI agents to data sources and tools",
    icon: "🔌",
  },
  "agent-skill": {
    label: "Agent Skills",
    description:
      "SKILL.md-based skills for Claude Code, Codex CLI, Gemini CLI, and more",
    icon: "⚡",
  },
  "cursor-rule": {
    label: "Cursor Rules",
    description: "Rules that configure AI behavior in the Cursor editor",
    icon: "📐",
  },
  "openclaw-skill": {
    label: "OpenClaw Skills",
    description: "Skills for the OpenClaw multi-agent system",
    icon: "🦞",
  },
  "copilot-extension": {
    label: "Copilot Extensions",
    description: "Extensions for GitHub Copilot agents and assistants",
    icon: "🤖",
  },
  "gemini-extension": {
    label: "Gemini CLI Extensions",
    description: "Extensions and plugins for Google Gemini CLI",
    icon: "💎",
  },
};

export const PLATFORM_META: Record<string, { label: string; color: string }> = {
  "claude-code": { label: "Claude Code", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" },
  "codex-cli": { label: "Codex CLI", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
  cursor: { label: "Cursor", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  windsurf: { label: "Windsurf", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300" },
  "gemini-cli": { label: "Gemini CLI", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
  copilot: { label: "Copilot", color: "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300" },
  openclaw: { label: "OpenClaw", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
  antigravity: { label: "Antigravity", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" },
};
