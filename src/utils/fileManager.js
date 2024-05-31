import fs from 'fs-extra';

const readJSONFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
};

const writeJSONFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing file:', err);
        throw err;
    }
};

export { readJSONFile, writeJSONFile };