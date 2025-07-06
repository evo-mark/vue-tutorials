<p align="center">
    <a href="https://evomark.co.uk" target="_blank" alt="Link to evoMark's website">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://evomark.co.uk/wp-content/uploads/static/evomark-logo--dark.svg">
          <source media="(prefers-color-scheme: light)" srcset="https://evomark.co.uk/wp-content/uploads/static/evomark-logo--light.svg">
          <img alt="evoMark company logo" src="https://evomark.co.uk/wp-content/uploads/static/evomark-logo--light.svg" width="500">
        </picture>
    </a>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/dm/vue-tutorials.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-tutorials"><img src="https://img.shields.io/npm/v/vue-tutorials.svg" alt="Version"></a>
  <a href="https://github.com/evo-mark/vue-tutorials/blob/main/LICENCE"><img src="https://img.shields.io/github/license/evo-mark/vue-tutorials?style=flat" alt="Licence"></a>
</p>

# Vue Tutorials

Teach users about how your app works, with this easy-to-use tutorials plugins for Vue (v3.5+).

## Peer Dependencies

- Vue v3.5.0+
- @vueuse/core version 10 - 13

## Installation

First, install the plugin using your package manager of choice (we're using PNPM). You'll also need to add the peer dependencies if they're not already in your project.

```sh
pnpm add vue-tutorials vue @vueuse/core
```

## Usage

Vue Tutorials _must_ be installed as a plugin for your app:

```js
import { createApp } from "vue";
import { VueTutorials } from "vue-tutorials";

const app = createApp(App);
app.use(VueTutorials);
app.mount("#app");
```

### Global Options

You can also pass global options to the plugin as the 2nd argument to `app.use`.

Vue Tutorials will register the `v-tutorial` component globally by default.

```js
app.use(VueTutorials, {
	viewCount: 2,
	overlayColour: "rgb(0 0 0 / 0.8)",
	contentClass: "bg-white p-4 rounded",
	tutorials: {
		feature: ["This is a new feature!"],
	},
	target: "#app",
});
```

You can pass any of the following to the global options object

| name                | type                               | description                                                   | default          |
| ------------------- | ---------------------------------- | ------------------------------------------------------------- | ---------------- |
| viewCount           | number                             | Number of times to show tutorial to user                      | 1                |
| componentName       | string                             | Name of the globally registered component                     | "VTutorial"      |
| tutorials           | Record<string, string \| string[]> | Dictionary of tutorial content                                | {}               |
| overlayColour       | string                             | CSS colour for the non-highlighted elements                   | rgb(0 0 0 / 0.6) |
| target              | string                             | Where highlighted content should be teleported to             | "body"           |
| global              | boolean                            | Register the component globally                               | true             |
| as                  | string \| Component                | Element to use for wrapping                                   | "span"           |
| closeOnOutsideClick | boolean                            | Close tutorial when a user clicks outside the content         | true             |
| contentClass        | string                             | Class(es) to apply to the content                             | \<empty string\> |
| highlightedClass    | string                             | Class(es) to apply to the highlighted element                 | \<empty string\> |
| position            | string                             | Position of the content relative to the highlighted element   | "bottom"         |
| offset              | number                             | Number of pixels gap between content and highlighted elements | 10               |

## Adding a Tutorial

Inside your app, you can then wrap relevant areas:

```html
<VTutorial id="feature">
	<div>New feature goes here</div>
</VTutorial>
```

### Local Props

You can pass any of the following to the local component. These will override your global config if set.

- as
- target
- position
- contentClass
- overlayColour
- closeOnOutsideClick

Additionally, the following props are exclusive to the component:

| name    | type             | description                      | default          |
| ------- | ---------------- | -------------------------------- | ---------------- |
| content | string\|string[] | Content to show for the tutorial | \<empty string\> |

### Slots

> Content

Pass content to be displayed directly

```html
<VTutorial id="feature">
	<div>New feature goes here</div>
	<template #content="{ closeTutorial }">
		This is a new feature!
		<button @click="closeTutorial">Done</button>
	</template>
</VTutorial>
```

## Support Open-Source Software

We're providing this package free-of-charge to the community. However, all development and maintenance costs time, energy and money. So please help fund this project if you can.

<p align="center" style="display:flex;align-items:center;gap:1rem;justify-content:center">
<a href="https://github.com/sponsors/craigrileyuk" target="_blank">
<img src="https://img.shields.io/badge/sponsor-GitHub%20Sponsors-fafbfc?style=for-the-badge&logo=github">
</a>
<a href="https://www.buymeacoffee.com/craigrileyuk" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
</p>
