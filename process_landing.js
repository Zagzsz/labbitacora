const fs = require('fs');
const path = require('path');
const srcDir = 'c:/Users/kikin/Documents/projectos/LabBitacora/labbitacora-landing/labbitacora-landing/components/landing';
const destDir = 'c:/Users/kikin/Documents/projectos/LabBitacora/frontend/src/components/Landing';

const files = fs.readdirSync(srcDir);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(path.join(srcDir, file), 'utf8');
    // Remove 'use client'
    content = content.replace(/\"use client\";\n?/g, '');
    content = content.replace(/\'use client\';\n?/g, '');
    // Replace next/link with react-router-dom
    content = content.replace(/import Link from [\"']next\/link[\"'];/g, 'import { Link } from \"react-router-dom\";');
    // Replace href= with to= in Link tags
    content = content.replace(/<Link([^>]*)href=/g, '<Link$1to=');
    // Add file extension back
    const destName = file.replace('.tsx', '.jsx');
    fs.writeFileSync(path.join(destDir, destName), content);
    console.log('Processed ' + destName);
  }
}

// Handle CSS
const cssPath = 'c:/Users/kikin/Documents/projectos/LabBitacora/labbitacora-landing/labbitacora-landing/app/landing.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');
const destCssPath = 'c:/Users/kikin/Documents/projectos/LabBitacora/frontend/src/pages/landing.css';
fs.writeFileSync(destCssPath, cssContent);

console.log('Done processing layout files.');
