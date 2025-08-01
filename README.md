# North Admin Pro

一个现代化的后台管理系统模板，基于 Vue 3 + TypeScript + Element Plus。

## 特性

-   🚀 **最新技术栈**：使用 Vue 3、Vite、TypeScript 等前沿技术- 📦 **开箱即用**：内置权限管理、动态路由、多标签页等功能
-   🎨 **主题定制**：支持主题切换、暗黑模式- 🔐 **权限控制**：完善的权限管理方案
-   📱 **响应式设计**：适配不同屏幕尺寸- 🎯 **标准化**：统一的代码规范和开发流程

## 快速开始

> 需要 nodejs 22+

```bash
# 克隆项目
git clone https://github.com/your-username/north-admin-pro.git
```

```bash
# 安装依赖
pnpm install
```

```bash
# 启动开发服务器
pnpm dev
```

## 目录结构

```
.                           # 项目根目录
├── .vscode                 # VS Code编辑器配置目录（包含工作区设置、插件配置等）
├── build                   # 构建相关脚本或输出目录（通常存放打包或构建工具配置）
├── dist                    # 项目打包输出目录（生产环境构建后的静态文件）
├── node_modules            # 项目依赖包目录（npm/pnpm安装的第三方库）
├── public                  # 静态资源目录（不会被构建工具处理的文件，如favicon、robots.txt等）
├── src                     # 源代码主目录
│   ├── api                 # API请求相关代码（接口定义、请求封装、后端交互逻辑）
│   ├── assets              # 前端资源（图片、字体、全局样式等，会被构建工具处理）
│   ├── components          # 可复用组件目录（公共UI组件、业务组件）
│   ├── hooks               # 自定义Hooks目录（封装可复用的状态逻辑）
│   ├── layouts             # 布局组件目录（页面布局结构，如Header、Footer、Sidebar组合）
│   ├── pages               # 页面组件目录（路由对应的页面）
│   ├── router              # 路由配置目录（路由规则定义、路由守卫等）
│   ├── store               # 状态管理目录（Vuex/Pinia状态存储）
│   ├── styles              # 样式文件目录（全局样式、变量、主题配置）
│   ├── typings             # TypeScript类型定义目录（类型声明文件*.d.ts）
│   ├── utils               # 工具函数目录（通用工具、格式化、验证等函数）
│   ├── App.vue             # 根组件（应用入口组件）
│   └── main.ts             # 入口文件（初始化Vue实例、加载全局资源）
├── .editorconfig           # 编辑器配置文件（统一不同编辑器的代码格式）
├── .env.development        # 开发环境环境变量配置
├── .env.local              # 本地环境变量配置（通常.gitignore忽略，不提交到仓库）
├── .env.production         # 生产环境环境变量配置
├── .eslintrc-auto-import.json # ESLint自动导入配置（通常由工具自动生成）
├── .gitignore              # Git忽略文件配置（指定不提交到版本库的文件/目录）
├── .npmrc                  # npm/pnpm配置文件（设置镜像源、依赖安装策略等）
├── index.html              # HTML入口文件（应用的基础HTML模板）
├── LICENSE                 # 项目许可证文件
├── package.json            # 项目配置文件（依赖列表、脚本命令等）
├── pnpm-lock.yaml          # pnpm依赖锁定文件（精确记录依赖版本）
├── README.md               # 项目说明文档（项目介绍、启动方式、注意事项等）
├── tsconfig.app.json       # TypeScript应用编译配置
├── tsconfig.json           # TypeScript基础配置
├── tsconfig.node.json      # TypeScript Node环境编译配置
└── vite.config.ts          # Vite构建工具配置文件
```

## 技术栈

-   Vue 3
-   TypeScript
-   Vite
-   Element Plus
-   Pinia
-   Vue Router
-   SCSS
