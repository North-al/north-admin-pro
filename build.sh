#!/bin/bash


# 比如在 Jenkinsfile 中：environment { PROJECT_NAME = "my-vue-app" }
# 1. 定义变量
# ====================================================

# 你的项目名称，用于生成 Nginx 配置文件名和部署路径

SERVER_NAME="localhost" # 你可以根据实际情况修改为你的域名或 IP 地址

# Jenkins 环境变量，如果未提供则使用默认值
PROJECT_NAME="north-admin-pro"

# 你的项目在服务器上部署的根目录（Nginx root 指向的目录）
DEPLOY_ROOT_PATH="/var/www/html/${PROJECT_NAME}"

# Nginx 配置文件存放目录 (dnf 安装 Nginx 的默认目录)
NGINX_CONF_D_DIR="/etc/nginx/conf.d"

# Nginx 可执行文件路径 (dnf 安装 Nginx 的默认路径)
NGINX_SBIN="/usr/sbin/nginx"

# 期望的 Nginx 最低版本号，用于判断是否需要安装 (你可以根据需要调整)
EXPECTED_NGINX_VERSION="1.18.0" # CentOS/RHEL 8 默认 Nginx 版本通常 >= 1.14


# 检查命令是否存在
command_exists () {
    command -v "$1" &> /dev/null
}

# 比较版本号
# usage: version_gt "v1" "v2" - returns 0 if v1 > v2, 1 otherwise
version_gt() { test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1"; }

# --- 脚本开始执行 ---
# ====================================================

echo ""
echo "--- Jenkins Vue 项目自动化部署开始 (${PROJECT_NAME}) ---"
echo ""

# 2. 通过版本号检测 Nginx 是否存在，不在就 dnf install nginx -y 安装
# ====================================================
echo ""
echo "--- Nginx 存在性与版本检查 ---"
echo ""

CURRENT_NGINX_VERSION=""
if command_exists "${NGINX_SBIN}"; then
    # 从 'nginx -v' 的输出中提取版本号 (如: nginx/1.26.1 -> 1.26.1)
    CURRENT_NGINX_VERSION=$("${NGINX_SBIN}" -v 2>&1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
    echo "检测到 Nginx 已安装，当前版本为: ${CURRENT_NGINX_VERSION}"
else
    echo "未检测到 Nginx 可执行文件 (${NGINX_SBIN})。"
fi

# 判断是否需要安装 Nginx
INSTALL_NGINX="false"
if [ -z "${CURRENT_NGINX_VERSION}" ]; then
    echo "Nginx 未安装，将执行安装。"
    INSTALL_NGINX="true"
elif ! version_gt "${CURRENT_NGINX_VERSION}" "${EXPECTED_NGINX_VERSION}" && [ "${CURRENT_NGINX_VERSION}" != "${EXPECTED_NGINX_VERSION}" ]; then
    echo "Nginx 版本 (${CURRENT_NGINX_VERSION}) 低于期望版本 (${EXPECTED_NGINX_VERSION}) 或不一致，将尝试安装/更新。"
    INSTALL_NGINX="true"
else
    echo "Nginx 版本 (${CURRENT_NGINX_VERSION}) 符合要求，跳过安装。"
fi

if [ "$INSTALL_NGINX" = "true" ]; then
    echo "正在执行 dnf install -y nginx..."
    dnf install -y nginx || { echo "错误：Nginx 安装失败。请检查 Jenkins Agent 用户的 sudo 权限和网络连接。"; exit 1; }
    echo "Nginx 安装完成。"

    echo "确保 Nginx 服务已启动并设置为开机自启..."
    systemctl start nginx || { echo "错误：Nginx 服务启动失败。"; exit 1; }
    systemctl enable nginx || { echo "错误：Nginx 服务开机自启设置失败。"; exit 1; }
    echo "Nginx 服务已运行并设置为开机自启。"
else
    echo "Nginx 已安装且版本符合要求，确保服务运行..."
    # 即使不安装，也要确保服务是运行的
    if ! systemctl is-active --quiet nginx; then
        echo "Nginx 服务未运行，尝试启动..."
        systemctl start nginx || { echo "错误：Nginx 服务启动失败。"; exit 1; }
        echo "Nginx 服务已启动。"
    fi
    if ! systemctl is-enabled --quiet nginx; then
        echo "Nginx 服务未设置为开机自启，尝试设置..."
        systemctl enable nginx || { echo "错误：Nginx 服务开机自启设置失败。"; exit 1; }
        echo "Nginx 服务已设置为开机自启。"
    fi
fi

# 3. 检测 pnpm 是否存在，不存在就用 npm
# ====================================================
echo ""
echo "--- 选择包管理器 (pnpm 优先) ---"
echo ""
PACKAGE_MANAGER=""
if command_exists pnpm; then
    PACKAGE_MANAGER="pnpm"
    echo "检测到 **pnpm**，将使用 pnpm 进行依赖安装和构建。"
elif command_exists npm; then
    PACKAGE_MANAGER="npm"
    echo "检测到 **npm**，将使用 npm 进行依赖安装和构建。"
else
    echo "错误：未检测到 pnpm 或 npm。请确保 Node.js 环境已安装并包含 npm/pnpm。"
    exit 1
fi


# 4. 构建前端项目打包
# ====================================================
echo ""
echo "--- 构建前端项目 ---"
echo ""

echo "进入 Jenkins 工作目录: $(pwd)" # Jenkins 会将 GitHub 仓库拉取到这里

echo "安装项目依赖 (${PACKAGE_MANAGER})..."
if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    # --shamefully-hoist 兼容旧的依赖结构，--prefer-offline 优先使用缓存
    ${PACKAGE_MANAGER} install --shamefully-hoist --prefer-offline
else # npm
    ${PACKAGE_MANAGER} install --prefer-offline
fi
echo "执行项目构建 (${PACKAGE_MANAGER} run build-only)..."
${PACKAGE_MANAGER} run build-only
echo "Vue 项目构建完成。"

# 5. 清理 Nginx 的项目原有打包内容，然后移动前端的打包产物
# ====================================================
echo ""
echo "--- 清理与部署构建产物 ---"
echo ""

echo "目标部署目录: ${DEPLOY_ROOT_PATH}"

# 清理旧的部署目录（如果存在）
if [ -d "${DEPLOY_ROOT_PATH}" ]; then
    echo "清理旧的部署目录 ${DEPLOY_ROOT_PATH} 中的内容..."
    rm -rf "${DEPLOY_ROOT_PATH}"/* || { echo "错误：清理旧部署目录失败，请检查 Jenkins Agent 用户的 sudo 权限。"; exit 1; }
else
    echo "部署目录 ${DEPLOY_ROOT_PATH} 不存在，将创建。"
    # 创建新的部署目录
    mkdir -p "${DEPLOY_ROOT_PATH}" || { echo "错误：创建部署目录失败，请检查 Jenkins Agent 用户的 sudo 权限。"; exit 1; }
fi

# 将构建产物 (dist 目录) 移动到部署目录
echo "移动构建产物 (dist/*) 到 ${DEPLOY_ROOT_PATH}..."
# 假设 Vue 项目构建后的输出目录是 dist
if [ -d "dist" ]; then
    mv dist/* "${DEPLOY_ROOT_PATH}/" || { echo "错误：移动构建产物失败，请检查 Jenkins Agent 用户的权限。"; exit 1; }
    echo "构建产物已成功部署。"
else
    echo "错误：未找到构建产物目录 'dist'。请检查您的 Vue 项目构建输出配置。"
    exit 1
fi

# 6. 给当前项目开一个单独的 Nginx 配置，不要互相影响，多项目启动 Nginx
# ====================================================
echo ""
echo "--- 为当前项目配置独立 Nginx 虚拟主机 ---"
echo ""

# Nginx 配置文件路径
NGINX_PROJECT_CONF="${NGINX_CONF_D_DIR}/${PROJECT_NAME}.conf"

# --- 新增的逻辑：检查 Nginx 配置文件是否存在，如果存在则跳过创建 ---
if [ -f "${NGINX_PROJECT_CONF}" ]; then
    echo "Nginx 配置文件 ${NGINX_PROJECT_CONF} 已存在，跳过重新创建。"
else
    echo "Nginx 配置文件 ${NGINX_PROJECT_CONF} 不存在，正在生成..."
    echo "正在生成 Nginx 配置文件内容到临时文件：/tmp/${PROJECT_NAME}.conf.tmp"
    cat > "/tmp/${PROJECT_NAME}.conf.tmp" <<EOL
server {
    listen 80;
    server_name ${SERVER_NAME}; # 强烈建议替换为你的实际域名或 IP

    root ${DEPLOY_ROOT_PATH};
    index index.html index.htm; # Vue 项目通常是 index.html

    location / {
        try_files \$uri \$uri/ /index.html; # Vue Router 历史模式需要重定向到 index.html
    }

    # 也可以添加日志配置
    access_log /var/log/nginx/${PROJECT_NAME}_access.log;
    error_log /var/log/nginx/${PROJECT_NAME}_error.log;

    # 如果你的前端项目需要反向代理到后端 API，可以在这里添加类似如下配置：
    # location /api/ {
    #     proxy_pass http://localhost:8080/; # 假设后端服务运行在 8080 端口
    #     proxy_set_header Host \$host;
    #     proxy_set_header X-Real-IP \$remote_addr;
    #     proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    #     proxy_set_header X-Forwarded-Proto \$scheme;
    # }

    error_page 404 /index.html; # 对于 SPA，404 错误也通常指向 index.html
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root html; # Nginx 默认的 html 目录
    }
}
EOL

    echo "正在将 Nginx 配置文件移动到 ${NGINX_PROJECT_CONF}..."
    # 由于 /etc/nginx/conf.d/ 需要 root 权限，这里使用 sudo
    mv "/tmp/${PROJECT_NAME}.conf.tmp" "${NGINX_PROJECT_CONF}" || { echo "错误：移动 Nginx 配置文件失败，请检查 Jenkins Agent 用户的 sudo 权限。"; exit 1; }
    # 设置文件权限，确保 Nginx 可以读取
    chmod 644 "${NGINX_PROJECT_CONF}" || { echo "错误：设置 Nginx 配置文件权限失败。"; exit 1; }
    echo "Nginx 配置文件已更新：${NGINX_PROJECT_CONF}"
fi

# 7. 启动/重载 Nginx
# ====================================================
echo ""
echo "--- 测试并重载 Nginx 服务 ---"
echo ""
echo "正在测试 Nginx 配置语法..."
# 使用 sudo 执行 Nginx 测试命令
"${NGINX_SBIN}" -t || { echo "错误：Nginx 配置测试失败。请检查 ${NGINX_PROJECT_CONF} 文件。"; exit 1; }
echo "Nginx 配置语法测试通过。"

echo "正在重载 Nginx 服务以应用新配置..."
# 使用 sudo 重载 Nginx 服务
systemctl reload nginx || { echo "错误：重载 Nginx 服务失败。请手动检查 Nginx 服务状态。"; exit 1; }
echo "Nginx 服务已成功重载。"

# 8. 防火墙提示
# ====================================================
echo ""
echo "--- 防火墙提示 ---"
echo ""
echo "请确保防火墙已允许 80/443 端口的流量通过。"
echo "例如 (CentOS/RHEL): sudo firewall-cmd --permanent --add-service=http --add-service=https && sudo firewall-cmd --reload"

echo ""
echo "--- Jenkins Vue 项目自动化部署完成！ ---"
echo ""

exit 0