# Rey's World Portfolio — 下一聊天交接

更新时间：2026-07-19  
工作原则：只在本地修改，尚未提交或推送到 GitHub。继续坚持“增质而非推倒重做”，但允许对交互结构进行有依据的大幅升级。

## 1. 项目位置与启动

当前本地工程：

`C:\Users\18868\Documents\Codex\2026-07-18\new-chat-3\work\rey-wu-portfolio-local-v2`

Windows PowerShell 启动：

```powershell
cd "C:\Users\18868\Documents\Codex\2026-07-18\new-chat-3\work\rey-wu-portfolio-local-v2"
& "C:\Program Files\nodejs\npm.cmd" run dev
```

访问：`http://localhost:3000/#home`

当前机器上 `pnpm` 不在 PATH，因此使用上面的 npm 命令。若从交接压缩包解压到新位置，需要先执行 `npm install`，因为压缩包不包含 `node_modules`。

## 2. 项目目标与设计主线

- 网站是 Rey Wu 的个人作品集，核心世界观为临海工作室 “Rey's World”。
- 摄影机、REC、取景框、胶片门、换卷、监视器、剪辑台不是表面装饰，而应成为贯穿 Home、About、Projects、Film、Experiments、Contact 的叙事和交互语法。
- 用户明确反对“只是纵向白底 PPT”“把概念说成已实现”“假互动”。所有交互都应真实可操作，并在浏览器中亲自验证后才能汇报完成。
- 页面需要作者性、电影感和空间层次；不同栏目可以采用横向切入、缩放、擦片、换卷、局部全屏等不同镜头语言，避免同质化。

## 3. 当前已实现内容

### Hero / Home

- 全屏临海工作室构图与 “Rey's World” 主视觉。
- 多天气与昼夜素材、REC/取景框、热点索引、胶片门进入逻辑及回放式返回逻辑。
- 工作室物件热点连接 About、Projects、Film、Experiments、Contact。
- 多个连续性与转场组件已接入，相关文件见下方。

### Projects：Living Editing Desk

Projects 已从重复的项目纵向列表改造成真正可操作的“活的剪辑工作台”：

- 顶部和底部保留工作室影像，通过遮罩建立从 Hero 到工作台、再到 Film 的空间承接。
- 桌面结构包括素材箱、Program Monitor、Inspector、三轨时间线与可拖动播放头。
- PLAY / PAUSE 会真实推进时间码、播放头与电平表，不是静态装饰。
- 三个项目拥有不同的视觉语法：
  1. Long-form Pre-viz：连续性节点与镜头序列。
  2. Storyboard System：分镜网格。
  3. Model Data Strategy：数据扫描与标签连接。
- 素材卡 hover / focus 会泄露三张关联素材；支持键盘方向键切换 Take、空格播放暂停。
- 桌面端滚轮采用“一个连续手势最多切换一个 Take”的保护逻辑，避免误触；到 Take 03 后需新的滚轮手势才会离开工作台。
- 移动端使用独立布局，不捕获桌面滚轮，项目通过标签切换。
- Film bridge 可从 Projects 底部进入 Film，并触发换卷转场。
- `The Year of Innocence` 已从 Projects 移除，完整归入 Film。
- 新增 `/projects/model-data-strategy` 详情页与路由。

## 4. 关键文件

- `client/src/components/sections/HeroSection.tsx`
- `client/src/components/sections/ProjectsSection.tsx`
- `client/src/components/sections/AboutSection.tsx`
- `client/src/components/sections/FilmSection.tsx`
- `client/src/components/sections/ExperimentsSection.tsx`
- `client/src/components/sections/ContactSection.tsx`
- `client/src/pages/ModelDataStrategy.tsx`
- `client/src/App.tsx`
- `client/src/index.css`
- `client/src/components/FilmGateTransition.tsx`
- `client/src/components/UnitReelTransition.tsx`
- `client/src/components/ShotReelTransition.tsx`
- `client/src/components/SectionPassageOverlay.tsx`
- `client/src/components/StudioRollRail.tsx`
- `client/src/components/RewindToStudio.tsx`
- `client/src/components/StudioContinuityLayer.tsx`
- `client/src/components/FilmContinuityOverlay.tsx`
- `client/src/components/WeatherContinuity.tsx`
- 视觉资产集中在 `client/public/` 与 `client/public/media/`。

## 5. 已验证状态

- `npm run check` 已通过。
- `npm run build` 已通过。
- 已在浏览器测试 Projects：项目切换、素材浮现、播放暂停、时间线推进、滚轮手势保护、Film bridge、移动端切换均可用。
- 构建仍有两个非阻塞提醒：Analytics 环境变量未定义；主 bundle 超过 500 kB。
- 浏览器控制台曾出现 Bilibili 第三方指纹上报提示，不是本地页面错误。

## 6. 下一阶段建议

1. 先从真实浏览器再次审看 Projects 的视觉节奏、信息密度和滚轮手感，再做微调，不要只看代码判断。
2. 将 Projects 已建立的空间化、可操作标准继续应用到：
   - Film：局部全屏放映厅、监视器擦片与镜头编号。
   - Experiments：测试舱与实验日志操作台。
   - Contact：临海门厅、门外光与合作讯号。
3. 继续让栏目间拥有不同镜头语言，避免每一页都只是向上滚动。
4. 对所有 Hero 天气视频逐一检查：建筑、门和机位必须固定；水波、云、雨、玻璃水滴、植物和微光应自然运动；排除形变、幻觉、硬切和明显循环回跳。
5. 最后再处理 bundle 拆分和 Analytics 配置，不应先于体验设计。

## 7. 给下一位 Codex 的执行要求

- 前端设计与改造使用 `design-taste-frontend` skill，并完整遵循其审计和验证流程。
- 使用应用内浏览器实测桌面端与移动端的真实交互。
- 未经验证的构想必须明确标为建议，不能写成“已完成”。
- 不要改动 GitHub；除非用户在新聊天中重新明确授权。
- 保留用户现有未提交文件与视觉资产，不要清理或重置工作树。
