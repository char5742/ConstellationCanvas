import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()),
		relatedPosts: z.array(reference("blog")).optional(),
		prevPost: reference("blog").optional(),
		nextPost: reference("blog").optional(),
	}),
});

export const collections = { blog };
