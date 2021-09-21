const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  typescript: {
    check: true,
    checkOptions: {
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
    },
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },

  webpackFinal: (config, { configType }) => {
    const cssRule = config.module.rules.find((rule) => rule.test && rule.test.test(".css"));

    // We exclude `*.module.css` files from the previous rule
    cssRule.exclude = /\.module\.css$/;

    // We add a our custom rule for `*.module.css` files
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
      ],
    });

    return config;
  },
};
