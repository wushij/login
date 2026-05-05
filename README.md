# Login Vue3

基于 **Vue 3** 与 **Vite** 的单页登录演示：左侧为几何卡通角色（眼球跟随鼠标、眨眼、互看、偷看等），右侧为玻璃态登录表单，支持**浅色 / 深色**主题与**中文 / 英文**界面切换。登录逻辑为前端模拟，便于本地体验动效与表单流程。

---

## 演示账号（模拟登录）

当前版本在 `src/views/LoginPage.vue` 的 `handleSubmit` 中写死校验逻辑，**仅用于演示**，请勿用于真实业务环境。

| 项目 | 值 |
| --- | --- |
| **账号（用户名）** | `admin` |
| **密码** | `admin123` |

- **登录成功**：浏览器会弹出 `alert` 提示成功文案（中英文随当前语言切换）。
- **登录失败**：表单下方显示红色错误提示（账号或密码错误），控制台会输出失败日志。
- **加载状态**：提交后约有 **300ms** 的模拟网络延迟，按钮进入「登录中…」状态并禁用重复提交。

> 修改演示账号：在 `LoginPage.vue` 中搜索 `admin` 与 `admin123`，按你的需求改为常量或接入真实接口。

---

## 功能概览

### 卡通角色与动效

- **四个角色**：紫色高矩形、黑色高矩形、橙色半圆、黄色圆角矩形，分层叠放。
- **鼠标追踪**：瞳孔根据全局 `mousemove` 计算偏移，在允许范围内移动。
- **眨眼**：紫色与黑色角色使用 `EyeBall`，随机约 **3～7 秒** 眨眼一次。
- **输入用户名时**：通过 `isTyping` 等状态驱动身体与面部位置变化；聚焦时另有「互看」短时动画。
- **密码与显示密码**：输入密码且点击「显示密码」后，紫色角色有「偷看」循环动画；其他角色视线也会配合调整。
- **身体倾斜**：各角色根据鼠标相对自身位置的 `bodySkew` 等做轻微倾斜。

### 主题

- **浅色 / 深色**两套配色，使用 **HSL CSS 变量**（与 Tailwind 中 `hsl(var(--xxx))` 对齐）。
- 选择结果写入 **`localStorage` 的 `theme` 键**（值为 `light` 或 `dark`）。
- **`index.html` 内联脚本**：在首屏渲染前读取 `localStorage` 并设置 `data-theme` 与变量，减轻主题闪烁。
- **`src/main.js`**：应用挂载后约 **700ms** 再给根节点加上 `theme-transition` 类，避免与入场动画叠加产生「双重过渡」。

### 国际化

- 中英文文案集中在 `LoginPage.vue` 的 `translations` 对象中，通过按钮切换 `zh` / `en`。
- 切换语言按钮上的文字为「English」/「中文」，表示点击后将切换到的目标语言。

### 界面其它元素

- **星尘背景**：左侧区域包含多颗闪烁星与漂浮粒子（CSS 动画）。
- **玻璃态卡片**：登录区域使用 `glass` / `glass-dark` 等类名（定义在 `src/assets/main.css`）。
- **响应式**：大屏为左右分栏；小屏隐藏左侧角色区，保留顶部 Logo 与表单区域。

---

## 技术栈

| 技术 | 说明 |
| --- | --- |
| **Vue 3** | Composition API、`<script setup>` |
| **Vite 5** | 开发与生产构建 |
| **Tailwind CSS 3** | 工具类布局与配色扩展（`tailwind.config.js`） |
| **PostCSS + Autoprefixer** | CSS 处理管道 |
| **CSS 自定义属性** | 主题色与语义色变量 |

运行时**无** Vue Router、Pinia、HTTP 客户端等依赖；若需对接后端，可自行引入并替换 `handleSubmit` 中的模拟逻辑。

---

## 环境要求

- **Node.js**：建议使用当前 LTS 版本（如 18+ 或 20+）。
- **包管理**：项目使用 **npm**（根目录含 `package-lock.json`）。

---

## 快速开始

```bash
# 进入项目目录后安装依赖
npm install

# 启动开发服务器（默认一般为 http://localhost:5173 ，以终端输出为准）
npm run dev

# 生产构建
npm run build

# 本地预览构建结果（先 build）
npm run preview
```

安装完成后，在浏览器打开开发地址，使用上表中的 **admin / admin123** 即可体验成功登录流程；任意其它组合可看到失败提示。

---

## 项目结构

```
login-vue3/
├── index.html                 # HTML 入口；内联主题脚本，减轻首屏闪烁
├── vite.config.js             # Vite 配置（含 `@` → `src` 别名）
├── postcss.config.js          # PostCSS
├── tailwind.config.js         # Tailwind 内容与主题色扩展
├── package.json
└── src/
    ├── main.js                # 创建应用、挂载、`theme-transition` 延迟启用
    ├── App.vue                # 根组件，仅渲染 LoginPage
    ├── assets/
    │   └── main.css           # 全局样式、动画、玻璃态、主题过渡等
    ├── components/
    │   ├── EyeBall.vue        # 带眼白的眼睛（含眨眼高度变化）
    │   ├── Pupil.vue          # 仅瞳孔（橙/黄角色使用）
    │   ├── Icons.vue          # SVG 图标组件
    │   └── icons.js           # 图标导出（User、Lock、Sun、Moon 等）
    ├── utils/
    │   └── theme.js           # 主题定义、读取、写入、切换、applyTheme
    └── views/
        └── LoginPage.vue      # 主页面：角色、粒子、表单、模拟登录与文案
```

---

## 开发与定制提示

- **改品牌文案**：搜索 `YourBrand`、`欢迎回来` 等，或集中调整 `translations`。
- **改主题色**：需同时关注 `src/utils/theme.js` 与 `index.html` 内联主题中的 HSL 数值，保持一致可避免首屏与运行时不一致。
- **路径别名**：在源码中可使用 `@/` 指向 `src`（以 `vite.config.js` 为准）。

---

## 构建与部署

```bash
npm run build
```

产物输出到 **`dist/`** 目录，为静态文件，可部署到任意静态托管（Nginx、OSS、Netlify、Vercel 等）。部署后仍为**纯前端模拟登录**，不会自动生成真实会话；若需鉴权，请在后端实现并改为调用你的登录 API。
