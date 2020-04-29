const fs = require('fs');

export const createFile = (data: string, fileName: string) => {
  try {
    fs.writeFileSync(fileName, data);
  } catch (error) {
    console.log('Failed creating file');
  }
};
