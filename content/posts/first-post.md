---
title: "第一篇文章：这个站点是怎么搭起来的"
date: 2026-10-08
draft: false
categories: ["技术"]
tags: ["Hugo", "GitHub Pages", "建站"]
summary: "记录用 Hugo + Coder 主题 + GitHub Pages 从零搭建个人网站的完整过程。"
toc: true
---

这是一篇示例文章，用来验证博客功能是否正常。你可以直接修改或删除它。

## 为什么选择这套方案

搭建个人网站的方式很多，最后选了 **Hugo + GitHub Pages** 这个组合：

- **完全免费**：不需要买服务器，GitHub Pages 提供静态托管。
- **维护成本低**：内容用 Markdown 写，不用登录后台。
- **速度快**：Hugo 是 Go 写的静态站点生成器，构建非常快。
- **可控性强**：所有文件都在自己的仓库里，随时可以迁移。

## 技术选型

| 部分 | 选择 | 说明 |
| --- | --- | --- |
| 站点生成器 | Hugo Extended | 需要 extended 版本编译 SCSS |
| 主题 | Coder | 极简、支持深色模式 |
| 托管 | GitHub Pages | 免费静态托管 |
| 部署 | GitHub Actions | push 后自动构建发布 |
| 搜索 | Fuse.js | 纯前端模糊搜索 |

## 目录结构

```
content/
  posts/        博客文章
  resume/       简历
  portfolio/    作品集
  about/        关于
assets/
  scss/         自定义样式
  js/           自定义脚本
```

## 如何写新文章

在 `content/posts/` 下新建 Markdown 文件，例如 `hello.md`：

```markdown
---
title: "文章标题"
date: 2026-10-09
tags: ["标签"]
categories: ["分类"]
---

正文内容……
```

保存后提交并推送，站点会自动更新。

## 下一步

- 把占位的个人信息替换成真实内容
- 在「简历」页面补充自己的经历
- 在「作品集」页面添加项目

就到这里，祝你建站顺利。
