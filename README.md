<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Portfolio](#portfolio)
  - [Update](#update)
  - [Features](#features)
  - [Deploy](#deploy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Portfolio

Minimal portfolio that links to CV/GitHub.

## Update

1. Edit `index.html` - Your info in hero
   - Name, role, contact info in hero section
   - Update CV filename in download link
2. Edit `js/index.js` - Your projects & skills

   ```js
   // Add your projects
   projects: [
     {
       title: "Project Name",
       summary: "Brief description",
       tags: ["Tech", "Stack"],
       link: "https://github.com/..."
     }
   ],
   
   // Add your skills
   skills: [
     {
       title: "Category",
       items: ["Skill 1", "Skill 2"]
     }
   ]
   ```

3. Add your logo and CV

- Logo: images/LOGO(2).png
- CV: sheltoncv_sd.pdf (or rename in HTML)

## Features

- Dark/light theme (saves preference)
- Mobile-friendly navigation
- Fast loading
- Direct links to GitHub/CV

## Deploy

Push to GitHub → Settings → Pages
