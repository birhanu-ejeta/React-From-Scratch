# TypeScript

Typescript is javascript +type

## what is difference between javascript and typescript

# Some Funny about Javascript

`[]+[]='';
[]+{}=Object Object
{}+[]=NaN
`
Gemini said
If you are looking for a way to structure the comparison between JavaScript and TypeScript using a markup language like Markdown (ideal for GitHub READMEs or technical blogs), here is a clean, organized breakdown.

🚀 JavaScript vs. TypeScript: The Core Differences
TypeScript is a superset of JavaScript. This means any valid JavaScript code is also valid TypeScript code, but TypeScript adds a layer of static typing on top of it.

📊 Comparison Table
Feature	JavaScript (JS)	TypeScript (TS)
Type System	Dynamic: Types are checked at runtime.	Static: Types are checked during development.
Compilation	Interpreted directly by the browser.	Needs to be transpiled into JS before running.
Error Detection	Errors are often found only when the app crashes.	Errors are caught instantly in your editor.
Scalability	Harder to maintain in very large projects.	Excellent for large-scale enterprise apps.
Learning Curve	Easy to start; very flexible.	Steeper; requires learning type syntax.
💻 Code Example Comparison
1. JavaScript (Flexible but Risky)
In JS, you can pass a string to a function meant for numbers, and it won't complain until it's too late.

JavaScript
function addNumbers(a, b) {
  return a + b;
}

console.log(addNumbers(5, "10")); // Output: "510" (Wait, that's not math!)
2. TypeScript (Strict and Safe)
In TS, you define the types. If you try to pass the wrong data, your editor will show a red underline immediately.

TypeScript
function addNumbers(a: number, b: number): number {
  return a + b;
}

// @ts-expect-error: This will trigger a compile error!
console.log(addNumbers(5, "10")); 
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
🛠 Why Choose One Over the Other?
Use JavaScript when:

You are building a small, simple project.

You want to prototype an idea very quickly.

You are just starting to learn the fundamentals of web development.

Use TypeScript when:

You are working on a MERN stack or FastAPI/Next.js project with many components.

You are working in a team where you need to understand each other's code easily.

You want "Autocomplete" features that actually know what properties exist on your objects.

Note: Browsers cannot run TypeScript directly. You must use a compiler (like tsc) to turn your .ts files into .js files so the browser can understand them.
