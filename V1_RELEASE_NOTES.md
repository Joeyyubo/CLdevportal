# Version 1.0.0 Release Notes

## 发布日期
2025-12-24

## 概述
Version 1.0.0 包含完整的 API key 管理功能，包括 API consumer 和 API owner 两个角色的完整工作流程。

## 主要功能

### 1. API Key Details 页面
- **API Consumer 视角**：
  - 右上角 kebab menu，包含 Edit 和 Delete 选项
  - 仅在 Active 或 Pending 状态时显示
  - Rejected 和 Disabled 状态不显示 menu
  
- **API Owner 视角**：
  - Pending 状态的 API key 显示 kebab menu（Approve/Reject）
  - Active 状态的 API key 显示 kebab menu（Edit/Delete）
  - Reject 功能包含完整的 reject modal

### 2. API Keys Approval 工作流
- **API Owner 视角**：
  - API keys approval 页面显示所有待审批的 API keys
  - Pending 状态的 API key 显示 Approve 和 Reject 按钮
  - Reject 功能包含详细的 reject modal，需要填写拒绝原因
  - Active 和 Rejected 状态的 API key 不显示操作按钮

### 3. API Key 过滤功能
- **API Details 页面**：
  - "My API keys" tab 只显示与当前 API 相关的 API keys
  - "API keys approval" tab 只显示与当前 API 相关的 API keys
  - 基于 API Access 页面的 API key 与 API 的关联关系进行过滤

### 4. 导航和面包屑
- API key details 页面的 breadcrumb：API Access > API key name
- API Access 可点击，API key name 不可点击
- Navigation 中 API Access 在详情页保持选中状态

### 5. API 名称修复
- API keys approval table 中的 API 列使用正确的 API 名称
- 从 toystore/petstore 等改为 Flights API、Booking API 等标准名称

## 技术改进

### 代码质量
- 修复所有 TypeScript 类型错误
- 移除重复的导入
- 修复颜色类型问题（gold -> yellow）

### 组件结构
- APIKeyDetails.tsx：API key 详情页面组件
- APIKeys.tsx：API keys 列表和审批页面组件
- APIDetailsPage.tsx：API 详情页面，包含 API keys 过滤

## 文件变更

### 修改的文件
1. `src/app/DeveloperPortal/APIKeyDetails.tsx`
   - 添加 kebab menu 功能
   - 添加 reject modal
   - 更新 breadcrumb
   - 修复 navigation 选中状态

2. `src/app/DeveloperPortal/APIKeys.tsx`
   - 更新 API keys approval table 的 API 名称
   - 添加 reject modal
   - 保持原有的按钮样式

3. `src/app/APIs/APIDetailsPage.tsx`
   - 添加 API key 过滤逻辑
   - 修复 TypeScript 错误
   - 更新 API keys 数据关系

## 已知问题
- 一些 ESLint 警告（未使用的导入）不影响功能
- 这些警告可以在后续版本中清理

## 测试建议
1. 测试 API consumer 视角下的 kebab menu 功能
2. 测试 API owner 视角下的 approve/reject 工作流
3. 验证 API details 页面的过滤功能
4. 检查导航和 breadcrumb 的正确性

## Git 标签
- 标签：`v1.0.0`
- 提交：`93d71b1`

## 下一步
- 清理未使用的导入
- 添加单元测试
- 优化用户体验细节


