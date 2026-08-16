# 聊斋：聂小倩

志怪文字 RPG。取材 **聊斋志异**《聂小倩》，现代白话，手机横屏游玩。

**阶段一（当前）**：纯剧情互动，无系统 UI。完整可玩宁采臣线，含好结局与多个坏结局。

在线体验（GitHub Pages 部署后）：`https://jk9988610.github.io/shenmoluanwu/`

## 玩法

- 阅读场景与对话，在底部选择宁采臣的行动
- 剧情尽量遵循聊斋原著脉络（拒金、夜叉、燕赤霞、携骨灰脱身等）
- 结局后可「重新开始」
- 进度自动保存在浏览器本地

## 本地运行

```bash
npm install
npm run dev
```

开发服务器默认 `http://localhost:5173/shenmoluanwu/`（注意 base 路径）。

## 构建与部署

```bash
npm run build
```

将 `dist` 部署到 GitHub Pages。`vite.config.ts` 中 `base` 为 `/shenmoluanwu/`。

推送至 `main` 分支时，GitHub Actions 会自动构建并发布 Pages。

## 技术栈

- Vite + Vue 3 + TypeScript
- 自研事件引擎（`src/engine/`）
- 剧情数据：`src/data/hosts/ning_caichen/story.ts`

## 开发阶段

| 阶段 | 状态 |
|------|------|
| 阶段一：纯剧情 | ✅ 聂小倩线可玩 |
| 阶段二：接入系统 | 待开发（心声、初遇、求助必帮） |
| 阶段三：多宿主串联 | 规划中 |

## 文档

| 文档 | 说明 |
|------|------|
| [愿景](docs/VISION.md) | 核心体验与成功标准 |
| [开发阶段计划](docs/DEVELOPMENT_PLAN.md) | 阶段一 / 二 / 三 |
| [事件数据规范](docs/EVENT_SCHEMA.md) | 节点 schema |
| [UI 规范（横屏）](docs/UI_LANDSCAPE.md) | 布局与组件 |

完整文档索引见各 `docs/` 文件。

## 声明

剧情灵感来自公有领域《聊斋志异》，互动改编为原创，与影视版本无关。
