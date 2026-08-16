# 事件数据规范（EVENT_SCHEMA）

阶段一与阶段二共用同一 schema；阶段一忽略系统相关字段的 UI 渲染即可。

## 文件结构

```json
{
  "hostId": "ning_caichen",
  "version": 1,
  "start": "prologue_road",
  "events": {
    "node_id": { /* EventNode */ }
  }
}
```

## EventNode

| 字段 | 类型 | 阶段一 | 说明 |
|------|------|--------|------|
| `id` | string | ✅ | 与 key 一致 |
| `narrative` | string[] | ✅ | 场景段落，按序展示 |
| `dialogue` | DialogueLine[] | 可选 | NPC 外在对话 |
| `choices` | StoryChoice[] | ✅ | 宿主行动选项 |
| `next` | string | 可选 | 无选项时自动跳转 |
| `systemAwakening` | boolean | 预留 | `true` 时触发系统初遇 |
| `hostCall` | HostCall | 预留 | 宿主呼唤系统 |
| `crisis` | boolean | 预留 | 危机样式 + 必帮 |
| `tianji` | Tianji | 预留 | 系统天机展示 |
| `onEnter` | Effect | 可选 | 进入节点时设置 flags |
| `notes` | string | 可选 | 写手备注，不渲染 |

## DialogueLine（外在对话）

```json
{
  "speaker": "聂小倩",
  "text": "妾身姓聂，小倩。",
  "side": "npc"
}
```

| `side` | 说明 |
|--------|------|
| `npc` | NPC 台词，旁人可见 |
| `host` | 宿主对外说的话 |

**心声不用 `dialogue`**，走 `hostCall` / `systemAwakening`。

## StoryChoice（剧情选项）

```json
{
  "id": "refuse_gold",
  "label": "婉拒银两",
  "next": "after_refuse_gold",
  "requires": {
    "flags": { "warned_by_system": true },
    "minTrust": 0
  },
  "sets": {
    "flags": { "refused_gold": true }
  }
}
```

## HostCall（宿主呼唤 → 系统必帮）

```json
{
  "trigger": "auto",
  "hostText": "系统，门外有人敲门，我该怎么办？",
  "responses": [
    {
      "id": "warn_not_human",
      "label": "告诉她：来者恐怕不是活人，千万别开门。",
      "systemText": "别开门。来的不是人。",
      "hostReply": "……好，我不开。",
      "effects": {
        "flags": { "knows_danger": true },
        "trust": 1
      },
      "unlockChoices": ["pretend_sleep"]
    },
    {
      "id": "tell_hide",
      "label": "让她装睡，别出声。",
      "systemText": "装睡，别出声。",
      "hostReply": "我明白了……",
      "effects": { "trust": 1 }
    }
  ]
}
```

### HostCall 规则

| 规则 | 说明 |
|------|------|
| `trigger` | `auto`：进入节点即触发；`manual`：预留，初版不用 |
| `hostText` | 宿主心声求助内容 |
| `responses` | **全部必须是帮忙**；`label` 供玩家选；`systemText` 为系统心声原文 |
| `hostReply` | 宿主听到系统后的低声心声反应（可选） |
| 禁止项 | 无 `refuse`、`ignore`、`silent` 类回应 |

## SystemAwakening（初遇，仅一次）

可单独节点 `systemAwakening: true`，或专用节点：

```json
{
  "id": "wake_in_temple",
  "narrative": ["宁采臣猛然睁眼，头顶是破旧的梁。"],
  "systemAwakening": true,
  "awakeningScript": {
    "systemLines": [
      "你醒了。",
      "我是系统。以后会在你心里说话——别人听不见。",
      "你若遇到危难，我会帮你。"
    ],
    "hostLines": [
      "……谁？！",
      "（他左右看了看，寺内无人留意。）"
    ],
    "next": "temple_arrival"
  }
}
```

初遇后进入 `next`，**不**再触发日常对话直到 `hostCall`。

## Tianji（系统视角，阶段二 UI）

```json
{
  "show": true,
  "hints": [
    "今夜寺中不止他一人。",
    "东厢之下，有血食之气。"
  ]
}
```

## Effect

```json
{
  "flags": { "key": true },
  "trust": 1,
  "vars": { "counter": 1 }
}
```

## 状态机（引擎）

```
load node
  → apply onEnter
  → if systemAwakening → 播放初遇 → next
  → render narrative + dialogue
  → if hostCall → 心声 UI（必选一回应）→ apply effects
  → show choices（含 unlockChoices 解锁项）
  → wait choice → goto next
```

## 阶段一最小节点示例

```json
{
  "id": "temple_arrival",
  "narrative": [
    "雨打得窗纸啪啪响。",
    "宁采臣站在兰若寺门前，行囊湿透。"
  ],
  "choices": [
    { "id": "knock", "label": "上前叩门", "next": "knock_door" },
    { "id": "hesitate", "label": "在门外犹豫", "next": "hesitate_outside" }
  ],
  "hostCall": null,
  "systemAwakening": false,
  "crisis": false,
  "tianji": null
}
```

## 完整示例见

`src/data/hosts/ning_caichen/`（实现阶段创建；文档阶段可参考 [HOST_TEMPLATE.md](HOST_TEMPLATE.md) 节点表）。
