const path = require('path');
const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;
const minify = require('minify');
const {getRelativePathFrom} = require('./utils');

function generateMinfiedFiles () {
   return async ({file, type, zipbag}) => { 
     const externalDir = path.dirname(file.externalPath);
     const fileName = path.basename(file.internalPath);
     const newPath = `${externalDir}/${fileName}`;
     const isHtml = type===".html";
     let htmlFile = "";

     if (isHtml) {
       htmlFile = fs.readFileSync(file.externalPath);
       const jsdom = new JSDOM(htmlFile);
       const { window: { document } } = jsdom;
       updateHtml(document, "script", zipbag);
       updateHtml(document, "link", zipbag);
       htmlFile=`${externalDir}/temp.fusionexport.html`;
       fs.writeFileSync(htmlFile, jsdom.serialize());
     }

     return await minify(isHtml ?htmlFile :file.externalPath, {
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
          if (isHtml) fs.unlinkSync(htmlFile);
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

function updateHtml (document, target, zipbag) {
  const property = target=="script" || target=="img" ?"src" :"href";
  document.querySelectorAll(target).forEach((item) => {
    const file = zipbag.find(i => i.externalPath.match(item[property]) && item[property].length>0);
    if (file) {
      item[property] = getRelativePathFrom(file.internalPath, "template");
    }
  });
}

module.exports = generateMinfiedFiles;