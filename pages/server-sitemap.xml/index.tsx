import { firstStaticXml } from "@constants/staticXml";
import { GetServerSidePropsContext } from "next";
import { createSitemapXml } from "src/utils/createSitemapXml";
import { getCsvFile } from "src/utils/getCsvFile";

const ServerSiteMapXml = () => {
  //   return <div>ServerSiteMapXml</div>;
};

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  // We generate the XML sitemap
  const pathOfDownloadedCsv = await getCsvFile();
  const sitemap = createSitemapXml(pathOfDownloadedCsv as string);

  //   res.setHeader("Content-Type", "text/xml");
  //   // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default ServerSiteMapXml;
