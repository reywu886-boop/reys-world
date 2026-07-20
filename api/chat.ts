/**
 * Vercel Edge Function — /api/chat
 * RAG-powered AI digital avatar for Rey Wu's portfolio.
 *
 * Architecture (single-file for Vercel Edge compatibility):
 *   1. Knowledge base: 28 pre-chunked documents with tags
 *   2. BM25 retrieval: Chinese-aware tokenization + keyword scoring
 *   3. Compact system prompt + top-5 retrieved chunks → Kimi API (streaming)
 */

export const config = { runtime: "edge" };

// ── Types ──────────────────────────────────────────────────────────────────
interface KnowledgeChunk {
  id: string;
  tags: string[];
  content: string;
}

// ── Knowledge Base ─────────────────────────────────────────────────────────
const KB: KnowledgeChunk[] = [
  {
    id: "identity",
    tags: ["吴瑞祺", "rey", "wu", "基本信息", "简介", "who", "name", "introduction", "是谁"],
    content: `吴瑞祺 (Rey Wu)，来自浙江，目前就读于北京电影学院电影学（制片与市场）专业，2023年入学至今，GPA 90.64。同时修读 AI 影像制作微专业，课程涵盖人工智能基础与应用、生成式AI技术、AI影像创作及美学、AI数字角色造型与制作、Python。个人作品集网站：https://rey-wu-portfolio.vercel.app。联系方式：18868497748@163.com。`,
  },
  {
    id: "personality",
    tags: ["性格", "人格", "特点", "personality", "character", "什么样的人", "为人"],
    content: `Rey 自称是一个"贪恋沿途风景的人"——他不只追求成绩，而是把大量精力投入创意活动、领导力和艺术追求。在高中几乎每次文艺活动都是他组织策划的，总能拿一等奖第一名。他在毕业时给未来自己的卡片上写道："你到底成为了商人还是艺术家？"——这反映了他内心长期存在的两个热爱：商科与艺术。他反思性强，对自己的不完美坦诚，被强烈的信念驱动：年轻人应该冒险、探索。`,
  },
  {
    id: "highschool-entry",
    tags: ["高中", "金外", "金华外国语", "中考", "入学", "high school", "一中"],
    content: `2020年进入金华外国语学校，中考567分，距金华一中线差2分。当时觉得买分不体面就选了金外。入学时从一中侧门走过被保安呵斥"你看看这是什么学校的门"，内心充满不甘，暗下决心要证明自己。后来发现金外带给他其他所有高中都不可能给予的校园体验——最小的学校，最丰富的校园生活。`,
  },
  {
    id: "highschool-activities",
    tags: ["活动", "校内活动", "策划", "导演", "开幕式", "一等奖", "新宝岛", "运动会"],
    content: `Rey 第一次以"总导演"身份参与校内活动是校运动会开幕式。他不是小组长也不是班干部，纯属偶然参与，但通过说服老师和班干部（论证"新宝岛"也是中华文化的一部分），最终全权负责节目调度，获得一等奖第一名。此后参加活动一发不可收拾，每次学校文艺活动他都成为最终的leader，成绩一直是一等奖第一名。他的母亲总是在班级群发获奖照片时才后知后觉。`,
  },
  {
    id: "highschool-choice",
    tags: ["艺考", "编导", "选择", "985", "艺术", "理想", "为什么学电影", "为什么"],
    content: `高二时不顾母亲反对参加编导艺考，最后用走统考能上985的分去读了北京电影学院的艺术类专业。在母亲那一辈眼里读艺术专业的都是读书读不来的人才去上的，家门口保安还问他"你们专科是读三年还是四年的"。但他认为自己选择了最适合的道路——北京电影学院制片专业让商科和艺术两个热爱可以并行。`,
  },
  {
    id: "highschool-study",
    tags: ["学习", "早起", "背书", "成绩", "努力", "低谷"],
    content: `每次因参加活动导致成绩下滑时，Rey 会开启"奋起反击"模式。金外冬令时六点半起床，他在成绩低谷期会五点五十起床，一个人蜷缩在一楼大厅背书。他认为参与活动虽然短期影响考试成绩，但长期来看获得的能力和素养能受益终生。`,
  },
  {
    id: "tencent-overview",
    tags: ["腾讯", "tencent", "实习", "工作", "智能创作", "solar", "aigc产品"],
    content: `2025年12月至今在腾讯智能创作平台部 Solar System 担任 AIGC 产品策划。参与 AI 长视频预演产品研发，负责分镜脚本链路迭代、智能体搭建与影视知识库构建，助力AIGC场景落地。同时支撑混元大模型多模态能力建设，通过设计数据标注体系与优化Prompt持续反哺底层模型。`,
  },
  {
    id: "tencent-multiagent",
    tags: ["多智能体", "multi-agent", "rag", "分镜", "storyboard", "质量", "架构"],
    content: `在腾讯针对大模型直出分镜脚本质量低的痛点，设计了 RAG 增强的 Multi-Agent 架构。通过构建导演策略知识库，驱动多角色智能体精准调用专业规范，大幅提升分镜质量与业务可用性。这是 Rey 最核心的技术贡献之一。`,
  },
  {
    id: "tencent-evaluation",
    tags: ["评估", "质检", "精确率", "47%", "84%", "数据飞轮", "agent评价"],
    content: `在腾讯构建了 Agent 初评与专家核查闭环的评估体系。通过精确率分析，将遗漏问题标准化并反哺至 Prompt，持续迭代 Agent 评价体系，质检精确率从47%提升至84%。这体现了 Rey 构建数据飞轮和持续优化系统的能力。`,
  },
  {
    id: "tencent-pipeline",
    tags: ["工作流", "pipeline", "长视频", "连贯性", "关键帧", "vibe coding", "demo"],
    content: `在腾讯针对长视频角色与场景一致性痛点，设计了动态资产提取与前置关键帧辅助的上下文关联机制。运用 Vibe Coding 搭建文本至视频工作流 Demo 验证策略，有效改善画面连贯性，为工程团队功能落地提供产品原型。`,
  },
  {
    id: "tencent-hunyuan",
    tags: ["混元", "hunyuan", "标注", "annotation", "模型", "prompt", "训练"],
    content: `在腾讯支撑混元多模态模型能力建设：制定影视专业标注体系与标准化流程，定义视听语言等核心标注维度；面向标注团队开展培训，标注准确率提升至98%；针对影视创作场景优化 Prompt 工程策略，设计结构化模板与专业引导规则。`,
  },
  {
    id: "alibaba",
    tags: ["阿里", "alibaba", "优酷", "youku", "短剧", "八神", "aigc短剧"],
    content: `2025年8月至10月在阿里大文娱优酷八神工作室担任 AIGC 短剧策划。参与优酷首部 AIGC 短剧项目制作。筛选评估20+ IP（从书旗小说、《科幻世界》），完成剧本改编与结构化优化；运用即梦、Banana等AI工具生成100+场景概念图、人物三视图与分镜参考图，搭建标准化视觉资产体系。`,
  },
  {
    id: "project-previz",
    tags: ["预演", "previz", "长视频", "工作流", "pipeline", "三阶段", "资产库", "项目01"],
    content: `项目01：AI长视频预演工作流。面向AI长视频生产的端到端预演工作流：从IP小说到结构化剧本，再到资产库提取、跨片段关键帧传递与多视频顺序生成。三个阶段：剧本生成、资产生成、视频生成，由 Agent 强化学习双反馈闭环驱动。关键创新：动态资产库、关键帧连贯性注入、RL双反馈闭环。`,
  },
  {
    id: "project-storyboard",
    tags: ["分镜", "storyboard", "多智能体", "导演", "摄影", "剪辑", "艺术总监", "项目02"],
    content: `项目02：AI分镜脚本生成系统。4个专业智能体并行工作：执行导演（场面调度、演员动线、戏剧节奏）、艺术总监（色彩基调、美术设计、服装逻辑）、摄影师（镜头选型、运镜、光影设计）、剪辑师（镜头时长、剪切逻辑、视觉连贯性）。基于导演风格反求的 RAG 策略库，人机协同评估闭环（6维度26项指标）。已在单部影片验证，正联合北京电影学院扩展。`,
  },
  {
    id: "project-storyboard-rag",
    tags: ["导演策略", "rag", "反求", "风格", "知识库", "director", "strategy"],
    content: `AI分镜系统的核心是导演资料策略库：对具有艺术价值的影片进行反求分析——逐镜头分析焦段选择、运镜模式、光影逻辑、剪切时机与空间构图原则，提取画面设计范式，结构化为可 RAG 检索的文档。Rey 的理念是"价值不在于模仿导演的表面风格，而在于理解其底层逻辑：为什么是这个镜头时长、这个焦段、这个剪切点。这种逻辑一旦被提取出来，就变得可执行。"`,
  },
  {
    id: "film-overview",
    tags: ["清白之年", "短片", "电影", "film", "innocence", "120万", "播放量", "项目03"],
    content: `项目03：短片《清白之年》。18分钟原创剧情短片，Rey 担任编剧、导演、制片人、剪辑。全网播放量超120万，Bilibili 单平台超104万，峰值同时在线观看超3000人，单视频涨粉5000+。入围重庆先锋电影节，相关课程《视听语言》获满分评价。`,
  },
  {
    id: "film-synopsis",
    tags: ["清白之年", "剧情", "苏晗", "周宇", "故事", "内容", "讲了什么", "synopsis"],
    content: `《清白之年》讲述苏晗在搬家时发现一个旧U盘，U盘里的视频将她带回2017年的高中时光。17岁的苏晗暗恋班里才华横溢的周宇，偷偷拍他的照片藏在U盘深层嵌套的文件夹里（伪装为"学习资料"）。因父母工作原因即将转学去新疆，她在最后的日子里经历着离别的苦涩——收档案袋、写同学录、还有对从未表白过的暗恋对象的无声心痛。影片捕捉了青春的普遍体验：未说出口的感情、离别的痛苦、和多年后依然萦绕的怀念。`,
  },
  {
    id: "film-creation",
    tags: ["创作", "拍摄", "过程", "导演", "创作过程", "灵感", "原型", "creation"],
    content: `《清白之年》的故事源自 Rey 真实的高中经历——一个女生把暗恋对象的照片藏在U盘深层文件夹里。核心戏剧场景——清晨偷偷到学校从电脑拷贝视频到U盘——基于真实事件改编。Rey 在这部作品上下了个人赌注：如果事实证明自己没有导演才华，就放下创作欲望一心学商科。他花了近一个学期的时间，看了大量青春片做研究，散步数小时构思剧情。`,
  },
  {
    id: "film-production",
    tags: ["拍摄困难", "制作", "困难", "教室", "灯光", "challenge", "production"],
    content: `《清白之年》拍摄面临重重困难：原定灯光离组、开拍前一周原定家景无法使用、拍摄第二天早上六点半才被告知教室不能用需要临时换景重新定分镜。但神奇的是，一旦按下开机键就再也没有意外——在临时找到的教室里拍出了比原定场景更惊艳的镜头。看到第一版粗剪配上《那些花儿》BGM时，Rey 眼泪掉了下来——"这应该是每一个导演最幸福的时刻了"。`,
  },
  {
    id: "film-reflection",
    tags: ["反思", "成长", "视听语言", "实践", "感悟", "reflection"],
    content: `拍完《清白之年》后回到课堂，Rey 发现老师的课变得更加生动了——不是老师变了，而是他在经历完整创作后对电影创作手法有了更深入的体会。"那些本来浮于PPT的文字、流于电影历史的理论，仿佛顷刻间成为了我手上影像创作的工具。"这是他少有的直观感受到"实践是检验真理的唯一标准"的经历。他说："我爱这艰难又拼尽全力的每一天，我会怀念所有的这些曲折。"`,
  },
  {
    id: "paradigm-revolution",
    tags: ["范式革命", "paradigm", "思考", "框架", "理论", "思想", "行业分析"],
    content: `Rey 开发了一个"电影范式革命"的演讲框架，展示了他对技术与电影交叉领域的系统性思考。他分析了历次工业革命（蒸汽→电气→信息→智能）如何创造和摧毁影视行业的岗位。他认为当前AI革命的独特之处在于它直接影响创意流程，而非仅仅影响分发或生产后勤。`,
  },
  {
    id: "paradigm-old-new",
    tags: ["旧范式", "路径依赖", "新范式", "变革", "判断", "信号"],
    content: `Rey 的范式分析框架：旧范式和路径依赖不一定是坏的——它们降低不确定性成本、维系社会稳定。但当一个领域出现以下信号时，说明它在走下坡路：机会高度依赖人脉而非能力、决策权高度集中、酒桌文化和灰色交易泛滥。他用这个框架评估行业是在增长还是停滞，对于一个20岁的年轻人来说，这种分析成熟度非常罕见。`,
  },
  {
    id: "skills-film",
    tags: ["技能", "能力", "影视", "达芬奇", "pr", "剪映", "阅片量", "skills", "film"],
    content: `影视全流程能力：具备从制片、导演到剪辑的完整创作能力，熟练掌握达芬奇、Premiere Pro、剪映等工具。阅片量过1000，具备扎实视听语言功底与审美判断力。`,
  },
  {
    id: "skills-ai",
    tags: ["技能", "ai", "产品", "midjourney", "可灵", "即梦", "vibe coding", "skills"],
    content: `AI产品与技术能力：持续追踪AIGC前沿，实践 Midjourney、可灵、即梦、Banana 等多模态生成工具，掌握AI内容全流程创作能力。擅长用 Vibe Coding 将创意转化为 Demo，实现效果验证与迭代。掌握 Multi-Agent 架构、RAG 管线、评估闭环、Prompt Engineering。`,
  },
  {
    id: "skills-vision",
    tags: ["愿景", "理想", "未来", "职业", "vision", "career", "目标"],
    content: `Rey 保持对AI技术与文娱融合的高度敏感，长期追踪全球AIGC动态。致力于将影视专业积淀与AI技术结合，探索智能创作的边界与可能性。他在19岁时写道："我才十九岁啊，我有时间、有精力也有容错机会去奋斗，岂能为自己的人生悲歌？我愿意相信我能够驰骋自己的想象，肩负青年的责任，承担讲好中国故事的义务。"`,
  },
  {
    id: "contact",
    tags: ["联系", "邮箱", "合作", "contact", "email", "collaborate"],
    content: `联系方式：邮箱 18868497748@163.com，电话 18868497748。开放合作方向：AI内容项目、创意技术合作、产品与叙事实验。`,
  },
  {
    id: "media-jinhua",
    tags: ["报道", "金华日报", "媒体", "采访", "media", "article", "coverage", "新闻"],
    content: `《金华日报》对 Rey（吴瑞祺）进行了专题报道，详细介绍了这位来自金华的北京电影学院学生和他的短片《清白之年》的创作故事。报道重点提及了创作成绩：视听语言课程满分评价、入围重庆先锋电影节、B站播放量突破百万。这篇来自家乡权威媒体的报道展示了 Rey 在影视创作方面的突出表现，也证明了制片专业学生同样可以具备出色的导演创作素养。`,
  },
];

// ── BM25 Search ────────────────────────────────────────────────────────────
function tokenize(text: string): string[] {
  const tokens: string[] = [];
  const regex = /[\u4e00-\u9fff\u3400-\u4dbf]|[a-zA-Z0-9]+/g;
  let m;
  while ((m = regex.exec(text.toLowerCase())) !== null) tokens.push(m[0]);
  return tokens;
}

const docCount = KB.length;
const dfMap = new Map<string, number>();
for (const c of KB) {
  const uniq = new Set(tokenize(c.tags.join(" ") + " " + c.content));
  for (const t of uniq) dfMap.set(t, (dfMap.get(t) || 0) + 1);
}

function retrieve(query: string, topK = 5) {
  const qt = tokenize(query);
  const avgDl = KB.reduce((s, c) => s + tokenize(c.content).length, 0) / docCount;

  const scored = KB.map(chunk => {
    const ct = tokenize(chunk.content);
    const tt = tokenize(chunk.tags.join(" "));
    let score = 0;
    for (const q of qt) {
      const tf = ct.filter(t => t === q).length + tt.filter(t => t === q).length * 3;
      if (!tf) continue;
      const df = dfMap.get(q) || 0;
      const idf = Math.log((docCount - df + 0.5) / (df + 0.5) + 1);
      score += idf * ((tf * 2.5) / (tf + 1.5 * (1 - 0.75 + 0.75 * (ct.length / avgDl))));
    }
    return { chunk, score };
  });

  return scored.sort((a, b) => b.score - a.score).filter(s => s.score > 0).slice(0, topK).map(s => s.chunk);
}

// ── System Prompt ──────────────────────────────────────────────────────────
const SYS_BASE = `You are the AI digital avatar on Rey Wu (吴瑞祺)'s personal portfolio website.

## Your role
- You represent Rey — answer as if you deeply understand his personality, thoughts, creative philosophy, and professional journey
- Be warm, insightful, and authentic
- Use the same language the user writes in (Chinese → Chinese, English → English)
- Default to concise responses (2-4 sentences), but expand when discussing creative philosophy or personal stories

## Rules
- ONLY use the [Retrieved Context] below to answer. Do NOT fabricate information
- If the context doesn't cover the question, say "这方面的信息我暂时不太了解，你可以直接联系 Rey：18868497748@163.com"
- You represent Rey but are NOT Rey himself — use third person`;

// ── Rate Limiter ───────────────────────────────────────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();

function limited(ip: string) {
  const now = Date.now();
  const e = rateMap.get(ip);
  if (!e || now > e.resetAt) { rateMap.set(ip, { count: 1, resetAt: now + 60000 }); return false; }
  return ++e.count > 10;
}

// ── Handler ────────────────────────────────────────────────────────────────
export default async function handler(req: Request) {
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip))
    return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), { status: 429, headers: { "Content-Type": "application/json" } });

  let body: { messages?: Array<{ role: string; content: string }> };
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const msgs = body.messages;
  if (!Array.isArray(msgs) || !msgs.length)
    return new Response(JSON.stringify({ error: "messages required" }), { status: 400, headers: { "Content-Type": "application/json" } });

  const trimmed = msgs.slice(-10);
  const apiKey = process.env.KIMI_API_KEY;
  if (!apiKey)
    return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500, headers: { "Content-Type": "application/json" } });

  // RAG retrieval
  const userMsgs = trimmed.filter(m => m.role === "user");
  const q = userMsgs.slice(-2).map(m => m.content).join(" ");
  const chunks = retrieve(q, 5);
  const ctx = chunks.length ? chunks.map(c => `[${c.id}]\n${c.content}`).join("\n\n") : "No specific context found.";

  const upstream = await fetch("https://api.moonshot.cn/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "moonshot-v1-8k",
      messages: [{ role: "system", content: `${SYS_BASE}\n\n## [Retrieved Context]\n${ctx}` }, ...trimmed],
      stream: true, temperature: 0.7, max_tokens: 1024,
    }),
  });

  if (!upstream.ok) {
    const err = await upstream.text().catch(() => "");
    return new Response(JSON.stringify({ error: "AI service error", detail: err }), { status: upstream.status, headers: { "Content-Type": "application/json" } });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}
