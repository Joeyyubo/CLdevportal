# 🚀 Vercel 部署步骤

你的代码已经在 GitHub 上了！

## 📍 你的 GitHub 仓库
https://github.com/Joeyyubo/pf-dev/tree/ai_enabled

## ✅ 接下来的步骤

### 1. 访问 Vercel
打开：https://vercel.com

### 2. 登录
- 点击 **"Continue with GitHub"** 按钮
- 使用你的 GitHub 账号登录（Joeyyubo 账号）

### 3. 导入项目
- 登录后点击 **"Add New Project"**
- 在项目列表中找到 **"Joeyyubo/pf-dev"**
- 点击 **"Import"**

### 4. 配置项目
**重要：** 需要正确设置这些选项：

#### Root Directory 设置
这是最关键的一步！
```
1. 点击 "Root Directory" 旁边的 "Edit"
2. 选择 "patternfly-react-seed"
3. 点击 "Continue"
```

#### 构建设置
```
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install (默认)
```

### 5. 选择分支
- 从下拉菜单选择：**`ai_enabled`**
- 不要选择 main 或其他分支

### 6. 部署
- 点击 **"Deploy"** 按钮
- 等待 1-2 分钟
- 看到 "Deployed" 后点击 **"Visit"**

### 7. 完成！🎉
你会得到一个类似这样的 URL：
```
https://pf-dev-xxxxx.vercel.app
```

把这个 URL 分享给团队！

---

## 🔄 更新原型

当你修改代码后：

```bash
cd /Users/yxing/Downloads/pf-dev/patternfly-react-seed
git add .
git commit -m "更新内容"
git push origin ai_enabled
```

Vercel 会自动检测到新的 push 并重新部署（约 30 秒）

---

## 📤 分享你的原型

部署成功后，把 URL 分享：

```
嘿团队！

我创建了 UXD 原型，可以在线访问：

🚀 https://your-url.vercel.app

功能：
✓ Developer Portal
✓ API 详情页 (Overview, Definition, Policy)
✓ 过滤和收藏功能
✓ 基于角色的访问控制
✓ Swagger 风格的 API 文档

欢迎反馈！
```

---

## ❓ 常见问题

### Q: Root Directory 设置很重要吗？
**A:** 是的！必须设置为 `patternfly-react-seed`，因为你的代码在这个子目录里。

### Q: 构建失败怎么办？
**A:** 检查 Build Logs，确认：
- Root Directory: `patternfly-react-seed`
- Build Command: `npm run build`
- Output Directory: `dist`

### Q: 路由不工作？
**A:** Vercel 自动处理 React Router，但如果不行，检查 `index.html`。

### Q: 可以自定义域名吗？
**A:** 可以！在 Project Settings > Domains 添加你的域名。

---

## 🎯 现在就去部署吧！

访问：https://vercel.com

