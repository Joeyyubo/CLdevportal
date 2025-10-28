#!/bin/bash
echo "🔧 修改 Git 用户配置"
echo ""
echo "当前的配置："
echo "  Name: $(git config user.name)"
echo "  Email: $(git config user.email)"
echo ""
read -p "新的用户名 (GitHub 用户名): " new_name
read -p "新的邮箱 (GitHub 邮箱): " new_email
git config user.name "$new_name"
git config user.email "$new_email"
echo ""
echo "✅ 已更新为："
echo "  Name: $(git config user.name)"
echo "  Email: $(git config user.email)"
echo ""
echo "⚠️  注意：这个更改只影响将来的提交，不会改变历史提交的作者信息。"
