// import * as path from "path";
// import * as fs from "fs";
import { CreateWebpackConfigArgs, NodePluginArgs } from "gatsby";
// import { createRemoteFileNode, FileSystemNode, CreateRemoteFileNodeArgs } from "gatsby-source-filesystem";
import express from "express";
import { createPages } from "./gatsby/createPages";
require('events').EventEmitter.defaultMaxListeners = 15;

const onCreateDevServer = ({ app }: any) => {
  app.use(express.static("static"));
};

const onCreateWebpackConfig = ({
  getConfig,
  actions,
}: {
  getConfig: CreateWebpackConfigArgs["getConfig"];
  actions: NodePluginArgs["actions"];
}) => {
  if (getConfig().mode !== "production") {
    actions.setWebpackConfig({
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre",
          },
        ],
      },
    });
  } else {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};

// type TouchNodeArgs = {
//   nodeId: string;
// };

// type SourceType = { mediaItemUrl: string; mediaItemId: string; modified: string; sourceUrl: string };

// type FileProcessorType = {
//   processType: string;
//   source: SourceType;
//   getNode: Function;
//   store: Store;
//   cache: Cache["cache"];
//   reporter: object;
//   touchNode: (args: TouchNodeArgs) => void;
//   createNodeId: Function;
//   createRemoteFileNode: (args: CreateRemoteFileNodeArgs) => Promise<FileSystemNode>;
//   pathPrefix?: string;
//   // createNodeField: any;
// };

// src: https://thoughtsandstuff.com/pulling-ordinary-files-from-wordpress-media-library-using-gatsby-resolvers/
// const createResolvers = ({
//   actions,
//   cache,
//   createNodeId,
//   createResolvers,
//   getNode,
//   store,
//   reporter,
// }: CreateResolversArgs) => {
//   const { createNode, touchNode } = actions;

//   const supportedExtensions = ["jpeg", "jpg", "png", "webp", "tif", "tiff"];

//   const checkIfCorrectFileType = ({
//     source,
//     processType,
//   }: {
//     source: { mediaItemUrl: string };
//     processType: string;
//   }) => {
//     // If the file is not a supported image, and we are meant
//     // to be checking images, return nothing to the resolver

//     const fileExt = source.mediaItemUrl.split(".").pop() ?? "";

//     if (processType === "image" && supportedExtensions.includes(fileExt)) {
//       return true;
//     }

//     if (processType === "document" && !supportedExtensions.includes(fileExt)) {
//       return true;
//     }

//     return false;
//   };

//   const fileProcessor = async ({
//     processType,
//     source,
//     getNode,
//     store,
//     cache,
//     reporter,
//     touchNode,
//     createNodeId,
//     createRemoteFileNode,
//     pathPrefix = "",
//   }: FileProcessorType) => {
//     if (source.mediaItemUrl) {
//       // Check the filetype here, rather than using the nodeFile extention
//       // function as it means we do not need to download the file twice
//       if (
//         checkIfCorrectFileType({
//           source,
//           processType,
//         })
//       ) {
//         let fileNodeID;
//         let fileNode: FileSystemNode;
//         let sourceModified;

//         // Set the file cacheID, get it (if it has already been set)
//         const mediaDataCacheKey = `wordpress-media-${source.mediaItemId}`;
//         const cacheMediaData = await cache.get(mediaDataCacheKey);

//         if (source.modified) {
//           sourceModified = source.modified;
//         }

//         // If we have cached media data and it wasn't modified, reuse
//         // previously created file node to not try to redownload
//         if (cacheMediaData && sourceModified === cacheMediaData.modified) {
//           fileNode = getNode(cacheMediaData.fileNodeID);

//           // check if node still exists in cache
//           // it could be removed if image was made private
//           // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//           if (fileNode) {
//             fileNodeID = cacheMediaData.fileNodeID;
//             // https://www.gatsbyjs.org/docs/node-creation/#freshstale-nodes
//             touchNode({
//               nodeId: fileNodeID,
//             });
//           }
//         }

//         // If we don't have cached data, download the file
//         if (!fileNodeID) {
//           try {
//             // Get the filenode
//             fileNode = await createRemoteFileNode({
//               url: source.mediaItemUrl || source.sourceUrl,
//               store,
//               cache,
//               createNode,
//               createNodeId,
//               reporter,
//             });
//             // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//             if (fileNode) {
//               fileNodeID = fileNode.id;

//               await cache.set(mediaDataCacheKey, {
//                 fileNodeID,
//                 modified: sourceModified,
//               });
//             }
//           } catch (e) {
//             // Ignore
//             // eslint-disable-next-line no-console
//             console.error(e);

//             return null;
//           }
//         }

//         // If this is a document, it needs to moved to the
//         // static folder if it has not been moved yet
//         if (processType === "document") {
//           // @ts-ignore
//           const fileName = `${fileNode.name}-${fileNode.internal.contentDigest}${fileNode.ext}`;

//           const publicPath = path.join(process.cwd(), `public`, `static`, fileName);

//           // if the file does not exist
//           if (!fs.existsSync(publicPath)) {
//             // @ts-ignore
//             fs.copyFile(fileNode.absolutePath, publicPath, (err) => {
//               if (err) {
//                 // eslint-disable-next-line no-console
//                 console.error(`error copying file from ${fileNode.absolutePath} to ${publicPath}`, err);
//               }
//             });
//           }

//           return `${pathPrefix}/static/${fileName}`;
//         }

//         // @ts-ignore
//         // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//         if (fileNode) {
//           return fileNode;
//         }
//       }
//     }

//     return null;
//   };

//   createResolvers({
//     Wordpress_MediaItem: {
//       imageFile: {
//         type: `File`,
//         resolve: async (source: SourceType) => {
//           return fileProcessor({
//             processType: "image",
//             source,
//             getNode,
//             touchNode,
//             store,
//             cache,
//             reporter,
//             createNodeId,
//             createRemoteFileNode,
//           });
//         },
//       },
//       staticUrl: {
//         type: `String`,
//         resolve: async (source: SourceType) => {
//           const outcome = await fileProcessor({
//             processType: "document",
//             source,
//             getNode,
//             touchNode,
//             store,
//             cache,
//             reporter,
//             createNodeId,
//             createRemoteFileNode,
//           });

//           return outcome;
//         },
//       },
//     },
//   });
// };

export { createPages, onCreateWebpackConfig, onCreateDevServer };
