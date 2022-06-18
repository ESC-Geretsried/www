/* eslint-disable babel/camelcase */
require("dotenv").config({});
require("ts-node").register({
  transpileOnly: true,
});

const { plugin: addPlugin } = require("@graphql-codegen/add");

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.esc-geretsried.de",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: process.env.GATSBY_WORDPRESS_GRAPHQL_URL,
        schema: {
          typePrefix: "Wordpress_",
        },
      },
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: "./graphql-types.ts",
        documentPaths: ["./src/**/*.{ts,tsx}", "./node_modules/gatsby-*/**/*.js", "./gatsby/**/*.{ts,tsx}"],
        pluckConfig: {
          modules: [{ name: "gatsby", identifier: "graphql" }],
          globalGqlIdentifierName: "graphql",
        },
        codegenConfig: {
          reactApolloVersion: 3,
          withComponent: false,
          withHooks: false,
          withHOC: false,
          withResultType: false,
          withMutationOptionsType: false,
          addDocBlocks: false,
          withRefetchFn: false,
          withMutationFn: false,
        },
        codegenPlugins: [
          {
            resolve: addPlugin,
            options: {
              content: "/* eslint-disable */",
            },
          },
        ],
        // additionalSchema: [
        //   {
        //     key: "apollo",
        //     fileName: "graphql-types-apollo.ts",
        //     documentPaths: ["./src/**/*.{ts,tsx}"],
        //     schema: process.env.GATSBY_WORDPRESS_GRAPHQL_URL,
        //   },
        // ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/templates/pages/custom`,
      },
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: process.env.URL,
      },
    },

    {
      resolve: "gatsby-plugin-antd",
    },
    {
      resolve: "gatsby-plugin-emotion",
      options: {
        cssPropOptimization: false,
      },
    },

    "gatsby-plugin-typescript",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    // { resolve: "gatsby-plugin-sitemap",
    //   options: {
    //     exclude: ["/*/404"],
    //   },
    // },
    "gatsby-plugin-robots-txt",
    {
      resolve: "gatsby-plugin-netlify",
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "ESC River Rats Geretsried",
        short_name: "River Rats",
        icon: "src/assets/logo.png",
        start_url: "/",
        background_color: "#46e1c8",
        theme_color: "#127373",
        display: "standalone",
      },
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        disable: true,
        // analyzerMode: "static",
      },
    },
  ],
};
