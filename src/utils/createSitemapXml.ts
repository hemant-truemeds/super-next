let csvToJson = require("convert-csv-to-json");
import fs from "fs";
import { divideArray } from "./divideSitemapArray";

const createSitemapXml = (filePath: string) => {
  const EXTERNAL_DATA_URL = "https://www.truemeds.in";
  let pathOfXmlFiles = "public";
  // convert csv to json
  const jsonFromCsv = csvToJson.getJsonFromCsv(filePath);
  // convert json to iterable array of object
  const arrObj = jsonFromCsv.map((item: any) =>
    Object.entries(item).reduce((acc, [key, value]) => {
      const keyArray = key.split(",");
      /* @ts-ignore*/
      const valueArray = value.split(",");
      return keyArray.reduce((obj, item, index) => {
        return { ...obj, [item]: valueArray[index] };
      }, acc);
    }, {})
  );

  const createMultipleSitemap = () => {
    const listOfArrays = divideArray(arrObj);

    for (let index in listOfArrays) {
      // creating final sitemap file content
      const finalSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <!--We manually set the two URLs we know already-->
            ${listOfArrays[index]
              .map(({ product_url_suffix }: any) => {
                return `
                  <url>
                      <loc>${`${EXTERNAL_DATA_URL}/${product_url_suffix
                        ?.trim()
                        ?.replace(/\s/g, "-")}`}</loc>
                  </url>
            `;
              })
              .join("")}
          </urlset>
        `;

      // create sitemap.xml file (optional in nextjs)
      fs.appendFile(
        `${pathOfXmlFiles}/sitemap${index}.xml`,
        finalSitemapContent,
        (err) => {
          if (err) console.log(err);
          // console.log("file created!");
        }
      );
    }
  };

  createMultipleSitemap();
  // return finalSitemapContent;
  return pathOfXmlFiles;
};

export { createSitemapXml };
