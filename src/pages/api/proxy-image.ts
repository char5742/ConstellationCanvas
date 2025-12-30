export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url).searchParams.get("url");
	if (!url) {
		return new Response("URL is required", { status: 400 });
	}
	const response = await fetch(url);
	return new Response(response.body, {
		status: response.status,
		headers: {
			"Content-Type": response.headers.get("Content-Type") || "image/png",
		},
	});
};
