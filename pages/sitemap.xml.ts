import { firstStaticXml } from "@constants/staticXml";
import { GetServerSidePropsContext } from "next";
import { createSitemapXml } from "src/utils/createSitemapXml";
import { getCsvFile } from "src/utils/getCsvFile";

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  // We generate the XML sitemap
  // const pathOfDownloadedCsv = await getCsvFile();
  // const sitemap = createSitemapXml(pathOfDownloadedCsv as string);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(firstStaticXml);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
