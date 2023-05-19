const fs = require("fs");
const testFolder = "src/sitemapTemp";

const handleSitemapMedicine = () => {
  fs.readdir(testFolder, (err: any, files: any) => {
    files.forEach((file: any) => {
      console.log(file);
    });
  });
  return "";
};

export interface ISitemap {
  "sitemap-medicines.xml": () => string;
}

const siteMapConfig: ISitemap = {
  "sitemap-medicines.xml": handleSitemapMedicine,
};

Object.freeze(siteMapConfig);

export { siteMapConfig };
