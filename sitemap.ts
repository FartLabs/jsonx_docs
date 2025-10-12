import { saveSitemap } from "@elsoul/fresh-sitemap";

await saveSitemap(
  // TODO: update this with your actual domain
  "https://www.example.com",
  "routes",
  "",
  "static/sitemap.xml",
);
