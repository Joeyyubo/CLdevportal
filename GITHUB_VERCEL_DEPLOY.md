# GitHub + Vercel 部署指南

你的原型已准备就绪！使用 GitHub 和 Vercel 可以自动部署。

## 📋 第一步：推送到 GitHub

### 1. 设置 GitHub 认证（如果还没有）

如果你还没有配置 GitHub 认证，有两个选择：

#### 选项 A：使用 HTTPS + Personal Access Token
```bash
# 在 GitHub 上创建 Personal Access Token
# 1. 访问 https://github.com/settings/tokens
# 2. 点击 "Generate new token (classic)"
# 3. 选择权限：repo (所有权限)
# 4. 复制生成的 token

# 使用 token 推送
git push https://YOUR_TOKEN@github.com/patternfly/patternfly-react-seed.git ai_enabled
```

#### 选项 B：使用 SSH（推荐）
```bash
# 1. 生成 SSH key（如果还没有）
ssh-keygen -t ed25519 -C "your-email@example.com"

# 2. 复制公钥到剪贴板
cat ~/.ssh/id_ed25519.pub | pbcopy

# 3. 在 GitHub 上添加 SSH key：
#    访问 https://github.com/settings/keys
#    点击 "New SSH key"
#    粘贴你的公钥

# 4. 更新 remote URL 使用 SSH
git remote set-url origin git@github.com:patternfly/patternfly-react-seed.git

# 5. 推送
git push origin ai_enabled
```

### 2. 推送你的代码

```bash
cd /Users/yxing/Downloads/pf-dev/patternfly-react-seed
git push origin ai_enabled
```

---

## 🚀 第二步：部署到 Vercel

### 方法 1：通过 Vercel 网站（推荐）

1. **访问 [vercel.com](https://vercel.com)**

2. **用 GitHub 账号登录**
   - 点击 "Continue with GitHub"
   - 授权 Vercel 访问你的仓库

3. **导入项目**
   - 点击 "Add New Project"
   - 选择你的 GitHub repository（patternfly-react-seed）
   - 从分支列表中选择 `ai_enabled`

4. **配置项目设置**
   ```
   根目录（Root Directory）: patternfly-react-seed
   框架（Framework Preset）: Other
   构建命令（Build Command）: npm run build
   输出目录（Output Directory）: dist
   ```

5. **点击 "Deploy"**
   - Vercel 会自动开始构建
   - 大约 1-2 分钟后完成
   - 你会看到一个类似 `https://patternfly-react-seed-xxxxx.vercel.app` 的 URL

6. **完成！**
   - 你的原型已经在线
   - 分享这个 URL 给团队

### 方法 2：通过 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署
cd /Users/yxing/Downloads/pf-dev/patternfly-react-seed
vercel

# 4. 按照提示操作
# - 选择 "Link to existing project"
# - 或者 "Create a new project"
# - 输入项目名称
# - 其他配置使用默认值
```

---

## ✅ 部署成功后的特性

- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 每次 GitHub push 自动重新部署
- ✅ 可以添加自定义域名
- ✅ 支持预览部署（每 push 到其他分支也会部署一个预览版本）

---

## 🔄 更新原型

1. **修改代码**
2. **提交更改**
   ```bash
   git add .
   git commit -m "Update prototype"
   git push origin ai_enabled
   ```
3. **Vercel 自动部署**（约 30 秒）

---

## 🌐 使用 Netlify（Vercel 的替代方案）

如果你更喜欢 Netlify：

1. **访问 [netlify.com](https://netlify.com)**

2. **用 GitHub 登录**

3. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 repository 和 `ai_enabled` 分支

4. **配置构建设置**
   ```
   Base directory: patternfly-react-seed
   Build command: npm run build
   Publish directory: dist
   ```

5. **点击 "Deploy site"**

6. **完成！** 你的站点会在 `https://your-site-name.netlify.app`

---

## 📤 分享你的原型

部署成功后，分享链接给：

```markdown
嘿团队！

我创建了 UXD 原型，可以在线访问：

📱 https://your-project.vercel.app

**功能：**
- Developer Portal 和 API 列表
- API 详情页（Overview, Definition, Policy）
- 基于角色的访问（API Consumer, API Owner, Platform Engineer）
- 过滤和收藏功能
- Swagger 风格的 API 文档展示

欢迎反馈！
```

---

## ❓ 需要帮助？

如果遇到问题：

1. **GitHub 推送问题**
   - 检查是否有写权限
   - 确认使用正确的凭证
   - 可以考虑创建 fork

2. **Vercel 部署问题**
   - 检查构建日志
   - 确认所有依赖已安装
   - 验证 dist 目录存在

3. **路由不工作**
   - Vercel 自动处理 React Router
   - 如果不行，检查 `index.html` 配置

---

## 🎯 当前状态

- ✅ 代码已提交到本地 git
- ✅ 需要推送到 GitHub
- ✅ 准备部署到 Vercel

**下一步：** 推送到 GitHub，然后在 Vercel 上导入项目！

