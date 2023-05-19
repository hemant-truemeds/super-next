import { firstStaticXml } from "@constants/staticXml";
import { GetServerSidePropsContext } from "next";
import { createSitemapXml } from "src/utils/createSitemapXml";
import { getCsvFile } from "src/utils/getCsvFile";
import { ISitemap, siteMapConfig } from "src/utils/sitemapRoutes";

const SitemapId = () => {
  //   return <div>SitemapId</div>;
};

export async function getServerSideProps({
  res,
  params,
}: GetServerSidePropsContext) {
  const { sitemapid = "" } = params || {};
  // console.log(sitemapid);
  // We generate the XML sitemap
  const pathOfDownloadedCsv = await getCsvFile();
  const sitemap = createSitemapXml(pathOfDownloadedCsv as string);
  //   console.log({ sitemapid });

  if (siteMapConfig.hasOwnProperty(sitemapid as string)) {
    // console.log(sitemapid);
    // console.log();
    const getData = siteMapConfig[sitemapid as keyof ISitemap];
    const data = getData();

    res.setHeader("Content-Type", "text/xml");
    res.write(`${data}`);
  } else {
    res.statusCode = 404;
  }

  // we send the XML to the browser
  res.end();

  return {
    props: {},
  };
}

export default SitemapId;
