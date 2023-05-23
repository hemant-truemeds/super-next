import { firstStaticXml } from "@constants/staticXml";
import { GetServerSidePropsContext } from "next";
import { createSitemapXml } from "src/utils/createSitemapXml";
import { getCsvFile } from "src/utils/getCsvFile";
import { ISitemap, siteMapConfig } from "src/utils/sitemapRoutes";

const generateSiteMapIndex = (fileList: string[]) => {
  return `<?xml
version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
   ${fileList.map((item) => {
     return `<sitemap>
                <loc>http://localhost:3000/${item}</loc>
            </sitemap>`;
   })}
</sitemapindex>`;
};

export async function getServerSideProps({
  res,
  params,
}: GetServerSidePropsContext) {
  const { sitemapid = "" } = params || {};

  const pathOfDownloadedCsv = await getCsvFile();
  createSitemapXml(pathOfDownloadedCsv as string);

  const getData = siteMapConfig[sitemapid as keyof ISitemap];
  const fileList = await getData();
  const finalXml = generateSiteMapIndex(fileList);

  res.setHeader("Content-Type", "text/xml");
  res.write(finalXml);

  // if (siteMapConfig.hasOwnProperty(sitemapid as string)) {
  //   // console.log(sitemapid);
  //   // console.log();
  //   const getData = siteMapConfig[sitemapid as keyof ISitemap];
  //   const data = getData();
  //   const finalXml = fileListSiteMapIndex(data);
  //   console.log({ finalXml });
  //   res.setHeader("Content-Type", "text/xml");
  //   res.write(finalXml);
  // } else {
  //   res.statusCode = 404;
  // }

  // we send the XML to the browser
  res.end();

  return {
    props: {},
  };
}

export default function SitemapId() {}
