<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Portfolio MVP](#portfolio-mvp)
  - [How To Customize](#how-to-customize)
    - [Update Hero](#update-hero)
    - [Add/Change Projects](#addchange-projects)
  - [Next Iterations](#next-iterations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Portfolio MVP

This repo implements a **single-page portfolio MVP** based on a condensed wireframe:

**Header/Nav -> Hero -> Featured Projects -> Skills -> Contact/Footer**

The goal is a fast, scannable layout that supports **feature-driven learning** (DOM, state, events, localStorage, modals).

---

## How To Customize

### Update Hero

Edit:

- Name
- Target role line
- Value proposition sentence
- Buttons (CV filename + links)

### Add/Change Projects

In `js/index.js`, edit:

```js
state.projects = [
  {
    id: "my-project",
    title: "...",
    problem: "...",
    approach: "...",
    evidence: "...",
    tags: ["..."],
    links: [{ label: "GitHub", href: "..." }]
  }
]

```

---

## Next Iterations

- Add project filters (All / Featured)
- Add search with debounce
- Add GitHub API “Latest repos” section (loading/error states)
- Split JS into modules: `state.js`, `ui.js`, `api.js`
- Improve accessibility (focus trap in modal)
