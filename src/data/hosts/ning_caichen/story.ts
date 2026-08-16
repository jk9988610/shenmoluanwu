import type { StoryData } from '../../engine/types'

const emptySystem = {
  hostCall: null,
  systemAwakening: false,
  crisis: false,
  tianji: null,
}

export const ningCaichenStory: StoryData = {
  hostId: 'ning_caichen',
  version: 2,
  start: 'wake_on_road',
  events: {
    wake_on_road: {
      id: 'wake_on_road',
      display: { location: '山路', period: '雨夜' },
      narrative: [
        '雨声骤紧，宁采臣自树下惊醒，下意识攥紧湿透的行囊。',
        '四周无人，只有林涛与雨点敲打枝叶。',
      ],
      systemAwakening: true,
      awakeningScript: {
        systemLines: [
          '你醒了。',
          '我是系统。往后会在你心里说话——旁人听不见。',
          '你若遇危难、向我求助，我会帮你。',
        ],
        hostLines: [
          '……谁？！',
          '（他猛然抬头，四顾无人，雨声依旧。）',
        ],
        next: '',
      },
      next: 'prologue_road',
      hostCall: null,
      crisis: false,
      tianji: {
        show: true,
        hints: ['宿主宁采臣，赴考书生，第三次上路。', '前方林深处，有古寺灯火。'],
      },
    },

    prologue_road: {
      id: 'prologue_road',
      display: { location: '赴考路', period: '暮雨' },
      narrative: [
        '暮雨敲打着宁采臣斗笠，山路泥泞，行囊沉重。',
        '他此番赴考，已是第三次。前两次名落孙山，乡里人笑他痴心，他却仍抱着一卷书，不肯回头。',
        '天光将尽，前不着村，后不着店。',
      ],
      next: 'see_temple',
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
      next: 'hesitate_outside',
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
      hostCall: {
        trigger: 'auto',
        hostText: '系统，这异响是什么？我住哪儿才安全？',
        responses: [
          {
            id: 'warn_east',
            label: '告知：东厢下有血食气，别住东厢，选西厢。',
            systemText: '别住东厢。楼下有血食气，选西厢。',
            hostReply: '好……我记住了。',
            effects: { flags: { hinted_west: true, room_west: true } },
            next: 'assign_west',
          },
          {
            id: 'tell_yan',
            label: '告知：西厢近燕赤霞，相对安全，住西厢。',
            systemText: '住西厢。燕赤霞在隔壁，妖物忌惮他。',
            hostReply: '燕客……但愿他肯出手。',
            effects: { flags: { hinted_west: true, room_west: true } },
            next: 'assign_west',
          },
          {
            id: 'explain_sound',
            label: '说明异响是妖物蛰伏，选厢房时靠门远墙。',
            systemText: '异响是妖物在楼下蛰伏。选远墙的厢房，别靠窗。',
            hostReply: '我明白了，小心为上。',
            effects: { flags: { room_east: true } },
            next: 'assign_east',
          },
        ],
      },
      tianji: {
        show: true,
        hints: ['东厢之下，有血食之气。', '燕赤霞居西厢，可恃为援。'],
      },
      crisis: false,
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
      next: 'xiaqian_first_talk',
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
      hostCall: {
        trigger: 'auto',
        hostText: '系统，是小倩在敲门……我开不开门？',
        responses: [
          {
            id: 'dont_open',
            label: '让她别开门，装睡不要应。',
            systemText: '别开门。装睡，不要应。',
            hostReply: '好……我不开。',
            effects: { flags: { door_closed: true } },
            next: 'gold_offer',
          },
          {
            id: 'warn_night',
            label: '告知雨夜寺中不宜开门，隔门问话即可。',
            systemText: '雨夜寺中不宜开门。若要问话，隔门问，别开门。',
            hostReply: '隔门问……我明白了。',
            effects: { flags: { door_closed: true } },
            next: 'gold_offer',
          },
          {
            id: 'comfort',
            label: '安抚她，先稳住心神，别开厢门。',
            systemText: '先稳住。别开厢门，她进不来就无妨。',
            hostReply: '我……我尽量镇定。',
            effects: { flags: { door_closed: true } },
            next: 'gold_offer',
          },
        ],
      },
      crisis: false,
      tianji: null,
      systemAwakening: false,
    },

    gold_offer: {
      id: 'gold_offer',
      display: { location: '厢房', period: '深夜' },
      narrative: [
        '门外的人并未离去。片刻后，一只纤手从窗缝塞入金锭，落在案上，冷光森然。',
        '宁采臣想起小倩的警告，又想起赴考需用，手指微微发抖。',
      ],
      hostCall: {
        trigger: 'auto',
        hostText: '系统，这银子……能拿吗？',
        responses: [
          {
            id: 'refuse_gold_call',
            label: '绝不能拿，妖物常以财物诱人。',
            systemText: '不能拿。妖物爱用财物诱人，快推回去。',
            hostReply: '我……我不拿。',
            effects: { flags: { refused_gold: true } },
            next: 'before_yaksha',
          },
          {
            id: 'warn_yaksha',
            label: '告知收此金会招夜叉嗅到生气。',
            systemText: '收了会招夜叉。妖金带腥气，推回去。',
            hostReply: '难怪小倩警告……我推回去。',
            effects: { flags: { refused_gold: true } },
            next: 'before_yaksha',
          },
          {
            id: 'push_back',
            label: '让他立刻把金锭推出窗外。',
            systemText: '立刻推出去。别碰太久。',
            hostReply: '我这就推出去！',
            effects: { flags: { refused_gold: true } },
            next: 'before_yaksha',
          },
        ],
      },
      crisis: false,
      tianji: {
        show: true,
        hints: ['妖金带腥，触之招祸。', '拒金不受，夜叉难寻生气。'],
      },
      systemAwakening: false,
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
      hostCall: {
        trigger: 'auto',
        hostText: '系统！夜叉进来了！怎么办！',
        responses: [
          {
            id: 'hide_beam',
            label: '让他立刻攀上房梁屏息躲藏。',
            systemText: '爬上房梁！屏住呼吸，别出声！',
            hostReply: '……！',
            effects: { flags: { hid_on_beam: true } },
            next: 'yaksha_hide',
          },
          {
            id: 'call_yan',
            label: '让他大声呼喊燕赤霞来救。',
            systemText: '喊燕赤霞！大声喊！',
            hostReply: '燕客——救我——！',
            effects: { flags: { called_for_help: true } },
            next: 'yaksha_shout',
          },
          {
            id: 'cover_hide',
            label: '叮嘱捂嘴上梁，勿泄活人之气。',
            systemText: '捂嘴，上梁。别让妖闻到你活人的精气。',
            hostReply: '我上了……',
            effects: { flags: { hid_on_beam: true } },
            next: 'yaksha_hide',
          },
        ],
      },
      crisis: true,
      tianji: {
        show: true,
        hints: ['夜叉畏剑，燕赤霞在附近。', '屏息上梁，可避一时。'],
      },
      systemAwakening: false,
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
      next: 'after_yan_fight',
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
      hostCall: {
        trigger: 'auto',
        hostText: '系统……她到底是不是鬼？我该信她吗？',
        responses: [
          {
            id: 'trust_her',
            label: '告知她是鬼魂，但心未泯，可信其求助。',
            systemText: '她是鬼。但心未泯，她求你携骨灰，可信。',
            hostReply: '鬼……可她救过我。我信她这一回。',
            effects: { flags: { knows_ghost: true, promised_help: true } },
            next: 'get_urn',
          },
          {
            id: 'help_anyway',
            label: '不论生死，她拒金救你，值得相助。',
            systemText: '不论生死，她方才也在救你。帮她葬骨脱身。',
            hostReply: '好，我答应她。',
            effects: { flags: { promised_help: true } },
            next: 'get_urn',
          },
          {
            id: 'warn_careful',
            label: '说明她是鬼身，但可取骨灰，需小心姥姥。',
            systemText: '她是鬼身。骨灰能取，但要快，姥姥未远。',
            hostReply: '我明白……快些行动。',
            effects: { flags: { promised_help: true } },
            next: 'get_urn',
          },
        ],
      },
      crisis: false,
      tianji: {
        show: true,
        hints: ['骨灰在金匣，姥姥仍盘踞寺后。', '帮她葬骨，她可脱离控制。'],
      },
      systemAwakening: false,
    },

    get_urn: {
      id: 'get_urn',
      display: { location: '地窖入口', period: '黎明' },
      narrative: [
        '小倩引宁采臣至寺后地窖。妖雾缭绕，金匣埋在腐土之中，旁有骷髅堆叠。',
        '远处传来姥姥的嘶吼，整座兰若寺都在震颤。',
      ],
      hostCall: {
        trigger: 'auto',
        hostText: '系统，怎么取这骨灰才稳妥？',
        responses: [
          {
            id: 'stealth',
            label: '让他按小倩指引，悄声挖取金匣。',
            systemText: '听小倩的，悄声挖，别惊动妖雾。',
            hostReply: '好，我轻些……',
            effects: { flags: { stealth_urn: true } },
            next: 'final_escape',
          },
          {
            id: 'rush',
            label: '让他快取金匣，但备好符灰护身。',
            systemText: '快取，但先撒符灰护身，别硬闯雾中。',
            hostReply: '符灰……我撒了！',
            next: 'final_escape_rush',
          },
          {
            id: 'follow_guide',
            label: '叮嘱完全依照小倩步调，不可自作主张。',
            systemText: '一切听小倩的，别自作主张。',
            hostReply: '我跟着她。',
            effects: { flags: { stealth_urn: true } },
            next: 'final_escape',
          },
        ],
      },
      crisis: false,
      tianji: {
        show: true,
        hints: ['金匣在腐土中，姥姥将至。', '符灰可退妖雾一线。'],
      },
      systemAwakening: false,
    },

    final_escape_rush: {
      id: 'final_escape_rush',
      display: { location: '地窖', period: '黎明' },
      narrative: [
        '金匣入手冰凉，妖雾骤然合拢。姥姥的鬼爪从土里探出，抓住宁采臣脚踝。',
        '小倩扑上来撕扯鬼爪，指甲迸裂，惨叫刺耳。',
      ],
      hostCall: {
        trigger: 'auto',
        hostText: '系统！逃不掉了——怎么办！',
        responses: [
          {
            id: 'throw_urn',
            label: '让他把金匣掷向姥姥，趁乱脱身。',
            systemText: '把金匣掷向姥姥！趁她分神，往外跑！',
            hostReply: '我扔了——跑！',
            effects: { flags: { threw_urn_trick: true } },
            next: 'escape_success',
          },
          {
            id: 'drag_xiaqian',
            label: '让他拽着小倩往墙洞方向冲。',
            systemText: '拽着小倩！往墙洞方向冲，别停！',
            hostReply: '小倩，跟我走！',
            next: 'escape_success',
          },
          {
            id: 'cover_xiaqian',
            label: '叮嘱护住金匣，沿来路洞逃。',
            systemText: '护住匣子，沿来时的洞逃，别走正门！',
            hostReply: '我知道往哪边……',
            next: 'escape_success',
          },
        ],
      },
      crisis: true,
      tianji: {
        show: true,
        hints: ['姥姥贪匣，掷匣可乱其神。', '墙洞来路，莫走正门。'],
      },
      systemAwakening: false,
    },

    final_escape: {
      id: 'final_escape',
      display: { location: '地窖', period: '黎明' },
      narrative: [
        '宁采臣照小倩所示撒下符灰，妖雾退开一线。他双手挖出金匣，匣上刻着「聂」字。',
        '姥姥的咆哮近在咫尺，土墙开始崩裂。',
      ],
      hostCall: {
        trigger: 'auto',
        hostText: '系统！姥姥追来了，往哪逃？',
        responses: [
          {
            id: 'wall_hole',
            label: '指引沿旧墙洞脱身，直奔山道。',
            systemText: '沿旧墙洞走！别走正门，直奔山道！',
            hostReply: '墙洞……我记得路！',
            next: 'escape_success',
          },
          {
            id: 'follow_xiaqian',
            label: '让他紧跟小倩，别落单。',
            systemText: '紧跟小倩，别落单。她认得出去的路。',
            hostReply: '小倩，带路！',
            next: 'escape_success',
          },
          {
            id: 'hold_urn',
            label: '叮嘱抱紧金匣，符灰路径快走。',
            systemText: '抱紧匣子，沿符灰铺的路快走！',
            hostReply: '我抱着……快！',
            next: 'escape_success',
          },
        ],
      },
      crisis: true,
      tianji: {
        show: true,
        hints: ['正门妖雾最浓。', '山道在墙洞之外。'],
      },
      systemAwakening: false,
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
          '系统任务完成。你悄然离开这具肉身，雨声里再无心声。',
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
