import ogs from "open-graph-scraper";
import type { Node } from "unist";
import { visit } from "unist-util-visit";

interface LinkCardNode extends Node {
	type: "html";
	value: string;
	children: [];
}

interface LinkNode extends Node {
	type: "link";
	url: string;
}

interface ParagraphNode extends Node {
	type: "paragraph";
	children: Node[];
}

export function remarkLinkCard() {
	return async (tree: Node) => {
		const tasks: Array<() => Promise<void>> = [];
		visit(tree, "paragraph", (node: ParagraphNode) => {
			if (
				node.children &&
				node.children.length === 1 &&
				node.children[0].type === "link"
			) {
				const linkNode = node.children[0] as LinkNode;
				if (linkNode.url?.startsWith("http")) {
					const task = async () => {
						const metadata = await fetchMetadata(linkNode.url);
						const nodeData = JSON.stringify({
							...metadata,
							url: linkNode.url,
						}).replace(/"/g, "&quot;");
						(node as unknown as LinkCardNode).type = "html";
						(node as unknown as LinkCardNode).value =
							`<link-card node="${nodeData}"></link-card>`;
						(node as unknown as LinkCardNode).children = [];
					};
					tasks.push(task);
				}
			}
		});
		await Promise.all(tasks.map((task) => task()));
	};
}

async function fetchMetadata(url: string): Promise<{
	title: string;
	description: string;
	imageUrl: string;
	faviconUrl: string;
}> {
	try {
		const { result } = await ogs({ url });
		return {
			title: result.ogTitle || "",
			description: result.ogDescription || "",
			imageUrl: result.ogImage?.[0].url ? result.ogImage[0].url : "",
			faviconUrl: `https://www.google.com/s2/favicons?domain=${
				new URL(url).hostname
			}`,
		};
	} catch (e) {
		return {
			title: "",
			description: "",
			imageUrl: "",
			faviconUrl: "",
		};
	}
}
