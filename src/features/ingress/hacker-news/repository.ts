import { BasicRepository } from "../../../core/basic-repository";
import { HttpClient } from "../../../core/http-client/http-client";
import { Repository } from "../../../core/repository";
import { HackerNewsPost, HackerNewsResponse } from "./domain";

export class HackerNewsRepository implements Repository<HackerNewsPost> {
	httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	async getAll(): Promise<HackerNewsPost[]> {
		const url = "https://hn.algolia.com/api/v1/search?tags=front_page";
		const response = await this.httpClient.get(url).catch((error) => {
			throw error;
		});
		const responseObject = (await response.json()) as HackerNewsResponse;
		return responseObject.hits;
	}

	async getOneById(id: string | number): Promise<HackerNewsPost> {
		const url = `https://hn.algolia.com/api/v1/items/${id}`;
		const response = await this.httpClient.get(url).catch((error) => {
			throw error;
		});
		const responseObject = (await response.json()) as HackerNewsPost;
		return responseObject;
	}
}
