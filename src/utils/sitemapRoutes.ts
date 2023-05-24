const fs = require("fs");
const testFolder = "public";

const handleSitemapMedicine = async () => {
  const fileListArray: string[] = [];
  const myPromise = new Promise((resolve, reject) => {
    fs.readdir(testFolder, (err: any, files: any) => {
      if (err) reject("file read error!");
      files.forEach((file: any) => {
        if (file.includes(".xml")) {
          // console.log(file);
          fileListArray.push(file);
        }
      });
      resolve(fileListArray);
    });
  });
  const fileReadDone = await myPromise;

  return fileReadDone as string[];
};

export interface ISitemap {
  "sitemap-medicines.xml": () => Promise<string[]>;
}

const siteMapConfig: ISitemap = {
  "sitemap-medicines.xml": handleSitemapMedicine,
};

// Object.freeze(siteMapConfig);

export { siteMapConfig };
