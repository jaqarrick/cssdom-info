# CSSDOM Demo

This demo uses a [css parser](https://github.com/reworkcss/css) to create a AST parse tree from a text input.

To try out the demo, clone the enclosing git repo and navigate into the demo folder:

```
git clone https://github.com/jaqarrick/cssdom-info
cd cssdom-info/demo
```

Install the dependencies and launch the server

```
npm i

...

npm start
```

Once in the browser you can type raw css code into the text input. Try something that targets the box element with a selector `#box`.

```
#box { border-radius: 50% }
```

Once you've finished entering valid CSS code, the DOM will update. You can delete the code you've written and try something new:

```
body { background-color: wheat }
```

---

On every key stroke, our CSS parser checks if we have valid CSS code:

```
inputEl.addEventListener("keyup", e => {
	const cssString = e.target.value
	let ast = null
	try {
		ast = css.parse(cssString)
	} catch (err) {
		console.log(`Your CSS doesn't look quite right... keep typing`)
	}
	if (ast) {
		const rules = ast.stylesheet.rules
		addRules(rules)
	}
})
```

If we have valid code, the `addRules` function is called with an argument that contains the parsed CSS rules we've just written.

`addRules` extrapolates the `selector` and `declarations` from the rules array. A string of CSS code is passed to `insertRule`, which adds a new rule to our stylesheet.

```
const addRules = rules => {
	const styleSheet = styleElement.sheet
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i]
		const selectors = rule["selectors"].join(" ")
		const declarations = rule["declarations"]
			.map(declaration => {
				const { property, value } = declaration
				return `${property}: ${value};`
			})
			.join("")
		styleSheet.insertRule(`${selectors} { ${declarations} }`)
	}
}
```
