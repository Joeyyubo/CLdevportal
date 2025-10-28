#!/bin/bash

echo "🚀 部署 PF-Dev 原型到 GitHub"
echo "================================"
echo ""

# 显示 SSH 公钥
echo "📋 请复制以下 SSH 公钥到 GitHub："
echo ""
cat ~/.ssh/id_ed25519.pub
echo ""
echo ""

echo "🔗 添加 SSH Key 到 GitHub："
echo "   1. 访问：https://github.com/settings/keys"
echo "   2. 点击 'New SSH key'"
echo "   3. Title: Mac SSH Key"
echo "   4. 粘贴上面的公钥"
echo "   5. 点击 'Add SSH key'"
echo ""
echo "按回车键继续..."
read

# 切换到 SSH URL
echo "🔧 切换到 SSH..."
cd /Users/yxing/Downloads/pf-dev/patternfly-react-seed
git remote set-url origin git@github.com:Joeyyubo/pf-dev.git

# 推送代码
echo "📤 推送到 GitHub..."
git push -u origin ai_enabled

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 成功！代码已推送到 GitHub"
    echo "🔗 https://github.com/Joeyyubo/pf-dev/tree/ai_enabled"
    echo ""
    echo "下一步：部署到 Vercel"
    echo "1. 访问：https://vercel.com"
    echo "2. 点击 'Continue with GitHub'"
    echo "3. 选择 repository: Joeyyubo/pf-dev"
    echo "4. 选择分支: ai_enabled"
    echo "5. 配置：Root: patternfly-react-seed, Build: npm run build, Output: dist"
    echo "6. 点击 Deploy"
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "   - SSH key 是否正确添加到 GitHub"
    echo "   - 使用命令测试：ssh -T git@github.com"
fi

