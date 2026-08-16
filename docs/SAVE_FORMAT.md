# 存档格式

阶段一可简化；阶段二与多宿主共用本结构。

## 存储

- 浏览器 `localStorage`
- 键名：`liaozhai_system_save_v1`
- 可选：导出 / 导入 JSON 文件

## SaveData

```json
{
  "version": 1,
  "hostId": "ning_caichen",
  "currentNodeId": "night_knock",
  "flags": {
    "refused_gold": true,
    "knows_danger": false
  },
  "vars": {},
  "trust": 2,
  "systemAwakeningDone": false,
  "phase": "story_only",
  "history": ["prologue_road", "see_temple"],
  "updatedAt": "2026-08-16T06:00:00.000Z"
}
```

| 字段 | 说明 |
|------|------|
| `version` | 存档 schema 版本 |
| `hostId` | 当前宿主 |
| `currentNodeId` | 当前节点 |
| `flags` | 剧情布尔标记 |
| `vars` | 数值变量（计数等） |
| `trust` | 宿主对系统信任（阶段二，可选） |
| `systemAwakeningDone` | 初遇是否已完成 |
| `phase` | `story_only` \| `with_system` — 便于同一节点数据两阶段切换 |
| `history` | 经过节点 ID 列表，供回看与 debug |
| `updatedAt` | ISO 时间 |

## 阶段一简化存档

阶段一可只存：

```json
{
  "version": 1,
  "hostId": "ning_caichen",
  "currentNodeId": "night_knock",
  "flags": {},
  "history": []
}
```

## 迁移

- `version` 变更时提供 `migrateSave(old)` 函数。
- 节点 ID 变更时，在迁移表中映射 `oldId → newId`。

## 清除

- 设置页或调试命令：`localStorage.removeItem('liaozhai_system_save_v1')`
