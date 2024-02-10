import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const directoryPath = join(resolve(), 'dist'); // Ensure this points to your output directory correctly

// Function to recursively get all .js files
function getAllJsFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = join(dirPath, file);
    if (statSync(fullPath).isDirectory()) {
      getAllJsFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.js')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Function to append .js to import/export statements
function appendJsExtension(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const modifiedContent = content.replace(/(from\s+['"])(?!https?:\/\/)(.+?)((?=['"]\s*(?:;|$)))/g, (match, p1, p2, p3) => {
    // Append .js if not already there and not an absolute URL
    if (!p2.endsWith('.js') && !p2.startsWith('http') && !p2.endsWith('puppeteer') && !p2.endsWith('dotenv') && !p2.endsWith('fs/promises') && !p2.endsWith('fs')) {
      return `${p1}${p2}.js${p3}`;
    }
    return match; // Return original if conditions not met
  });

  writeFileSync(filePath, modifiedContent, 'utf8');
}

// Main function to process all files
function processFiles() {
  const allJsFiles = getAllJsFiles(directoryPath);
  allJsFiles.forEach(file => {
    appendJsExtension(file);
  });
}

processFiles();