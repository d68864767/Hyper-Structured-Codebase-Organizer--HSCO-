```javascript
// Importing required modules
const fs = require('fs');
const path = require('path');

// File Tree Generator Class
class FileTreeGenerator {
    constructor() {
        this.fileTree = {};
    }

    // Method to generate the initial file tree
    async generate() {
        try {
            // Get the root directory
            const rootDir = path.dirname(require.main.filename);

            // Generate the file tree
            this.fileTree = await this._generateFileTree(rootDir);

            return this.fileTree;
        } catch (error) {
            console.error(`Error in generating file tree: ${error.message}`);
            throw error;
        }
    }

    // Recursive method to generate the file tree
    async _generateFileTree(dir) {
        try {
            // Get all files and directories in the current directory
            const filesAndDirs = await fs.promises.readdir(dir, { withFileTypes: true });

            // Initialize the file tree for the current directory
            const fileTree = {};

            // Iterate over each file and directory
            for (const fileOrDir of filesAndDirs) {
                // If it's a directory, generate the file tree for it
                if (fileOrDir.isDirectory()) {
                    fileTree[fileOrDir.name] = await this._generateFileTree(path.join(dir, fileOrDir.name));
                } else {
                    // If it's a file, add it to the file tree
                    fileTree[fileOrDir.name] = null;
                }
            }

            return fileTree;
        } catch (error) {
            console.error(`Error in generating file tree for directory ${dir}: ${error.message}`);
            throw error;
        }
    }
}

// Export the File Tree Generator class
module.exports = new FileTreeGenerator();
```
