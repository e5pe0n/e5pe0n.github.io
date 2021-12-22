---
title: "Note: Responsive Web Design with HTML5 and CSS"
categories:
  - Note
tags:
  - HTML
  - CSS
  - "Web Design"
last-modified-at: 2021-12-22
---

Responsive Web Design with HTML5 and CSS (3rd edition)
- Ben Frain
- Packt
- https://github.com/PacktPublishing/Responsive-Web-Design-with-HTML5-and-CSS-Third-Edition

# Chapter 1. The Essentials of Responsive Web Design

## Responsive Web Design

- media queries
- fluid layouts
- flexible media

# Chapter 2. Writing HTML Markup

## Section elements

### `<address>`

- Use for contcat information
- You should **NOT** use `address` for postal addresses and the like (unless they are indeed that contact addresses for the content)


## Grouping elements

### `<div>`

- You should only opt for a `div` as a last resort; only use `div` when you can think of nothing better.  


## Text-level semantics


### `<span>`

- Text-level equivalent of a `div`

### `<strong>`

### `<em>`

- `em` represents stress emphasis of its contents


# WCAG; Web Content Accessibility Guidlines

- https://www.w3.org/TR/UNDERSTANDING-WCAG20/conformance.html
- https://www.w3.org/WAI/standards-guidelines/wcag/glance/  
- https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0

# WAI-ARIA; Web Accessibility Initiative - Accessible Rich Internet Applications

- https://www.w3.org/WAI/standards-guidelines/aria/
- https://www.a11yproject.com/

- You should correct elements where possible so that the *ARIA role* is self-explained by its element
  - e.g.
    - You should the `<header>` rather than `<div class="Header">`
    - You should the `<button>` rather than `<span>` styled like a `button`

# Videos and Audio

- http://embedresponsively.com/
  - dial `padding-bottom` to an aspect ratio


# Chapter 4. Fluid Layout, Flexbox, and Responsive Images

## Converting a fixed pixel design to a fluid proportional layout

- target / context = result
  - e.g.
    - left pane which is 200 px wide in 960 px wide screen of iPhone X
    - 200 / 960 * 100 = 20.83%; `width: 20.83%;`
