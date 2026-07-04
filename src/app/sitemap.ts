import { MetadataRoute } from 'next';
// In a real app, you would fetch all categories and errors from the database here.
// import { db } from '@/db';
// import { errors, categories } from '@/db/schema';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hatacozumacil.com';

  // Example static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/kategoriler`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Example dynamic routes (these would come from NeonDB)
  const dynamicRoutes = [
    {
      url: `${baseUrl}/hata/windows/0x800f081f-guncellestirme-hatasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
