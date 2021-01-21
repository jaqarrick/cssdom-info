# CSSOM and Browser Rendering

The CSSOM or _CSS Object Model_ is a collection of methods and properties you can use in the browser to interact with DOM Styles.

Before jumping into CSSOM, we first have to establish an understanding of how a browser renders a website.

## Browser

The components that make up a browser
| Bindings |
|:-------------:|
|**Rendering: Parsing, layout, painting, etc** |
|**Platform - - - - - - JavaScript VM** |

- Bindings talk to the network, handle API calls
- Rendering constructs the webpage from the HTML
- Platform handles form controls, dependent on OS
- JavaScript VM handles interaction

CSSOM lives inside the rendering component

## High Level Flow

The flow of rendering after the browser receives HTML and CSS files is as follows:

1. One process parses HTML
2. One process parses CSS
3. This is combined into the render/frame tree (data structure)
4. The tree is passed onto the layout.
5. Finally, the layout is painted onto the browser.

## Parsing

_HTML is forgiving by nature. It's not strict and can imply closing tags, head, structure._

For example given the following badly written HTML:

```
<div>
<p> Hello There
<div><button>Click Me</button>
```

The parser can imply the following structure:

```
<html>
  <head></head>
  <body>
    <div>
      <p> Hello There </p>
      <div>
        <button> Click Me </button>
      </div>
    </div>
  </body>
</html>
```

#### Parse Tree

Representation of the HTML, which is turned into the DOM tree.

#### Halting the flow

When the parser reaches an element like `<script>, <link>, <style>` it halts to fetch it. Then it executes script. Link and style are similar.

#### Speculative Parsing

The parser will look ahead for link and style elements while its paused during a process.

#### Reentrant parsing

The parsing process can start over again if, for example, it encounters a `js` file that alters the DOM in some way.

For example:

```
document.body.appendChild(document.createElement('h5'))
```

This would interrupt the parsing process, slowing it down. This is why script tags should live at the **bottom of the html**. An alternative is to _defer_ the script to be executed later.

## CSSOM

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) defines the CSS Object Model as "_a set of APIs allowing the manipulation of CSS from JavaScript. It is much like the DOM, but for the CSS rather than the HTML. It allows users to read and modify CSS style dynamically._"

When the browser parses the CSS it creates the CSSOM, which creates a representation of the styles, rules, and declarations.

![CSS_Parse](./assets/CSS_Parse.png)
_image sourced from [html5 rocks](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)_

CSSOM/DOM moves into the render/frame tree combined. This tree is the actual representation of what will show on screen. However, this is not a 1 to 1 mapping of the HTML because non-visual elements aren't passed through. For example, elements with `display: none`.

### CSSOM API

One of the most common way of manipulating CSS properties and values using JS is using the `style` object.

```
document.querySelector("p").style.marginLeft = "1px"
```

This is fairly straightforward, but is limited to inline styles. In other words, you can't access styles that haven't been explicitly defined.

```
console.log(document.body.style.color) // returns undefined
```

An alternative to reading CSS attributes is the `window.getComputedStyle(HTMLElement)`, which returns an object of all computed CSS styles. You can access specific properties using keys like this: `window.getComputedStyle(HTMLElement)['background-color']`

A preferable alternative to setting / removing styles from an element using CSSOM is using the `setProperty` and `removeProperty` methods. For example:

```
const button = document.querySelector("button")
button.setProperty("background-color", "red")
button.removeProperty("background-color")
```

A more complex and systematic way of altering CSS stylesheets and style elements is through adding and removing CSS rules. To see a live example of this, navigate to the [demo folder](https://github.com/jaqarrick/cssdom-info/demo/tree/main/demo).

# Attributions

The explanation / overview portion of this repo draws heavily from Ryan Seddon's talk ["So how does the browser actually render a website"](https://www.youtube.com/watch?v=SmE4OwHztCc). Other info was gathered from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) and [HTML5Rocks](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/).
