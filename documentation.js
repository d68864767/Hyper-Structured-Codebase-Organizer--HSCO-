```javascript
// Importing required modules
const fs = require('fs');
const path = require('path');

// Documentation Class
class Documentation {
    constructor() {
        this.fileTree = {};
    }

    // Method to generate documentation for the file tree
    async generate(fileTree) {
        try {
            // Store the file tree
            this.fileTree = fileTree;

            // Generate documentation
            const documentation = this._generateDocumentation(this.fileTree);

            // Write the documentation to a file
            await this._writeToFile(documentation);

            console.log('Documentation generated successfully.');
        } catch (error) {
            console.error(`Error in generating documentation: ${error.message}`);
            throw error;
        }
    }

    // Private method to generate documentation
    _generateDocumentation(fileTree, depth = 0) {
        let documentation = '';

        for (const [name, value] of Object.entries(fileTree)) {
            // Add indentation based on depth
            documentation += '  '.repeat(depth);

            if (typeof value === 'object') {
                // If the value is an object, it's a directory
                documentation += `- ${name}/\n`;

                // Recursively generate documentation for the directory
                documentation += this._generateDocumentation(value, depth + 1);
            } else {
                // If the value is not an object, it's a file
                documentation += `- ${name}\n`;
            }
        }

        return documentation;
    }

    // Private method to write the documentation to a file
    async _writeToFile(documentation) {
        const filePath = path.join(__dirname, 'DOCUMENTATION.md');

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, documentation, 'utf8', (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }
}

// Export the Documentation class
module.exports = new Documentation();
```
