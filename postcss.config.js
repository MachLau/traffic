/* eslint-disable no-undef */
module.exports = ({ env }) => {
  const plugins = [require("autoprefixer")];
  if (env === "production") {
    plugins.push(require("cssnano")({ safe: true, minifyFontValues: false }));
  }
  // const isInfiniteUITheme =
  //   /@ali\/infinite-ui\/es\/theme\/\S+\.theme\.css/.test(file);
  // const isInfiniteUIComponent = /@ali\/infinite-ui\/es\/components/.test(file);
  // const viewportWidth = isInfiniteUIComponent || isInfiniteUITheme ? 375 : 750;
  const basePx2VwOptions = {
    unitToConvert: "px",
    viewportWidth: 375,
    unitPrecision: 3,
    propList: ["*"],
    viewportUnit: "vw",
    fontViewportUnit: "vw",
    selectorBlackList: [],
    minPixelValue: 1,
    mediaQuery: false,
    replace: true,
    landscape: false,
  };
  plugins.push(require("postcss-px-to-viewport")(basePx2VwOptions));

  return {
    plugins,
  };
};
