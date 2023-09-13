import { createClient } from "@sanity/client";
import imgUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-01-12",
  token: process.env.REACT_APP_SANITY_SECRET_TOKEN,
});
const builder = imgUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
