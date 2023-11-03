import { HackerNewsPost } from "../features/ingress/hacker-news/domain";
import { HackerNewsRepository } from "../features/ingress/hacker-news/repository";
import { BasicRepository } from "./basic-repository";
import { FetchApiHttpClient } from "./http-client/fetch-api-http-client";
import { HttpClient } from "./http-client/http-client";
import { Repository } from "./repository";

export class ApplicationContext {
	private static instance: ApplicationContext;
	private httpClient: HttpClient = new FetchApiHttpClient();

	private constructor() {}

	public static init() {
		ApplicationContext.instance = new ApplicationContext();
	}

	public static get(): ApplicationContext {
		if (!ApplicationContext.instance) {
			throw new Error("Application context not initialised");
		}
		return ApplicationContext.instance;
	}

	public getHttpClient(): HttpClient {
		return this.httpClient;
	}

	private hackerNewsRepository?: Repository<HackerNewsPost>;

	public getHackerNewsRepository(): Repository<HackerNewsPost> {
		if (!this.hackerNewsRepository) {
			this.hackerNewsRepository = new HackerNewsRepository(
				this.getHttpClient()
			);
		}
		return this.hackerNewsRepository;
	}
}
