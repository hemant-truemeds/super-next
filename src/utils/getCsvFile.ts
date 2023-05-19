import axios from "axios";
// import path from "path";
import https from "https";
import fs from "fs";

const getCsvFile = async () => {
  const GET_CSV_LINK_URL = "https://reports.tmmumbai.in/createCsvForSitemap";
  try {
    const fileUrl = await axios.get(GET_CSV_LINK_URL);

    const downloadFile = async (url = " ") => {
      const dirName = "src/sitemapTemp";
      if (fs.existsSync(dirName)) {
        fs.rmdirSync(dirName, { recursive: true });
        fs.mkdirSync(dirName, { recursive: true });
      } else {
        fs.mkdirSync(dirName, { recursive: true });
      }
      const filename = url.split("/")[url.split("/").length - 1];
      const customPathToSaveFile = `${dirName}/${filename}`;
      const checkIfDownloaded = () =>
        new Promise((resolve, reject) => {
          try {
            https.get(url, (res) => {
              const fileStream = fs.createWriteStream(customPathToSaveFile);
              res.pipe(fileStream);

              fileStream.on("finish", () => {
                fileStream.close();
                resolve(true);
                // console.log("Download finished");
              });
            });
          } catch (error) {
            reject(error);
          }
        });

      const isDownloaded = await checkIfDownloaded();

      return isDownloaded && customPathToSaveFile;
    };

    const downloadedFilePath = await downloadFile(fileUrl.data);

    return downloadedFilePath;
  } catch (error) {
    console.log(error);
  }
};

export { getCsvFile };
