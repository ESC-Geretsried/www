import { GatsbyConfig } from "gatsby";
require("dotenv").config();

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "esc-geretsried-2.0",
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-wordpress",
      options: {
        schema: {
          perPage: 20, // currently set to 100

          requestConcurrency: 5, // currently set to 15

          previewRequestConcurrency: 2, // currently set to 5
        },
        url: process.env.GATSBY_WORDPRESS_GRAPHQL_URL,

        html: {
          imageMaxWidth: 1024,
          fallbackImageMaxWidth: 1024,
          generateWebpImages: true,
        },
        type: {
          User: {
            exclude: true,
          },
          UserRole: {
            exclude: true,
          },
          Tag: {
            exclude: true,
          },
          Comment: {
            exclude: true,
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        outputPath: "src/__generated__/gatsby-types.d.ts",
      },
    },
    // "gatsby-plugin-loadable-components-ssr",
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        isUsingColorMode: false,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "./src/assets/favicon.svg",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-svg",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
    },
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-force-trailing-slashes",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/translation/",
      },
    },
    // {
    //   resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
    //   options: {
    //     // analyzerMode: "server",
    //     // analyzerPort: "3001",
    //     // analyzerHost: "http://myhost.com",
    //     // defaultSizes: "gzip",
    //   },
    // },
  ],
};

export default config;
