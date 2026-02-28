# Awesome Agent Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated directory of skills, tools, and plugins for AI coding agents — across every platform.

Unlike platform-specific lists, this directory covers **all** agent skill ecosystems in one place: Agent Skills (SKILL.md), MCP servers, Cursor rules, Windsurf rules, Gemini CLI extensions, Copilot extensions, OpenClaw skills, and more.

**[Website](https://awesomeagentskills.dev)** · **[Submit a Skill](#contributing)** · **[Sync Status](#data-sources--sync)**

---

## Contents

- [Agent Skills (SKILL.md)](#agent-skills-skillmd)
- [MCP Servers](#mcp-servers)
- [Cursor Rules](#cursor-rules)
- [Windsurf Rules](#windsurf-rules)
- [Gemini CLI Extensions](#gemini-cli-extensions)
- [GitHub Copilot Extensions](#github-copilot-extensions)
- [OpenClaw Skills](#openclaw-skills)
- [LangChain Tools](#langchain-tools)
- [CrewAI Tools](#crewai-tools)
- [n8n Nodes](#n8n-nodes)
- [Multi-Platform Collections](#multi-platform-collections)
- [Directories & Marketplaces](#directories--marketplaces)
- [CLIs & Package Managers](#clis--package-managers)
- [Specs & Standards](#specs--standards)
- [Data Sources & Sync](#data-sources--sync)
- [Contributing](#contributing)

---

## Agent Skills (SKILL.md)

The [Agent Skills spec](https://github.com/anthropics/skills) is the emerging cross-platform standard. Created by Anthropic, adopted by OpenAI (Codex CLI), Google (Gemini CLI), and others. Skills are defined via `SKILL.md` files with YAML frontmatter.

### Official & Reference

- [anthropics/skills](https://github.com/anthropics/skills) - Official Agent Skills spec + reference skills. ![GitHub stars](https://img.shields.io/github/stars/anthropics/skills)
- [OpenAI Codex CLI Skills](https://developers.openai.com/codex/skills/) - Official Codex skills page (same SKILL.md format).
- [agentskills.io](https://agentskills.io) - Community spec site covering cross-platform compatibility. ![GitHub stars](https://img.shields.io/github/stars/agentskills/agentskills)

### Collections

- [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Largest Claude skills list. ![GitHub stars](https://img.shields.io/github/stars/ComposioHQ/awesome-claude-skills)
- [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) - 900+ installable skills. Cross-platform. `npx antigravity-awesome-skills` to install. ![GitHub stars](https://img.shields.io/github/stars/sickn33/antigravity-awesome-skills)
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) - 380+ skills for Claude Code, Codex, Antigravity, Gemini CLI, Cursor. ![GitHub stars](https://img.shields.io/github/stars/VoltAgent/awesome-agent-skills)
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) - Claude Code workflow-focused skills. ![GitHub stars](https://img.shields.io/github/stars/travisvn/awesome-claude-skills)
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) - Skills + tools + tutorials for Claude, Codex, Antigravity, Copilot. ![GitHub stars](https://img.shields.io/github/stars/heilcheng/awesome-agent-skills)
- [skillmatic-ai/awesome-agent-skills](https://github.com/skillmatic-ai/awesome-agent-skills) - Architecture-focused skill resource. ![GitHub stars](https://img.shields.io/github/stars/skillmatic-ai/awesome-agent-skills)
- [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) - 135 agents, 35 skills, 42 commands, 120 plugins, 19 hooks. ![GitHub stars](https://img.shields.io/github/stars/rohitg00/awesome-claude-code-toolkit)

### Claude Code Ecosystem

- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - Comprehensive Claude Code ecosystem: skills, hooks, slash-commands, plugins. ![GitHub stars](https://img.shields.io/github/stars/hesreallyhim/awesome-claude-code)
- [jqueryscript/awesome-claude-code](https://github.com/jqueryscript/awesome-claude-code) - IDE integrations, frameworks, resources. ![GitHub stars](https://img.shields.io/github/stars/jqueryscript/awesome-claude-code)

---

## MCP Servers

The [Model Context Protocol](https://modelcontextprotocol.io) (MCP) is an open standard for connecting AI models to data sources and tools. 17,000+ servers across directories.

### Official

- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) - Official reference MCP server implementations. ![GitHub stars](https://img.shields.io/github/stars/modelcontextprotocol/servers)
- [Official MCP Registry](https://registry.modelcontextprotocol.io) - Authoritative registry with open API spec. ![GitHub stars](https://img.shields.io/github/stars/modelcontextprotocol/registry)

### Awesome Lists

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) - THE dominant MCP list. 1,000+ entries. ![GitHub stars](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers)
- [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) - Second largest, well-organized by category. ![GitHub stars](https://img.shields.io/github/stars/appcypher/awesome-mcp-servers)
- [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) - Original early MCP list. ![GitHub stars](https://img.shields.io/github/stars/wong2/awesome-mcp-servers)
- [rohitg00/awesome-devops-mcp-servers](https://github.com/rohitg00/awesome-devops-mcp-servers) - DevOps-focused MCP servers. ![GitHub stars](https://img.shields.io/github/stars/rohitg00/awesome-devops-mcp-servers)
- [punkpeye/awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients) - MCP clients (complementary). ![GitHub stars](https://img.shields.io/github/stars/punkpeye/awesome-mcp-clients)
- [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools) - MCP development tools, SDKs, testing. ![GitHub stars](https://img.shields.io/github/stars/punkpeye/awesome-mcp-devtools)
- [toolsdk-ai/toolsdk-mcp-registry](https://github.com/toolsdk-ai/toolsdk-mcp-registry) - Machine-readable JSON registry with OAuth2.1. ![GitHub stars](https://img.shields.io/github/stars/toolsdk-ai/toolsdk-mcp-registry)

### Meta

- [esc5221/awesome-awesome-mcp-servers](https://github.com/esc5221/awesome-awesome-mcp-servers) - Meta-list of all awesome-mcp-servers lists.
- [collabnix/awesome-mcp-lists](https://github.com/collabnix/awesome-mcp-lists) - Combined servers + clients + toolkits.

---

## Cursor Rules

Rules that configure AI behavior in [Cursor](https://cursor.com) editor. Two formats: legacy `.cursorrules` and new `.mdc` (Markdown Directives).

- [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) - THE dominant cursor rules collection. 500+ rules. ![GitHub stars](https://img.shields.io/github/stars/PatrickJS/awesome-cursorrules)
- [cursor.directory](https://cursor.directory) - Community site with 1,000+ rules. 250K+ monthly users. 63K+ members.
- [pontusab/cursor.directory](https://github.com/pontusab/cursor.directory) - Open source codebase powering cursor.directory. ![GitHub stars](https://img.shields.io/github/stars/pontusab/cursor.directory)
- [sanjeed5/awesome-cursor-rules-mdc](https://github.com/sanjeed5/awesome-cursor-rules-mdc) - New .mdc format rules (replaces deprecated .cursorrules). ![GitHub stars](https://img.shields.io/github/stars/sanjeed5/awesome-cursor-rules-mdc)

---

## Windsurf Rules

Rules for the [Windsurf](https://windsurf.com) AI editor (formerly Codeium). Uses `.windsurfrules` and `global_rules.md`.

- [Windsurf Official Directory](https://windsurf.com/editor/directory) - Official rules directory curated by Windsurf team.
- [ichoosetoaccept/awesome-windsurf](https://github.com/ichoosetoaccept/awesome-windsurf) - Resources, rules, memories for Windsurf. ![GitHub stars](https://img.shields.io/github/stars/ichoosetoaccept/awesome-windsurf)
- [SchneiderSam/awesome-windsurfrules](https://github.com/SchneiderSam/awesome-windsurfrules) - Windsurf global_rules and .windsurfrules files. ![GitHub stars](https://img.shields.io/github/stars/SchneiderSam/awesome-windsurfrules)

---

## Gemini CLI Extensions

Extensions and skills for [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). Supports Agent Skills (SKILL.md) + native extensions + MCP.

- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) - Official Gemini CLI repo. ![GitHub stars](https://img.shields.io/github/stars/google-gemini/gemini-cli)
- [Gemini CLI Extension Gallery](https://geminicli.com/extensions/) - Browse and discover extensions.
- [Piebald-AI/awesome-gemini-cli](https://github.com/Piebald-AI/awesome-gemini-cli) - Curated tools, extensions, resources. ![GitHub stars](https://img.shields.io/github/stars/Piebald-AI/awesome-gemini-cli)
- [gemini-cli-extensions](https://github.com/gemini-cli-extensions) - Community extensions GitHub org.
- [intellectronica/gemini-cli-skillz](https://github.com/intellectronica/gemini-cli-skillz) - Anthropic-style Agent Skills via skillz MCP server.

---

## GitHub Copilot Extensions

Extensions for [GitHub Copilot](https://github.com/features/copilot) — agents, instructions, hooks, skills, plugins.

- [github/awesome-copilot](https://github.com/github/awesome-copilot) - OFFICIAL GitHub repo. ![GitHub stars](https://img.shields.io/github/stars/github/awesome-copilot)
- [GitHub Marketplace (Copilot Apps)](https://github.com/marketplace?type=apps&copilot_app=true) - Official Copilot extension marketplace.
- [Copilot Extensions](https://github.com/features/copilot/extensions) - Extension capabilities overview.

---

## OpenClaw Skills

Skills for the [OpenClaw](https://openclaw.ai) multi-agent system. 5,700+ skills in the registry.

- [VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) - Main OpenClaw skills directory. ![GitHub stars](https://img.shields.io/github/stars/VoltAgent/awesome-openclaw-skills)
- [ClawHub Registry](https://docs.openclaw.ai/tools/skills) - Official OpenClaw skills marketplace with version management.
- [BankrBot/openclaw-skills](https://github.com/BankrBot/openclaw-skills) - Crypto, DeFi, Polymarket, automation skills. ![GitHub stars](https://img.shields.io/github/stars/BankrBot/openclaw-skills)
- [openclawskills.net](https://openclawskills.net) - Web directory for OpenClaw skills.

---

## LangChain Tools

Tools and integrations for the [LangChain](https://python.langchain.com/) framework. 1,000+ integrations.

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) - Core framework. ![GitHub stars](https://img.shields.io/github/stars/langchain-ai/langchain)
- [LangChain Integrations](https://python.langchain.com/docs/integrations/tools/) - Official integrations directory (1,000+).
- [kyrolabs/awesome-langchain](https://github.com/kyrolabs/awesome-langchain) - Awesome list for LangChain tools and projects. ![GitHub stars](https://img.shields.io/github/stars/kyrolabs/awesome-langchain)

---

## CrewAI Tools

Tools for the [CrewAI](https://crewai.com) agent framework. Now supports MCP integration.

- [crewAIInc/crewAI-tools](https://github.com/crewAIInc/crewAI-tools) - Official CrewAI tools. 30+ built-in. ![GitHub stars](https://img.shields.io/github/stars/crewAIInc/crewAI-tools)
- [crewAIInc/awesome-crewai](https://github.com/crewAIInc/awesome-crewai) - Official awesome list. ![GitHub stars](https://img.shields.io/github/stars/crewAIInc/awesome-crewai)
- [CrewAI Tools Docs](https://docs.crewai.com/en/concepts/tools) - Official tool documentation.

---

## n8n Nodes

Workflow automation nodes for [n8n](https://n8n.io). 400+ integrations with native AI agent capabilities.

- [n8n-io/n8n](https://github.com/n8n-io/n8n) - Core platform. ![GitHub stars](https://img.shields.io/github/stars/n8n-io/n8n)
- [n8n Community Nodes](https://n8n.io/integrations/) - Official integrations directory (400+ nodes, 600+ templates).

---

## Multi-Platform Collections

Resources covering multiple agent platforms and ecosystems.

- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) - LLM apps with AI Agents, RAG, MCP, Voice Agents. ![GitHub stars](https://img.shields.io/github/stars/Shubhamsaboo/awesome-llm-apps)
- [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) - THE original awesome-ai-agents list. ![GitHub stars](https://img.shields.io/github/stars/e2b-dev/awesome-ai-agents)
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) - AutoGPT core with Components system. ![GitHub stars](https://img.shields.io/github/stars/Significant-Gravitas/AutoGPT)
- [jim-schwoebel/awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) - 1,500+ agents catalogued. ![GitHub stars](https://img.shields.io/github/stars/jim-schwoebel/awesome_ai_agents)
- [kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents) - Open-source AI agent tools and products. ![GitHub stars](https://img.shields.io/github/stars/kyrolabs/awesome-agents)

---

## Directories & Marketplaces

Web-based platforms for discovering and installing agent skills and tools.

| Platform | Focus | Size | Open Source |
|----------|-------|------|-------------|
| [SkillsMP](https://skillsmp.com) | Agent Skills marketplace | 66,500+ | No |
| [MCP.so](https://mcp.so) | MCP server directory | 17,900+ | [Yes](https://github.com/chatmcp/mcpso) |
| [Glama](https://glama.ai/mcp/servers) | Hosted MCP servers | 17,800+ | No |
| [PulseMCP](https://www.pulsemcp.com/servers) | MCP directory (Steering Committee) | 8,600+ | No |
| [ClawHub](https://docs.openclaw.ai/tools/skills) | OpenClaw skills registry | 5,700+ | No |
| [Smithery](https://smithery.ai) | MCP marketplace + CLI | 4,000+ | [Partial](https://github.com/smithery-ai) |
| [cursor.directory](https://cursor.directory) | Cursor + Windsurf rules | 1,000+ | [Yes](https://github.com/pontusab/cursor.directory) |
| [Composio](https://composio.dev) | Multi-framework integrations | 1,000+ | [Yes](https://github.com/ComposioHQ/composio) |
| [MCPServers.org](https://mcpservers.org) | Curated MCP collection | Growing | No |
| [Gemini Extension Gallery](https://geminicli.com/extensions/) | Gemini CLI extensions | Growing | No |
| [GitHub Copilot Marketplace](https://github.com/marketplace?type=apps&copilot_app=true) | Copilot extensions | ~30 | No |
| [LobeHub MCP](https://lobehub.com/mcp) | LobeChat MCP marketplace | Growing | Partial |

---

## CLIs & Package Managers

Command-line tools for installing and managing agent skills.

- [agent-skills-cli](https://github.com/Karanjot786/agent-skills-cli) - Universal CLI. Access 40,000+ skills from SkillsMP. Syncs to Cursor, Claude Code, Copilot, Codex, Antigravity.
- [Smithery CLI](https://github.com/smithery-ai/cli) - Install, manage, and develop MCP servers and skills.
- `npx antigravity-awesome-skills` - One-command install for 900+ skills from [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills).

---

## Specs & Standards

The specifications and standards that define agent skill formats.

| Standard | Maintainer | Format | Platforms |
|----------|-----------|--------|-----------|
| [Agent Skills (SKILL.md)](https://github.com/anthropics/skills) | Anthropic | YAML frontmatter + Markdown | Claude Code, Codex CLI, Gemini CLI, Antigravity, Copilot |
| [MCP](https://modelcontextprotocol.io) | Agentic AI Foundation | JSON-RPC over stdio/SSE | Universal (all major AI tools) |
| [Cursor Rules](https://docs.cursor.com/context/rules) | Cursor | `.mdc` / `.cursorrules` | Cursor |
| [Windsurf Rules](https://windsurf.com/editor/directory) | Windsurf | `.windsurfrules` | Windsurf |
| [Gemini Extensions](https://google-gemini.github.io/gemini-cli/docs/extensions/) | Google | TypeScript modules | Gemini CLI |
| [Copilot Extensions](https://github.com/features/copilot/extensions) | GitHub | GitHub Apps API | GitHub Copilot |

---

## Data Sources & Sync

This directory is automatically updated from multiple sources. See [SYNC.md](SYNC.md) for details on our data pipeline.

| Source | Type | Sync Method | Frequency |
|--------|------|-------------|-----------|
| GitHub awesome-lists | Markdown parsing | GitHub API | Daily |
| Official MCP Registry | REST API | API polling | Daily |
| MCP.so | Supabase DB | API/scrape | Weekly |
| SkillsMP | Web marketplace | API | Weekly |
| cursor.directory | Open source repo | Git sync | Daily |
| GitHub trending | GitHub API | API polling | Daily |

---

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

### How to submit a skill

1. Fork this repo
2. Add your skill to the appropriate section in `README.md`
3. Follow the format: `- [name](url) - Short description. ![GitHub stars](https://img.shields.io/github/stars/owner/repo)`
4. Submit a PR

### What counts as an "agent skill"?

Any tool, plugin, extension, rule set, or capability that enhances an AI coding agent's abilities. This includes:
- SKILL.md files (Agent Skills spec)
- MCP servers
- Cursor/Windsurf rules
- Editor extensions for AI agents
- Framework-specific tools (LangChain, CrewAI, etc.)
- CLI tools for skill management

---

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related rights to this work.
