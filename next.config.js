const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
  images: {
    domains: ["assets.truemeds.in", "truemedsblog.in", "www.truemeds.in"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
