import fs from "node:fs";

const tokens = JSON.parse(fs.readFileSync("./src/tokens.json", "utf8"));

function processTokens(obj, prefix = "") {
	let css = "";

	for (const [key, value] of Object.entries(obj)) {
		// Skip the mode wrapper (e.g., "primitives/Mode 1")
		if (key.includes("/Mode")) {
			css += processTokens(value, prefix);
			continue;
		}

		const kebabKey = key.replace(/\s+/g, "-").toLowerCase();
		const newPrefix = prefix ? `${prefix}-${kebabKey}` : kebabKey;

		if (value && typeof value === "object") {
			// Check if it's a token object with "$value" property
			if (value.$value !== undefined) {
				let finalValue = value.$value;

				// Handle token references like {primitive.color.green.10}
				if (
					typeof finalValue === "string" &&
					finalValue.startsWith("{") &&
					finalValue.endsWith("}")
				) {
					const ref = finalValue
						.slice(1, -1) // Remove { }
						.replace(/\./g, "-") // dots to dashes
						.replace(/\s+/g, "-") // spaces to dashes
						.toLowerCase();
					finalValue = `var(--${ref})`;
				}
				// Add 'px' to numbers for spacing, radius, and font sizes
				else if (
					typeof finalValue === "number" &&
					(newPrefix.includes("spacing") ||
						newPrefix.includes("radius") ||
						newPrefix.includes("font-size"))
				) {
					finalValue = `${finalValue}px`;
				}

				css += `  --${newPrefix}: ${finalValue};\n`;
			} else {
				// It's a nested object, recurse
				css += processTokens(value, newPrefix);
			}
		}
	}

	return css;
}

const cssContent = `:root {\n${processTokens(tokens)}}`;

// Write to file
fs.writeFileSync("src/tokens.css", cssContent);

console.log("✅ CSS tokens created at src/tokens.css");
console.log("\nGenerated CSS variables:");
const lines = cssContent.split("\n");
console.log(lines.slice(0, 20).join("\n"));
if (lines.length > 20) {
	console.log(`... and ${lines.length - 20} more`);
}
