import { HackerNewsPost } from "../features/ingress/hacker-news/domain";
import { BasicRepository } from "./basic-repository";
import { FetchApiHttpClient } from "./http-client/fetch-api-http-client";
import { HttpClient } from "./http-client/http-client";
import { Repository } from "./repository";

export class ApplicationContext {
	private static instance: ApplicationContext;
	private httpClient: HttpClient = new FetchApiHttpClient();

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
		return ApplicationContext.get().httpClient;
	}

	private hackerNewsRepository?: Repository<HackerNewsPost>;

	public getHackerNewsRepository() {
		if (!ApplicationContext.get().hackerNewsRepository) {
			const serviceUrl = "test";
			ApplicationContext.instance.hackerNewsRepository =
				new BasicRepository<HackerNewsPost>(
					ApplicationContext.instance.getHttpClient(),
					serviceUrl
				);
		}
		return ApplicationContext.get().hackerNewsRepository;
	}
}
