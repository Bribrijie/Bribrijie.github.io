# my-portfolio

个人网站源码：博客 + 项目 + 简历，中文日/英文双语，使用 Hugo 构建并部署到 GitHub Pages。

- 站点地址：<https://bribrijie.github.io/>（中文，默认）
- 英文版：<https://bribrijie.github.io/en/>
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

> 注意：不要在 `hugo server` 运行期间另开终端执行 `hugo --minify --gc`。两者会争抢
> `resources/_gen` 缓存，导致运行中的服务报 `RelPermalink: file does not exist`。
> 需要验证生产构建时，先停掉 server。

## 双语结构

中文是默认语言，位于根路径；英文位于 `/en/`。导航右侧的「English / 中文」是语言切换器。

内容文件通过 `.en.md` 后缀区分语言：

```
content/about/index.md        中文
content/about/index.en.md     英文
```

只写了中文、没写英文的文件，英文站点会回退到中文内容。导航菜单在两处分别配置：
`[[languages.zh-cn.menu.main]]` 和 `[[languages.en.menu.main]]`。

## 目录说明

```
content/
  posts/        博客文章（Markdown）
  projects/     项目页
  resume/       简历页
  about/        关于页
  search/       搜索页
  archives/     归档页（未上导航，可直接访问 /archives/）
assets/
  scss/custom.scss   自定义样式
  js/search.js       搜索逻辑
  js/fuse.min.js     本地 Fuse.js（避免运行时依赖 CDN）
layouts/
  home.json             搜索索引输出模板（每种语言各生成一份）
  archives/list.html    归档页布局
  _shortcodes/search.html
  _partials/header.html 覆盖主题，修正语言切换器的弃用 API
i18n/zh-cn.toml      中文文案（含主题缺失的「目录」标题）
i18n/en.toml         英文文案（含搜索页文案）
.github/workflows/deploy.yml
```

## 日常维护

**写新文章**：中文写 `content/posts/xxx.md`，英文写 `content/posts/xxx.en.md`。

```markdown
---
title: "Post title"
date: 2026-10-09
tags: ["tag"]
categories: ["category"]
---

Body text…
```

提交推送后自动部署：

```bash
git add .
git commit -m "新增文章"
git push
```

**改简历 / 项目页**：编辑 `content/resume/index.md`（及 `index.en.md`）、
`content/projects/index.md`（及 `index.en.md`）。

**改导航菜单**：编辑 `hugo.toml` 里的 `[[languages.zh-cn.menu.main]]` /
`[[languages.en.menu.main]]`。

**换主题外观**：改 `assets/scss/custom.scss`。

## 配置要点

- `customJS` 的顺序即加载顺序，`js/fuse.min.js` 必须在 `js/search.js` 之前。
- 文章目录（TOC）默认全站开启，单篇文章可用 front matter 里 `toc = false` 关闭。
- 搜索索引由 `layouts/home.json` 生成：中文在 `/index.json`，英文在 `/en/index.json`。
  凡是 front matter 里标了 `excludeFromSearch: true` 的页面（如搜索页自身）都会排除，
  标题锚点文本也会被清理，避免污染搜索结果。
- 若某页不希望出现在搜索结果里，在 front matter 加 `excludeFromSearch: true`。

## 待替换的占位内容

站点当前是脚手架状态，以下都是占位内容，按需替换。中文和英文是**两份独立文件**，
只改中文的话英文站会保持旧内容，记得两边都改。

| 要改什么 | 文件 |
| --- | --- |
| 首页一句话简介 | `hugo.toml` → `[languages.zh-cn.params] info`（英文改 `[languages.en.params]`） |
| 邮箱（两处） | `hugo.toml` → `[[params.social]]` 的 `mailto:`；以及 resume / about 页正文 |
| 头像 | 替换 `static/images/avatar.svg`，文件名变了要同步改 `hugo.toml` 的 `avatarURL` |
| 关于页 | `content/about/index.md` 和 `index.en.md` |
| 项目页 | `content/projects/index.md` 和 `index.en.md` |
| 简历页 | `content/resume/index.md` 和 `index.en.md`（含「某某大学」「某某公司」等） |
| 示例文章 | `content/posts/first-post.md` 和 `index.en.md`，不需要可删除 |
| GitHub 链接 | `hugo.toml` → `[[params.social]]`，以及各页正文里的链接 |

改完提交推送即可自动部署：`git add . && git commit -m "更新内容" && git push`
