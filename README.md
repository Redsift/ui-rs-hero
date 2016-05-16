# ui-rs-hero

`ui-rs-hero` is a component for creating a customizable Hero unit for your application. It is provided as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements) for easy integration into your projects.

The component is part of the [RedsiftUI](https://github.com/redsift/redsift-ui) library. For a documentation of the hero unit see the [official RedsiftUI documentation](https://docs.redsift.io/docs/client-code-redsift-ui).

## Builds

[![Circle CI](https://circleci.com/gh/Redsift/ui-rs-hero.svg?style=svg)](https://circleci.com/gh/Redsift/ui-rs-hero)

A UMD build is available from //static.redsift.io/reusable/ui-rs-hero/latest/ui-rs-hero.umd-es2015.min.js.

To build locally checkout this repository and

```bash
> cd ui-rs-hero
> npm install
> npm run build
```

This will create a `./dist` folder with the Javascript and CSS files.

## Browser Usage

First include the CSS file in the `<head>` of your page:

```html
<link rel="stylesheet" href="//static.redsift.io/reusable/ui-rs-hero/latest/css/ui-rs-hero.min.css">
<!-- (optional) include RedsiftUI theme -->
<link rel="stylesheet" href="//static.redsift.io/reusable/ui-rs-core/latest/css/ui-rs-core.min.css">
```

Note that the `ui-rs-core` theme is also included. This is only to use the typical Redsift style and purely optional. `ui-rs-hero` does **not** depend on `ui-rs-core`.

Additionally include the Javascript on the bottom of the `<body>`:

```html
<script src="//static.redsift.io/reusable/ui-rs-hero/latest/js/ui-rs-hero.umd-es2015.min.js"></script>
```

Including the Javascript already registers the custom element `rs-hero` with the browser.

Use the following HTML code to create a `rs-hero` element:

```html
<rs-hero header="My Header" bg-class="-bg-hero -effect-darken" scroll-target="#scroll-anchor" sticky-header=".content">
    <h1>I'm a Hero!</h1>
</rs-hero>
```

`-bg-hero` is a user provided class which defines the background of the hero unit and is optional. If you do not provide a background class a simple grey background is displayed. More detailed information is available in the [official RedsiftUI documentation](https://docs.redsift.io/docs/client-code-redsift-ui). An example CSS background is here:

```css
.-bg-hero {
  background-image: url('//static.redsift.io/assets/images/taxi-1.jpg');
}
```

### `rs-hero` Configuration Attributes

* **header**: (optional) A text appearing in the header of the hero component

* **bg-class**: (optional) One or multiple comma separated CSS classes applied to the component (due to technical reasons it is not possible to apply classes directly via the `class` attribute). `-bg-taxi` is defining a background image (see below for the CSS code), `-effect-darken` is an effect class to improve the contrast between the background image and the displayed text in the hero. The effect class is provided by RedsiftUI, its counterpart `-effect-lighten` is also available.

* **scroll-target**: (optional) If specified an arrow is displayed within the hero which scrolls to the given element on the page. Depending on the height of the whole page a click on the arrow might not cause any action, i.e. if the page is not overflowing.

* **sticky-header**: (optional) If specified the header part of the hero unit will act as a sticky header. When the element specified in the attribute is scrolling out on the top of the page the class `hero-sticky-header--active` is added to the header div, allowing you to style the header when it is showing on its own withouth the hero unit.

The content put within the `rs-hero` element will be displayed vertically and horizontally centered within the hero.

All attributes can be set and changed with ordinary Javascript, e.g.:

```javascript
var $hero = document.querySelector('rs-hero');

setTimeout(function() {
  $hero.removeAttribute('sticky-header');
  $hero.setAttribute('Not Sticky Anymore');
}, 3000);
```

# Development Setup

For development run

```bash
> npm run serve
```

within the repository folder. It will start a web server serving the content of `./samples` and supports live-reloading when a source file is changed.
