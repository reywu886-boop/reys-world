// 公共组件渲染：顶栏、左侧栏、角色权限

// ===== 角色权限系统 =====
// 3 角色：annotator(标注员) | qc(质检员) | pm_member(产品成员，最高决策)
// demo 模式下从 localStorage 读，方便切换角色预览
const ROLE_LABELS = {
  annotator: '标注员',
  qc: '质检员',
  pm_member: '产品成员',
};
const ROLE_COLORS = {
  annotator: '#86909C',
  qc: '#FF7D00',
  pm_member: '#A855F7',
};

// 角色对三档侧栏的访问权限
const ROLE_ACCESS = {
  annotator: { board: true, lab: false, pm: false },
  qc: { board: true, lab: true, pm: false },
  pm_member: { board: true, lab: true, pm: true },
};

function getCurrentRole() {
  let r = localStorage.getItem('rl_role') || 'pm_member';
  // 兼容旧 pm_owner 数据
  if (r === 'pm_owner') r = 'pm_member';
  return r;
}
function setCurrentRole(role) {
  localStorage.setItem('rl_role', role);
  location.reload();
}
function canAccess(side) {
  return ROLE_ACCESS[getCurrentRole()]?.[side] || false;
}
function getRoleLabel() {
  return ROLE_LABELS[getCurrentRole()] || '未知';
}
function getRoleColor() {
  return ROLE_COLORS[getCurrentRole()] || '#86909C';
}

const ICONS = {
  home: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
  project: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>',
  doc: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  upload: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>',
  check: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  setting: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  report: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  list: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>',
  user: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
  bell: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>',
  back: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>',
  plus: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>',
  search: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
  download: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>',
  link: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>',
  dedupe: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>',
  board: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z"/></svg>',
  lock: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>',
};

function renderTopbar(crumb) {
  const crumbHtml = crumb ? `
    <div class="rl-crumb">
      ${crumb.map((c, i) => {
        if (i === crumb.length - 1) return `<span class="current">${c.label}</span>`;
        return `<a href="${c.href}">${c.label}</a><span class="sep">/</span>`;
      }).join('')}
    </div>
  ` : '';
  const role = getCurrentRole();
  return `
    <div class="rl-topbar">
      <a href="home.html" class="rl-logo">
        <div class="rl-logo-mark">RL</div>
        <span>RuleLoop</span>
      </a>
      ${crumbHtml}
      <div style="flex:1"></div>
      <div style="display:flex;align-items:center;gap:14px;">
        <!-- Demo 角色切换器 -->
        <div class="rl-role-switcher" style="display:flex;align-items:center;gap:6px;padding:4px 10px;background:#FFF7E6;border:1px dashed #FFB84D;border-radius:6px;">
          <span style="font-size:11px;color:#8B5A00;">demo 角色：</span>
          <select id="role-switcher" style="font-size:12px;border:0;background:transparent;color:${getRoleColor()};font-weight:600;cursor:pointer;outline:none;">
            <option value="annotator" ${role==='annotator'?'selected':''}>标注员</option>
            <option value="qc" ${role==='qc'?'selected':''}>质检员</option>
            <option value="pm_member" ${role==='pm_member'?'selected':''}>产品成员</option>
          </select>
        </div>
        <button class="rl-btn rl-btn-ghost" title="通知" style="padding:6px;position:relative;">
          <span style="width:18px;height:18px;display:inline-block;color:var(--rl-text-2)">${ICONS.bell}</span>
          <span style="position:absolute;top:4px;right:4px;width:8px;height:8px;background:var(--rl-danger);border-radius:50%;border:2px solid #fff;"></span>
        </button>
        <div style="display:flex;align-items:center;gap:8px;" title="${getRoleLabel()}">
          <div class="rl-avatar" style="background:linear-gradient(135deg,${getRoleColor()},#5B8DFF);">R</div>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <span style="font-size:13px;color:var(--rl-text-2);">Reymind</span>
            <span style="font-size:10px;color:${getRoleColor()};font-weight:500;">${getRoleLabel()}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 项目侧栏（三档：看板 / 质检侧 / 产品侧，根据角色禁用）
 * side: 'board' | 'lab' | 'pm'
 * active: 当前选中项 key
 */
function renderProjectSidebar(projectName, side, active) {
  // 防御：访问无权限页面时，自动重定向到角色最高权限页
  if (!canAccess(side)) {
    if (canAccess('lab')) {
      location.replace('lab-upload.html');
    } else if (canAccess('board')) {
      location.replace('board-today.html');
    }
    return '';
  }

  const pmItems = [
    { key: 'overview', label: '项目概览', icon: 'home', href: 'project-overview.html' },
    { key: 'docs', label: '规则文档', icon: 'doc', href: 'restricted.html' },
    { key: 'decisions', label: '决策面板', icon: 'check', href: 'pm-decisions.html' },
    { key: 'dedupe', label: '案例审查', icon: 'dedupe', href: 'pm-dedupe.html' },
    { key: 'reports', label: '日报中心', icon: 'report', href: 'pm-reports.html' },
    { key: 'settings', label: '项目设置', icon: 'setting', href: 'pm-settings.html' },
  ];
  const labItems = [
    { key: 'upload', label: '提交案例', icon: 'upload', href: 'lab-upload.html' },
    { key: 'mine', label: '我的提交', icon: 'list', href: 'lab-mine.html' },
    { key: 'task', label: '标注工作台', icon: 'board', href: 'annotator-task.html' },
    { key: 'pool', label: '案例池', icon: 'list', href: 'case-pool.html' },
    { key: 'qa', label: '答疑看板', icon: 'user', href: 'qa-console.html' },
    { key: 'rules', label: '已通过细则', icon: 'doc', href: 'restricted.html' },
  ];
  const boardItems = [
    { key: 'today', label: '今日更新', icon: 'board', href: 'board-today.html' },
    { key: 'docs', label: '规则文档', icon: 'doc', href: 'restricted.html' },
    { key: 'history', label: '历史更新', icon: 'list', href: 'board-history.html' },
  ];

  const items = side === 'pm' ? pmItems : (side === 'lab' ? labItems : boardItems);
  const sectionTitle = side === 'pm' ? '产品侧工作台' : (side === 'lab' ? '质检侧工作台' : '标注员看板');

  // 三档切换器（根据权限禁用）
  const tabs = [
    { id: 'board', label: '标注', href: 'board-today.html' },
    { id: 'lab', label: '质检', href: 'lab-upload.html' },
    { id: 'pm', label: '产品', href: 'project-overview.html' },
  ];

  const tabsHtml = tabs.map(t => {
    const allowed = canAccess(t.id);
    const isActive = side === t.id;
    if (allowed) {
      return `<a href="${t.href}" class="${isActive?'active':''}" style="flex:1;padding:6px 4px;font-size:12px;text-align:center;">${t.label}</a>`;
    } else {
      return `<a href="javascript:void(0)" class="disabled" style="flex:1;padding:6px 4px;font-size:12px;text-align:center;color:#C9CDD4;cursor:not-allowed;opacity:.5;" title="当前角色「${getRoleLabel()}」无权访问此模块">${t.label}</a>`;
    }
  }).join('');

  return `
    <div class="rl-sidebar">
      <div style="padding:16px;border-bottom:1px solid var(--rl-border);margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#1E5EFF,#5B8DFF);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;flex-shrink:0;">视</div>
          <div style="flex:1;min-width:0;" class="label-text">
            <div style="font-size:14px;font-weight:500;color:var(--rl-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${projectName}</div>
            <a href="projects.html" style="font-size:12px;color:var(--rl-text-3);text-decoration:none;">切换项目</a>
          </div>
        </div>
        <!-- 三档切换 -->
        <div style="margin-top:12px;" class="label-text">
          <div class="rl-side-switch" style="width:100%;display:flex;">
            ${tabsHtml}
          </div>
          <div style="margin-top:6px;font-size:11px;color:var(--rl-text-3);text-align:center;display:flex;align-items:center;justify-content:center;gap:4px;">当前角色：<span style="color:${getRoleColor()};font-weight:500;">${getRoleLabel()}</span>
            <span style="font-size:10px;opacity:.6;" title="不同角色看到的菜单不同">ⓘ</span>
          </div>
        </div>
      </div>
      <div class="rl-sidebar-section">${sectionTitle}</div>
      ${items.map(it => {
        return `<a href="${it.href}" class="rl-sidebar-item ${active===it.key?'active':''}" title="${it.label}">
          ${ICONS[it.icon]}<span>${it.label}</span>
        </a>`;
      }).join('')}
    </div>
  `;
}

function renderGlobalSidebar(active) {
  const items = [
    { key: 'home', label: '首页', icon: 'home', href: 'home.html' },
    { key: 'projects', label: '项目库', icon: 'project', href: 'projects.html' },
  ];
  return `
    <div class="rl-sidebar">
      <div class="rl-sidebar-section">导航</div>
      ${items.map(it => `
        <a href="${it.href}" class="rl-sidebar-item ${active===it.key?'active':''}" title="${it.label}">
          ${ICONS[it.icon]}
          <span>${it.label}</span>
        </a>
      `).join('')}
    </div>
  `;
}

// 标注台 / 答疑台：延用源码工程 LabelShell 的左侧导航结构。
function renderLabelDemoSidebar(role, active) {
  const isQc = role === 'qc';
  const items = isQc ? [
    { key: 'qa', label: '待我答疑', href: 'qa-console.html' },
    { key: 'pool', label: '案例池', href: 'case-pool.html' },
    { key: 'review', label: '案例提交', href: 'lab-upload.html' },
  ] : [
    { key: 'tasks', label: '我的任务', href: 'annotator-task.html' },
    { key: 'desk', label: '标注工作台', href: 'annotator-task.html' },
    { key: 'pool', label: '案例池', href: 'case-pool.html' },
  ];
  return `<div class="rl-sidebar" style="display:flex;flex-direction:column;">
    <div style="height:48px;padding:0 12px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--rl-border);margin-bottom:8px;">
      <span style="width:24px;height:24px;border-radius:5px;background:${isQc ? '#FF7D00' : '#86909C'};color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;">${isQc ? '质' : '标'}</span>
      <span style="font-size:13px;font-weight:500;">视频基础质量分级</span>
    </div>
    <div class="rl-sidebar-section">${isQc ? '质检工作台' : '个人工作台'}</div>
    ${items.map(it => `<a href="${it.href}" class="rl-sidebar-item ${active === it.key ? 'active' : ''}"><span>${it.label}</span></a>`).join('')}
    <div style="margin-top:auto;padding:12px;border-top:1px solid var(--rl-border);display:flex;align-items:center;gap:8px;">
      <span style="width:24px;height:24px;border-radius:50%;background:${isQc ? '#FF7D00' : '#86909C'};color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;">${isQc ? '质' : '标'}</span>
      <span style="font-size:12px;">${isQc ? '质检员' : '标注员'}</span>
    </div>
  </div>`;
}

function renderSimBar(score) {
  const cls = score >= 0.85 ? 'rl-sim-high' : score >= 0.7 ? 'rl-sim-mid' : 'rl-sim-low';
  return `<span class="rl-sim-bar"><span class="rl-sim-bar-fill ${cls}" style="width:${Math.round(score*100)}%"></span></span> <span style="font-size:12px;color:var(--rl-text-2);font-variant-numeric:tabular-nums;">${(score*100).toFixed(0)}%</span>`;
}

// 角色切换器事件（顶栏渲染后绑定）
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'role-switcher') {
    setCurrentRole(e.target.value);
  }
});
