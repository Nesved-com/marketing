import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/suite", priority: 0.9, changeFrequency: "weekly" },
    { path: "/pos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/live", priority: 0.7, changeFrequency: "monthly" },
    { path: "/roomanddine", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/invobuk", priority: 0.8, changeFrequency: "weekly" },
    { path: "/download", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
