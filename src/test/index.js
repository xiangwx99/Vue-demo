const { stringifyQuery } = require("vue-router");

const str =
  "https://lanhuapp.com/web/#/item/project/door?tid=e4a43d34-5e11-4093-aceb-f89a3dbf9a30&pid=73e41f01-24f6-4f39-a1b3-a26b6841d397&docId=a179a41c-db2c-4f5e-b7e8-6e461fb0879f&docType=axure&image_id=a179a41c-db2c-4f5e-b7e8-6e461fb0879f&pwd=LGb6&activeSectionId=&teamId=dbfe9ae7-d754-4d27-923f-993282b35373&userId=362cc3ad-3856-4845-b2cd-9e01ec017f50&versionId=c8087679-0fb6-41dc-a9e4-a466358a5de0&pageId=fb0a7fa51ad54baf9718cb8a47b7f7bc&parentId=fe03e641-1f68-4909-9d14-079c2d2423e7&type=share_board&toName=product";

console.log(
  str
    .split("&")
    .filter((item) => item.indexOf("pwd") === -1)
    .join("&")
);
