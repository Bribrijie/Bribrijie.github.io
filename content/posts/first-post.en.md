---
title: "First post: how this site was built"
date: 2026-10-08
draft: false
categories: ["Tech"]
tags: ["Hugo", "GitHub Pages", "Web"]
summary: "A walkthrough of building a personal website from scratch with Hugo, the Coder theme, and GitHub Pages."
toc: true
---

This is a sample post to verify that the blog works. Feel free to edit or delete it.

## Why this stack

There are many ways to build a personal site. I settled on **Hugo + GitHub Pages**:

- **Completely free**: no server needed; GitHub Pages handles static hosting.
- **Low maintenance**: write in Markdown, no admin panel to log into.
- **Fast**: Hugo is a static site generator written in Go, so builds are quick.
- **Portable**: everything lives in your own repository.

## Tech choices

| Part | Choice | Notes |
| --- | --- | --- |
| Generator | Hugo Extended | Extended build required to compile SCSS |
| Theme | Coder | Minimal, dark mode included |
| Hosting | GitHub Pages | Free static hosting |
| Deploy | GitHub Actions | Build and publish on every push |
| Search | Fuse.js | Client-side fuzzy search |

## Directory layout

```
content/
  posts/        blog posts
  resume/       resume
  projects/     projects
  about/        about
assets/
  scss/         custom styles
  js/           custom scripts
```

## Writing a new post

Create a Markdown file under `content/posts/`, for example `hello.md`:

```markdown
---
title: "Post title"
date: 2026-10-09
tags: ["tag"]
categories: ["category"]
---

Body text…
```

Commit and push, and the site updates automatically.

## Next steps

- Replace the placeholder personal information
- Fill in the resume page
- Add projects
