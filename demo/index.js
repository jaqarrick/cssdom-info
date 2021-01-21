import css from "css"
const inputEl = document.querySelector("input")

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

const styleElement = document.createElement("style")
document.head.appendChild(styleElement)

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
