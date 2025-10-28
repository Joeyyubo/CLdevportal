# 🔍 Vercel 设置检查清单

## ✅ 必需的设置

访问：https://vercel.com/developerportal13/settings

### 1. Root Directory
**必须设置！**

```
Settings → General → Root Directory
输入：patternfly-react-seed
```

### 2. Build & Development Settings

#### Build Command
```
npm run build
```

#### Output Directory
```
dist
```

#### Install Command
```
npm install
```

---

## 🚨 为什么是空白页？

通常是因为 Root Directory 没有正确设置！

### 检查步骤：

1. 打开你的项目：https://vercel.com/developerportal13
2. 点击 **Settings** 标签
3. 找到 **General** 部分
4. 查看 **Root Directory** 字段

**如果是空的或者不是 `patternfly-react-seed`：**

1. 点击 **Edit**
2. 输入：`patternfly-react-seed`
3. 点击 **Save**
4. 回到 **Deployments** 页面
5. 找到最新的部署
6. 点击 **...** 菜单
7. 选择 **Redeploy**

---

## 📸 应该长这样：

```
Project Settings
├── General
│   ├── Project Name: developerportal13
│   ├── Root Directory: patternfly-react-seed  ⬅️ 这里！
│   └── Node.js Version: 18.x
│
└── Build & Development Settings
    ├── Framework Preset: Other
    ├── Build Command: npm run build
    ├── Output Directory: dist
    └── Install Command: npm install
```

---

## ⚡ 快速修复

### 选项 1: 更新 Root Directory 并重新部署

1. 访问：https://vercel.com/developerportal13/settings/general
2. 找到 **Root Directory**
3. 设为：`patternfly-react-seed`
4. **保存**
5. 重新部署

### 选项 2: 使用 Surge（备选方案）

如果 Vercel 还是有问题：

```bash
cd /Users/yxing/Downloads/pf-dev/patternfly-react-seed
npm run build
cd dist
surge
# 输入一个域名，比如 pf-dev-prototype
```

立即可用！

---

## 🔍 检查当前部署状态

访问 Vercel Dashboard：
https://vercel.com/developerportal13/deployments

查看最新的部署：
- ✅ 绿色的 "Ready" = 成功
- ❌ 红色的 "Failed" = 失败（查看日志）

---

## 🎯 下一步

1. **等待 2 分钟**（Vercel 自动重新部署）
2. **刷新页面**：https://developerportal13.vercel.app/
3. **如果还是空白**，检查 Root Directory 设置

---

告诉我现在的状态：
- [ ] 刷新后看到页面了
- [ ] 还是空白页
- [ ] 看到错误信息

