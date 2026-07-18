const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src");
const OUTPUT_DIR = path.join(__dirname, "output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "folder_structure.txt");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const exclude = [
  ".DS_Store",
  ".next",
  "node_modules",
  "dist",
  "coverage",
  ".git",
];

const commentMap = {
  app: "Next.js App Router",
  components: "Reusable React components",
  config: "Application configuration",
  data: "Designer JSON files",
  lib: "Utilities & helpers",
  styles: "Global styles",
  types: "Shared TypeScript types",
  ui: "Reusable UI primitives",
  sections: "Portfolio sections",
};

function generateTree(dir, prefix = "") {
  let items = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((item) => !exclude.includes(item.name));

  // Directories first, then files
  items.sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) {
      return a.isDirectory() ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  if (items.length === 0) return "";

  const maxLength = Math.max(...items.map((item) => item.name.length));

  let result = "";

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");

    const comment = commentMap[item.name]
      ? `# ${commentMap[item.name]}`
      : "";

    result +=
      prefix +
      pointer +
      item.name.padEnd(maxLength + 4) +
      
      "\n";

    if (item.isDirectory()) {
      result += generateTree(path.join(dir, item.name), nextPrefix);
    }
  });

  return result;
}

const structure =
  path.basename(SRC_DIR) + "/\n" + generateTree(SRC_DIR);

fs.writeFileSync(OUTPUT_FILE, structure);

console.log(`✅ Folder structure saved to ${OUTPUT_FILE}`);