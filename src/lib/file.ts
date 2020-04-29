const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

export const createFile = (data: string, fileName: string) => {
  try {
    mkdirp(getDirName(fileName), function(err: Error) {
      if (err) {
        console.log(err);
      }

      fs.writeFileSync(fileName, data);
    });
  } catch (error) {
    console.log('Failed creating file');
  }
};
