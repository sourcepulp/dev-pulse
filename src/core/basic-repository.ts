/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/ban-types */
import { BaseDTO } from "./base-dto";
import { HttpClient } from "./http-client/http-client";
import { Repository, ResponseError } from "./repository";

export class BasicRepository<R extends BaseDTO> implements Repository<R> {
	httpClient: HttpClient;

	serviceUrl: string;

	constructor(httpClient: HttpClient, serviceUrl: string) {
		this.httpClient = httpClient;
		this.serviceUrl = serviceUrl;
	}

	async getAll(): Promise<R[]> {
		const response = await this.httpClient.get(`${this.serviceUrl}`);
		if (!response.ok) {
			const error = new Error("GET Error") as ResponseError;
			const body = (await response.json()) as { code: string };
			error.code = body.code;
			throw error;
		}
		return (await response.json()) as Promise<R[]>;
	}

	async getOneById(id: string | number): Promise<R> {
		const response = await this.httpClient.get(`${this.serviceUrl}${id}`);
		if (!response.ok) {
			const error = new Error("GET Error") as ResponseError;
			const body = (await response.json()) as { code: string };
			error.code = body.code;
			throw error;
		}
		return (await response.json()) as Promise<R>;
	}
}
