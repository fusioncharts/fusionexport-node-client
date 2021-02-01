const path = require('path');
const fs = require('fs');
const minify = require('minify');

function generateMinfiedFiles () {
     return async (file) => { 
       const externalDir = path.dirname(file.externalPath);
       const fileName = path.basename(file.internalPath);
       const newPath = `${externalDir}/${fileName}`;

       return await minify(file.externalPath, {
          html: {
              removeAttributeQuotes: true,
              removeOptionalTags: true
          },
          js: {
            toplevel: true,
          },
          css: {
            compatibility: "*",
          },

        }).then((newfile) => {
          try {
            fs.writeFileSync(newPath, newfile);
            return {
              ...file,
              externalPath: newPath
            };
          } catch (err) {
            if (err.code !== "EEXIST") {
              console.error("Something went went wrong while minifying resources.", err);
              throw err;
            }
          } 
        });
      }
  }

  module.exports = generateMinfiedFiles;