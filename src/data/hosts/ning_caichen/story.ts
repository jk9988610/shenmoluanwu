import type { StoryData } from '../../engine/types'

const emptySystem = {
  hostCall: null,
  systemAwakening: false,
  crisis: false,
  tianji: null,
}

export const ningCaichenStory: StoryData = {
  hostId: 'ning_caichen',
  version: 1,
  start: 'prologue_road',
  events: {
    prologue_road: {
      id: 'prologue_road',
      display: { location: '赴考路', period: '暮雨' },
      narrative: [
        '暮雨敲打着宁采臣斗笠，山路泥泞，行囊沉重。',
        '他此番赴考，已是第三次。前两次名落孙山，乡里人笑他痴心，他却仍抱着一卷书，不肯回头。',
        '天光将尽，前不着村，后不着店。',
      ],
      choices: [
        {
          id: 'continue_night',
          label: '冒雨赶路，寻个歇脚处',
          next: 'see_temple',
        },
        {
          id: 'rest_brief',
          label: '在树下稍歇，等雨势小些',
          next: 'see_temple_late',
        },
      ],
      ...emptySystem,
    },

    see_temple_late: {
      id: 'see_temple_late',
      display: { location: '山路', period: '夜' },
      narrative: [
        '雨势稍歇，宁采臣起身时，鞋底已湿透。',
        '林深处，忽见一点灯火，像有人烟。',
        '近了才见，是一座古寺，门匾上书「兰若寺」三字，漆色剥落，透着股陈年的阴气。',
      ],
      choices: [
        {
          id: 'enter',
          label: '入寺借宿',
          next: 'knock_door',
        },
        {
          id: 'hesitate',
          label: '在门外犹豫片刻',
          next: 'hesitate_outside',
        },
      ],
      ...emptySystem,
    },

    see_temple: {
      id: 'see_temple',
      display: { location: '山路', period: '雨夜' },
      narrative: [
        '雨里，宁采臣眯眼望去，林深处竟有一座古寺。',
        '门匾上书「兰若寺」，朱漆剥落，檐角蛛网垂落，像是许久无人洒扫。',
        '若不进寺，今夜怕要露宿荒野。',
      ],
      choices: [
        {
          id: 'enter',
          label: '入寺借宿',
          next: 'knock_door',
        },
        {
          id: 'hesitate',
          label: '在门外犹豫',
          next: 'hesitate_outside',
        },
      ],
      ...emptySystem,
    },

    hesitate_outside: {
      id: 'hesitate_outside',
      display: { location: '兰若寺外', period: '雨夜' },
      narrative: [
        '宁采臣立在门外，雨声里夹杂着隐约的呜咽，说不清是风还是别的什么。',
        '他想起书里说的「荒寺不可居」，可怀里盘缠所剩无几，住店已是奢望。',
        '他深吸一口气，抬手叩门。',
      ],
      next: 'knock_door',
      ...emptySystem,
    },

    knock_door: {
      id: 'knock_door',
      display: { location: '兰若寺', period: '雨夜' },
      narrative: [
        '门内脚步迟缓，一个老僧掌灯开门，面色灰白，目光却还算和善。',
        '宁采臣拱手说明来意：赴考路过，求借一宿，明日便走。',
      ],
      dialogue: [
        {
          speaker: '宁采臣',
          text: '老师父，小生宁采臣，雨夜迷路，想在贵寺借宿一宿，明日便走。',
          side: 'host',
        },
        {
          speaker: '老僧',
          text: '寺中荒凉，只有东厢、西厢可住。施主自择便是。',
          side: 'npc',
        },
      ],
      next: 'hear_yan',
      ...emptySystem,
    },

    hear_yan: {
      id: 'hear_yan',
      display: { location: '兰若寺', period: '雨夜' },
      narrative: [
        '宁采臣正要道谢，忽听后院传来一声剑鸣，寒光在雨幕里一闪即灭。',
        '老僧叹道：寺里还住着一位姓燕的剑客，名赤霞，性情古怪，少与人言。',
      ],
      dialogue: [
        {
          speaker: '老僧',
          text: '燕客住西厢，施主若听见异响，莫要多管闲事。',
          side: 'npc',
        },
      ],
      choices: [
        {
          id: 'visit_yan',
          label: '想去拜访燕赤霞',
          next: 'visit_yan_declined',
        },
        {
          id: 'rest_first',
          label: '先安顿下来',
          next: 'assign_room',
        },
      ],
      ...emptySystem,
    },

    visit_yan_declined: {
      id: 'visit_yan_declined',
      display: { location: '兰若寺', period: '雨夜' },
      narrative: [
        '宁采臣行至西厢外，见门紧闭，烛火从窗缝漏出，却无人应答。',
        '雨声里，他听见屋内有人低声念咒，似在镇什么邪物。',
        '他不敢再扰，只得退回。',
      ],
      next: 'assign_room',
      ...emptySystem,
    },

    assign_room: {
      id: 'assign_room',
      display: { location: '兰若寺厢房', period: '雨夜' },
      narrative: [
        '老僧引宁采臣至厢房区。东厢窗纸破损，风里带着一股甜腥气；西厢离燕客近，相对安静。',
        '宁采臣记得老僧方才的警告，心中发毛。',
      ],
      choices: [
        {
          id: 'east_room',
          label: '住进东厢',
          next: 'assign_east',
          sets: { flags: { room_east: true } },
        },
        {
          id: 'west_room',
          label: '住进西厢',
          next: 'assign_west',
          sets: { flags: { room_west: true } },
        },
      ],
      ...emptySystem,
    },

    assign_east: {
      id: 'assign_east',
      display: { location: '东厢', period: '雨夜' },
      narrative: [
        '东厢陈设简陋，床板嘎吱作响。宁采臣放下行囊，忽觉脚下地板微微发颤，像有什么在楼下蠕动。',
        '他吹灭灯，和衣躺下，却不敢阖眼。',
      ],
      next: 'xiaqian_first',
      ...emptySystem,
    },

    assign_west: {
      id: 'assign_west',
      display: { location: '西厢', period: '雨夜' },
      narrative: [
        '西厢虽近燕客，却少那股腥气。宁采臣刚躺下，便听见隔壁低低的剑吟，心里反倒踏实些。',
        '雨声渐密，他迷迷糊糊正要睡去。',
      ],
      next: 'xiaqian_first',
      ...emptySystem,
    },

    xiaqian_first: {
      id: 'xiaqian_first',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '夜半，窗纸上映出一个女子的剪影，长发垂肩，身形窈窕。',
        '她隔窗低语，声音柔得像水，却带着一丝颤抖。',
      ],
      dialogue: [
        {
          speaker: '聂小倩',
          text: '公子莫要睡在东厢之下，那里血食气重。也不要饮那井里的水。',
          side: 'npc',
        },
      ],
      choices: [
        {
          id: 'believe',
          label: '追问她是何人',
          next: 'xiaqian_first_talk',
          sets: { flags: { believed_warning: true } },
        },
        {
          id: 'doubt',
          label: '只道是风声，不答',
          next: 'xiaqian_first_silent',
        },
      ],
      ...emptySystem,
    },

    xiaqian_first_talk: {
      id: 'xiaqian_first_talk',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '宁采臣惊问来由。女子沉默片刻，只道姓聂，名小倩，亦是被困于此的可怜人。',
        '她说罢便退入黑暗，再无声息。',
      ],
      dialogue: [
        {
          speaker: '聂小倩',
          text: '公子心善，小倩不敢欺瞒。只求公子今夜平安。',
          side: 'npc',
        },
      ],
      next: 'night_knock',
      ...emptySystem,
    },

    xiaqian_first_silent: {
      id: 'xiaqian_first_silent',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '宁采臣只当是自己吓自己，翻了个身。窗外那影子叹息一声，悄然离去。',
        '他嘴上不信，心里却记下了「勿饮井水」几个字。',
      ],
      onEnter: { flags: { heard_warning: true } },
      next: 'night_knock',
      ...emptySystem,
    },

    night_knock: {
      id: 'night_knock',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '未几，门外响起轻轻的叩门声，像有人用指尖点着门板，一下，两下。',
        '烛火跳动，宁采臣的影子在墙上抖得厉害。',
      ],
      dialogue: [
        {
          speaker: '聂小倩',
          text: '公子……是我，小倩。雨夜寒冷，愿与公子对烛一谈。',
          side: 'npc',
        },
      ],
      choices: [
        {
          id: 'not_open',
          label: '闭门不应，装作已睡',
          next: 'gold_offer',
          sets: { flags: { door_closed: true } },
        },
        {
          id: 'open_door',
          label: '开门相迎',
          next: 'open_door_path',
        },
      ],
      ...emptySystem,
    },

    open_door_path: {
      id: 'open_door_path',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '门一开，冷风灌入。小倩立在门外，面色苍白，却笑得温柔。',
        '她递来一方金锭，说是借公子路资。宁采臣见她衣袂无风自动，心中一凛。',
      ],
      choices: [
        {
          id: 'refuse_open',
          label: '坚辞不受，请她离去',
          next: 'gold_offer',
          sets: { flags: { refused_gold: true, door_closed: false } },
        },
        {
          id: 'accept_gold',
          label: '接过金锭（犹豫）',
          next: 'ending_bad_gold',
        },
      ],
      ...emptySystem,
    },

    gold_offer: {
      id: 'gold_offer',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '门外的人并未离去。片刻后，一只纤手从窗缝塞入金锭，落在案上，冷光森然。',
        '宁采臣想起小倩的警告，又想起赴考需用，手指微微发抖。',
      ],
      choices: [
        {
          id: 'refuse_gold',
          label: '将金锭推出窗外，坚辞不受',
          next: 'before_yaksha',
          sets: { flags: { refused_gold: true } },
        },
        {
          id: 'hesitate_refuse',
          label: '犹豫后仍推回金锭',
          next: 'before_yaksha',
          sets: { flags: { refused_gold: true, hesitated: true } },
        },
      ],
      ...emptySystem,
    },

    before_yaksha: {
      id: 'before_yaksha',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '金锭落地，发出一声闷响。门外叹息远去，寺里重归死寂。',
        '宁采臣刚松一口气，忽闻楼下传来沉重脚步，像有什么巨物在拖行。',
      ],
      dialogue: [
        {
          speaker: '宁采臣',
          text: '什么声音……',
          side: 'host',
        },
      ],
      next: 'yaksha',
      ...emptySystem,
    },

    yaksha: {
      id: 'yaksha',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '门闩剧烈震动，木屑飞溅。一张青面獠牙的脸从破洞里探入，鼻孔喷出腥风。',
        '夜叉咆哮：「生人气！生人气！」',
        '宁采臣魂飞魄散，屋里已无处可藏。',
      ],
      choices: [
        {
          id: 'hide',
          label: '躲到梁上屏息',
          next: 'yaksha_hide',
          sets: { flags: { hid_on_beam: true } },
        },
        {
          id: 'shout',
          label: '大声呼救',
          next: 'yaksha_shout',
          sets: { flags: { called_for_help: true } },
        },
        {
          id: 'panic',
          label: '慌不择路，夺门而出',
          next: 'ending_bad_yaksha',
        },
      ],
      crisis: true,
      hostCall: null,
      systemAwakening: false,
      tianji: null,
    },

    yaksha_hide: {
      id: 'yaksha_hide',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '宁采臣攀上房梁，死死捂住嘴。夜叉在屋里嗅了一圈，舌头舔过桌面，滴下黏液。',
        '就在舌尖即将触到他鞋面时，后院剑光暴起。',
      ],
      next: 'yan_fight',
      ...emptySystem,
    },

    yaksha_shout: {
      id: 'yaksha_shout',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '宁采臣失声大叫。夜叉猛转头，獠牙直取他咽喉——',
        '一道剑光自窗外切入，将那妖物手臂齐肩斩断。燕赤霞破门而入，衣襟带血，眼神如电。',
      ],
      next: 'yan_fight',
      ...emptySystem,
    },

    yan_fight: {
      id: 'yan_fight',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '燕赤霞与夜叉缠斗，剑气纵横，屋瓦尽碎。',
        '宁采臣缩在梁上，眼见那妖物化作黑雾欲逃，被一剑斩为两段，污血溅满墙壁。',
      ],
      choices: [
        {
          id: 'watch',
          label: '屏息旁观，不敢出声',
          next: 'after_yan_fight',
        },
        {
          id: 'try_help',
          label: '捡起断木砸向妖物',
          next: 'after_yan_fight',
          sets: { flags: { helped_yan: true } },
        },
      ],
      ...emptySystem,
    },

    after_yan_fight: {
      id: 'after_yan_fight',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '妖血渐冷，燕赤霞收剑入鞘，瞥了梁上一眼，淡淡道：「下来吧，它死了。」',
        '宁采臣落地时双腿发软，几乎跪倒。',
      ],
      dialogue: [
        {
          speaker: '燕赤霞',
          text: '书生胆子倒不小，敢住这寺。夜叉一脉未除尽，你今夜算捡了一条命。',
          side: 'npc',
        },
      ],
      next: 'xiaqian_truth',
      ...emptySystem,
    },

    xiaqian_truth: {
      id: 'xiaqian_truth',
      display: { location: '寺院', period: '黎明前' },
      narrative: [
        '天边泛起蟹青色，聂小倩自墙角阴影中走出，衣衫染血，却向宁采臣深深一拜。',
        '她坦言自己早已死去，因尸骨被妖物挟制，不得不为虎作伥，诱人生气供妖吸食。',
      ],
      dialogue: [
        {
          speaker: '聂小倩',
          text: '公子拒金不受，夜叉才怒而来。小倩愿将骨灰金匣相托，求公子携归葬于安稳之处，小倩方得超生。',
          side: 'npc',
        },
        {
          speaker: '宁采臣',
          text: '你若真心脱离魔掌，我宁采臣拼死也要助你。',
          side: 'host',
        },
      ],
      choices: [
        {
          id: 'promise',
          label: '郑重承诺相助',
          next: 'get_urn',
          sets: { flags: { promised_help: true } },
        },
        {
          id: 'hesitate_promise',
          label: '犹豫后仍答应她',
          next: 'get_urn',
          sets: { flags: { promised_help: true, hesitated: true } },
        },
      ],
      ...emptySystem,
    },

    get_urn: {
      id: 'get_urn',
      display: { location: '地窖入口', period: '黎明' },
      narrative: [
        '小倩引宁采臣至寺后地窖。妖雾缭绕，金匣埋在腐土之中，旁有骷髅堆叠。',
        '远处传来姥姥的嘶吼，整座兰若寺都在震颤。',
      ],
      choices: [
        {
          id: 'stealth',
          label: '按小倩指引，悄声挖取金匣',
          next: 'final_escape',
          sets: { flags: { stealth_urn: true } },
        },
        {
          id: 'rush',
          label: '冲进去一把抱起金匣',
          next: 'final_escape_rush',
        },
      ],
      ...emptySystem,
    },

    final_escape_rush: {
      id: 'final_escape_rush',
      display: { location: '地窖', period: '黎明' },
      narrative: [
        '金匣入手冰凉，妖雾骤然合拢。姥姥的鬼爪从土里探出，抓住宁采臣脚踝。',
        '小倩扑上来撕扯鬼爪，指甲迸裂，惨叫刺耳。',
      ],
      choices: [
        {
          id: 'wise_escape_rush',
          label: '将金匣掷向姥姥，趁其分神狂奔',
          next: 'escape_success',
          sets: { flags: { threw_urn_trick: true } },
        },
        {
          id: 'force_escape_rush',
          label: '硬拽小倩往外冲',
          next: 'ending_bad_escape',
        },
      ],
      crisis: true,
      hostCall: null,
      systemAwakening: false,
      tianji: null,
    },

    final_escape: {
      id: 'final_escape',
      display: { location: '地窖', period: '黎明' },
      narrative: [
        '宁采臣照小倩所示撒下符灰，妖雾退开一线。他双手挖出金匣，匣上刻着「聂」字。',
        '姥姥的咆哮近在咫尺，土墙开始崩裂。',
      ],
      choices: [
        {
          id: 'wise_escape',
          label: '沿旧墙洞脱身，直奔山道',
          next: 'escape_success',
        },
        {
          id: 'force_escape',
          label: '走正门硬闯',
          next: 'ending_bad_escape',
        },
      ],
      crisis: true,
      hostCall: null,
      systemAwakening: false,
      tianji: null,
    },

    escape_success: {
      id: 'escape_success',
      display: { location: '山道', period: '日出' },
      narrative: [
        '晨光刺破林雾，宁采臣与小倩跌坐在山道边，身后兰若寺轰然塌了一角，黑烟散尽。',
        '金匣静静躺在膝上，小倩的脸色第一次有了血色。',
      ],
      dialogue: [
        {
          speaker: '聂小倩',
          text: '公子大恩，小倩没齿难忘。骨灰得葬，小倩便可随行侍奉，虽为鬼身，不敢负义。',
          side: 'npc',
        },
      ],
      next: 'ending_good',
      ...emptySystem,
    },

    ending_good: {
      id: 'ending_good',
      display: { location: '宁家', period: '数月后' },
      narrative: [
        '数月后，宁采臣将骨灰葬于城外桃林。风起花落，小倩现身道谢，自此居于宁家，暗中护持。',
        '他第四次赴考仍未必高中，却再不怕夜雨敲窗——因他知道，有些情义，比功名更重。',
      ],
      ending: {
        id: 'ending_good',
        title: '脱身相随',
        summary: [
          '你护宁采臣携小倩脱离兰若寺，骨灰得葬，二人相伴。',
          '此为《聂小倩》原著向结局。',
        ],
      },
      ...emptySystem,
    },

    ending_bad_gold: {
      id: 'ending_bad_gold',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '金锭入手刹那，宁采臣浑身一寒，眼前金光化作腐土。',
        '门外笑声陡厉，夜叉破窗而入——他贪念一起，妖气便寻味而来。',
        '他还未及喊叫，喉咙已被扼断。兰若寺又多了一具无人认领的书生尸骨。',
      ],
      ending: {
        id: 'ending_bad_gold',
        title: '贪念招祸',
        summary: [
          '宁采臣收下妖金，被夜叉所害，死于兰若寺。',
          '拒金不受，本是此篇活命之理。',
        ],
      },
      ...emptySystem,
    },

    ending_bad_yaksha: {
      id: 'ending_bad_yaksha',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '宁采臣夺门而出，迎面撞上夜叉胸膛。腥风扑面，他连退数步，背脊撞上廊柱。',
        '妖爪挥落，烛火与生命同时熄灭。雨还在下，寺里却再无人听见他的呼吸。',
      ],
      ending: {
        id: 'ending_bad_yaksha',
        title: '慌不择路',
        summary: [
          '面对夜叉时夺门出逃，宁采臣当场毙命。',
          '若能屏息躲藏或呼救，或还有一线生机。',
        ],
      },
      ...emptySystem,
    },

    ending_bad_escape: {
      id: 'ending_bad_escape',
      display: { location: '兰若寺', period: '黎明' },
      narrative: [
        '姥姥的鬼雾封死去路，宁采臣与小倩被拖回地窖深处。',
        '金匣碎裂，骨灰散落，小倩的哭声戛然而止。宁采臣在黑暗里听见自己的骨头被一寸寸捏碎。',
      ],
      ending: {
        id: 'ending_bad_escape',
        title: '脱身失败',
        summary: [
          '撤离时硬闯妖雾，宁采臣与小倩皆未能离开兰若寺。',
          '智取、依小倩指引，或可将金匣安然带出。',
        ],
      },
      ...emptySystem,
    },
  },
}
