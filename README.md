# 聊斋：系统

志怪文字 RPG。取材 **聊斋志异**，现代白话，手机横屏游玩。

当前仓库以 **设计文档** 为主；实现按 [开发阶段计划](docs/DEVELOPMENT_PLAN.md) 推进：**先做纯剧情，再接入系统**。

## 核心体验

- 玩家扮演 **系统**，与宿主通过 **心声** 交流（旁人听不见，如同内心独白）。
- **平时**宿主与系统不联系；仅在宿主 **请求帮助** 或 **遭遇危机** 时对话。
- 请求与危机时，系统 **必须帮忙**（玩家选择「怎么帮」，不能拒绝）。
- 宿主与系统 **第一次认识**：宿主某次醒来，系统问候并自我介绍。
- 初版剧情尽量按聊斋 **原著** 走；首个故事为《聂小倩》（宁采臣）。

## 开发阶段

| 阶段 | 内容 |
|------|------|
| **阶段一（初版）** | 仅互动剧情，无系统 UI |
| **阶段二** | 插入初遇、心声、求助/危机回应 |
| **阶段三** | 撤离、多宿主、词条（规划中） |

## 文档索引

| 文档 | 说明 |
|------|------|
| [愿景](docs/VISION.md) | 核心体验与成功标准 |
| [术语表](docs/GLOSSARY.md) | 统一命名 |
| [聊斋世界观](docs/WORLD_LIAOZHAI.md) | 题材范围与聂小倩锚点 |
| [系统机制](docs/SYSTEM_MECHANICS.md) | 心声、必帮、初遇、静默 |
| [开发阶段计划](docs/DEVELOPMENT_PLAN.md) | 阶段一 / 二 / 三 |
| [叙事指南](docs/NARRATIVE_GUIDE.md) | 文风与心声写作 |
| [宿主模板](docs/HOST_TEMPLATE.md) | 新篇目设计表 |
| [事件数据规范](docs/EVENT_SCHEMA.md) | JSON schema |
| [UI 规范（横屏）](docs/UI_LANDSCAPE.md) | 布局与组件 |
| [内容路线图](docs/CONTENT_ROADMAP.md) | 聂小倩节点与系统接入点 |
| [存档格式](docs/SAVE_FORMAT.md) | localStorage 结构 |

## 本地运行（实现后）

```bash
npm install
npm run dev
```

## 构建与部署

```bash
npm run build
```

将 `dist` 部署到 GitHub Pages（Vite `base` 需与仓库名一致）。

## 技术栈（计划）

- Vite + Vue 3 + TypeScript
- 静态站点，无后端

## 声明

剧情灵感来自公有领域《聊斋志异》，互动改编为原创，与影视版本无关。

## 许可

待定（实现阶段添加 LICENSE）。
