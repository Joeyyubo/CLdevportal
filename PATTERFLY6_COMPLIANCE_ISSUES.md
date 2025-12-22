# PatternFly 6 设计规范合规性问题报告

## 概述
根据 PatternFly 6 设计规范和项目文档检查，发现以下不符合规范的问题：

## 1. 间距（Spacing）问题

### 问题
所有内联样式中的间距值都使用了硬编码的像素值，而不是 PatternFly 的设计令牌。

### 具体问题：
- `padding: '24px'` → 应该使用 `var(--pf-t-global--spacer--xl)`
- `padding: '16px'` → 应该使用 `var(--pf-t-global--spacer--md)`
- `padding: '12px'` → 应该使用 `var(--pf-t-global--spacer--md)`
- `padding: '8px'` → 应该使用 `var(--pf-t-global--spacer--sm)`
- `marginBottom: '24px'` → 应该使用 `var(--pf-t-global--spacer--xl)`
- `marginBottom: '16px'` → 应该使用 `var(--pf-t-global--spacer--md)`
- `marginBottom: '8px'` → 应该使用 `var(--pf-t-global--spacer--sm)`
- `gap: '8px'` → 应该使用 `var(--pf-t-global--spacer--sm)`

### 影响文件
- `src/app/DeveloperPortal/DeveloperPortal.tsx`（多处）

### PatternFly 规范要求
> **ALWAYS use PatternFly spacing variables (design tokens) for all spacing, including in inline style props.**
> **Do not use hardcoded numbers for margin, padding, or other spacing in inline styles.**

参考：`ai-documentation/guidelines/styling-standards.md` 第332-337行

---

## 2. 颜色（Color）问题

### 问题
所有颜色值都使用了硬编码的十六进制值，而不是 PatternFly 的语义化颜色令牌。

### 具体问题：
- `color: '#151515'` → 应该使用 `var(--pf-t--global--text--color--regular)`
- `color: '#6a6e73'` → 应该使用 `var(--pf-t--global--text--color--subtle)`
- `color: '#8b8d90'` → 应该使用 `var(--pf-t--global--text--color--subtle)`
- `backgroundColor: '#ffffff'` → 应该使用 `var(--pf-t--global--background--color--primary--default)`
- `backgroundColor: '#f5f5f5'` → 应该使用 `var(--pf-t--global--background--color--secondary--default)`
- `backgroundColor: '#fafafa'` → 应该使用 `var(--pf-t--global--background--color--disabled--default)`
- `border: '1px solid #d0d0d0'` → 应该使用 `1px solid var(--pf-t--global--border--color--default)`
- `border: '2px solid #0066CC'` → 应该使用 `2px solid var(--pf-t--global--interactive--color--active)`

### 影响文件
- `src/app/DeveloperPortal/DeveloperPortal.tsx`（多处）

### PatternFly 规范要求
> **Use semantic tokens** (e.g., `--pf-t--global--text--color--regular`) for custom CSS.
> **Don't use hardcoded values** (e.g., `#333333`).

参考：`ai-documentation/guidelines/styling-standards.md` 第119-134行

---

## 3. 字体大小（Typography）问题

### 问题
字体大小使用了硬编码的像素值，而不是 PatternFly 的字体大小令牌。

### 具体问题：
- `fontSize: '14px'` → 应该使用 `var(--pf-t--global--font--size--sm)`
- `fontSize: '13px'` → 应该使用 `var(--pf-t--global--font--size--sm)`
- `fontSize: '20px'` → 应该使用 `var(--pf-t--global--font--size--lg)` 或合适的令牌
- `fontSize: '16px'` → 应该使用 `var(--pf-t--global--font--size--md)`

### 影响文件
- `src/app/DeveloperPortal/DeveloperPortal.tsx`（多处）
- Masthead 中的品牌文字（第367-368行）

### PatternFly 规范要求
> **Use semantic design tokens for typography** - `--pf-t--global--font--size--{sm|md|lg|xl}`

参考：`ai-documentation/guidelines/styling-standards.md` 第136-149行

---

## 4. 边框圆角（Border Radius）问题

### 问题
边框圆角使用了硬编码的像素值。

### 具体问题：
- `borderRadius: '4px'` → 应该使用 `var(--pf-t--global--border--radius--sm)`
- `borderRadius: '6px'` → 应该使用 `var(--pf-t--global--border--radius--md)`

### 影响文件
- `src/app/DeveloperPortal/DeveloperPortal.tsx`（多处）
- Filter buttons（第546, 571, 597行等）
- Select dropdowns（第528, 610, 615行等）

---

## 5. 组件使用问题

### 问题
某些地方可能应该使用 PatternFly 组件而不是自定义实现。

### 检查项：
- Filter buttons：使用了自定义的 `div` 和 `role="button"`，是否应该考虑使用 PatternFly 的 `Button` 组件或合适的组件？
- Select dropdowns：使用了原生的 `<select>` 元素，PatternFly 6 提供了 `Select` 组件，但代码中已经导入了，是否应该使用？

---

## 6. 组件组合问题

### 检查项：
根据 PatternFly 规范，应该优先使用组件组合而非内联样式。例如：
- 是否有地方可以使用 `Stack hasGutter` 来替代手动设置的间距？
- 是否有地方可以使用组件 props（如 `Title` 的 `style` prop）替代内联样式？

---

## 7. 之前已修复但又被撤销的问题

### 问题
根据 `attached_files` 中的更改记录，用户将之前的 PatternFly CSS 变量替换回了硬编码值：

**之前（符合规范）：**
```jsx
style={{ marginBottom: 'var(--pf-t-global--spacer--xl)' }}
style={{ padding: 'var(--pf-t-global--spacer--xl)' }}
style={{ color: 'var(--pf-t--global--text--color--regular)' }}
```

**现在（不符合规范）：**
```jsx
style={{ marginBottom: '24px' }}
style={{ padding: '24px' }}
style={{ color: '#151515' }}
```

---

## 修复建议优先级

### 高优先级（必须修复）
1. 将所有硬编码的间距值替换为 PatternFly 设计令牌
2. 将所有硬编码的颜色值替换为语义化颜色令牌
3. 将字体大小替换为字体大小令牌
4. 将边框圆角替换为边框圆角令牌

### 中优先级（建议修复）
1. 审查是否可以使用 PatternFly 组件替代自定义实现
2. 审查是否可以使用组件组合（如 `Stack hasGutter`）替代手动间距

### 低优先级（优化）
1. 考虑创建可复用的样式工具函数来减少重复代码
2. 考虑将常见的内联样式提取到 CSS 类或组件 props

---

## 修复示例

### 示例 1：间距修复
```jsx
// ❌ 错误
<div style={{ padding: '24px', marginBottom: '16px' }}>

// ✅ 正确
<div style={{ padding: 'var(--pf-t-global--spacer--xl)', marginBottom: 'var(--pf-t-global--spacer--md)' }}>
```

### 示例 2：颜色修复
```jsx
// ❌ 错误
<div style={{ color: '#151515', backgroundColor: '#f5f5f5', border: '1px solid #d0d0d0' }}>

// ✅ 正确
<div style={{ 
  color: 'var(--pf-t--global--text--color--regular)', 
  backgroundColor: 'var(--pf-t--global--background--color--secondary--default)', 
  border: '1px solid var(--pf-t--global--border--color--default)' 
}}>
```

### 示例 3：字体大小修复
```jsx
// ❌ 错误
<span style={{ fontSize: '14px' }}>Text</span>

// ✅ 正确
<span style={{ fontSize: 'var(--pf-t--global--font--size--sm)' }}>Text</span>
```

### 示例 4：边框圆角修复
```jsx
// ❌ 错误
<div style={{ borderRadius: '6px' }}>

// ✅ 正确
<div style={{ borderRadius: 'var(--pf-t--global--border--radius--md)' }}>
```

---

## 参考资料

1. PatternFly 设计令牌文档：https://www.patternfly.org/tokens
2. 项目样式标准：`ai-documentation/guidelines/styling-standards.md`
3. PatternFly React 组件库：https://www.patternfly.org/components

---

## 总结

**主要问题数量统计：**
- 间距硬编码：约 50+ 处
- 颜色硬编码：约 40+ 处
- 字体大小硬编码：约 15+ 处
- 边框圆角硬编码：约 20+ 处

**需要修复的文件：**
- `src/app/DeveloperPortal/DeveloperPortal.tsx`（主要文件）
- 可能还有其他文件需要检查

**建议：**
建议系统地替换所有硬编码值为 PatternFly 设计令牌，以确保：
1. 符合 PatternFly 6 设计规范
2. 保持界面一致性
3. 支持主题切换（如果未来需要）
4. 提高可维护性













