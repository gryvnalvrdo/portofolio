const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Add import
if (!content.includes('RevealWrapper')) {
  content = content.replace(
    'import Link from "next/link";',
    'import Link from "next/link";\nimport RevealWrapper from "@/components/RevealWrapper";'
  );
}

// Replace each bento box
const boxes = [
  'box-hero', 'box-ecosystem', 'box-project-1', 'box-project-2',
  'box-project-3', 'box-skills', 'box-experience', 'box-contact'
];

let delay = 0;
for (const box of boxes) {
  const openTagRegex = new RegExp(`<div className="bento-box ${box}">`, 'g');
  if (content.match(openTagRegex)) {
    // Find where the box starts
    let startIndex = content.indexOf(`<div className="bento-box ${box}">`);
    if (startIndex !== -1) {
      // Find the corresponding closing div
      let depth = 0;
      let i = startIndex;
      let openDivCount = 0;
      let closedDivCount = 0;
      let foundEnd = -1;
      
      const chunk = content.slice(startIndex);
      const divMatches = [...chunk.matchAll(/<(\/?)div/g)];
      
      for (const match of divMatches) {
        if (match[1] === '') {
          depth++;
        } else if (match[1] === '/') {
          depth--;
        }
        if (depth === 0) {
          foundEnd = startIndex + match.index;
          break;
        }
      }
      
      if (foundEnd !== -1) {
        // Replace opening tag
        const d = delay * 100;
        content = content.substring(0, startIndex) +
                  `<RevealWrapper delay={${d}} className="bento-box ${box}">` +
                  content.substring(startIndex + `<div className="bento-box ${box}">`.length);
        
        // After replacing open tag, length changed
        const diff = `<RevealWrapper delay={${d}} className="bento-box ${box}">`.length - `<div className="bento-box ${box}">`.length;
        foundEnd += diff;
        
        // Replace closing tag
        content = content.substring(0, foundEnd) +
                  `</RevealWrapper>` +
                  content.substring(foundEnd + `</div>`.length);
      }
    }
  }
  delay++;
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done replacing');
