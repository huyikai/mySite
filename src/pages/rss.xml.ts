import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context: any) {
  const blogs = await getCollection('blogs');
  return rss({
    title: 'Astro Learner | Blog',
    description: 'My journey learning Astro',
    site: context.site,
    items: blogs.map((blog) => ({
      title: blog.data.title,
      pubDate: blog.data.pubDate,
      description: blog.data.description,
      link: `/blogs/${blog.slug}/`
    })),
    customData: `<language>en-us</language>`
  });
}
