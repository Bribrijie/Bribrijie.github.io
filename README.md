# my-portfolio

个人网站源码：博客 + 简历 + 作品集，使用 Hugo 构建并部署到 GitHub Pages。

- 站点地址：<https://bribrijie.github.io/>
- 主题：[Coder](https://github.com/luizdepra/hugo-coder)（锁定 v1.2）
- 部署：GitHub Actions，push 到 `main` 后自动构建发布

## 本地开发

需要 [Hugo Extended](https://gohugo.io/installation/)（0.146 以上，本项目用 0.167.0）。

```bash
# 首次克隆（含主题 submodule）
git clone --recurse-submodules https://github.com/Bribrijie/Bribrijie.github.io.git

# 已有仓库但主题目录为空时
git submodule update --init --recursive

# 本地预览（含草稿）
hugo server -D

# 生产构建
hugo --minify --gc
```

预览地址：<http://127.0.0.1:1313/>

## 目录说明

```
content/
  posts/        博客文章（Markdown）
  resume/       简历页
  portfolio/    作品集页
  about/        关于页
  search/       搜索页
  archives/     归档页
assets/
  scss/custom.scss   自定义样式
  js/search.js       搜索逻辑
  js/fuse.min.js     本地 Fuse.js（避免运行时依赖 CDN）
layouts/
  home.json          搜索索引输出模板
  archives/list.html 归档页布局
  _shortcodes/search.html
i18n/zh-cn.toml      中文文案（含主题缺失的「目录」标题）
.github/workflows/deploy.yml
```

## 日常维护

**写新文章**：在 `content/posts/` 新建 Markdown 文件。

```markdown
---
title: "文章标题"
date: 2026-10-09
tags: ["标签"]
categories: ["分类"]
---

正文……
```

提交推送后自动部署：

```bash
git add .
git commit -m "新增文章"
git push
```

**改简历 / 作品集**：直接编辑 `content/resume/index.md`、`content/portfolio/index.md`。

**换主题外观**：改 `assets/scss/custom.scss`。主题自带的 SCSS 变量可通过覆盖方式调整。

## 配置要点

- `hugo.toml` 里的 `customJS` 顺序是加载顺序，`js/fuse.min.js` 必须在 `js/search.js` 之前。
- 文章目录（TOC）默认全站开启，单篇文章可用 front matter 里 `toc = false` 关闭。
- 搜索索引由 `layouts/home.json` 生成到 `/index.json`，已排除搜索页自身，并清理了标题锚点文本。
