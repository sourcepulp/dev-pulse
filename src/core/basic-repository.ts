/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/ban-types */
import { BaseDTO } from "./base-dto";
import { HttpClient } from "./http-client/http-client";
import { Repository, ResponseError } from "./repository";

type Headers = {
	headers: {
		[key: string]: string;
	};
};

export class BasicRepository<R extends BaseDTO, C extends Object, U> implements Repository<R, C, U> {
	httpClient: HttpClient;

	serviceUrl: string;

	activeTenantId: string;

	constructor(httpClient: HttpClient, serviceUrl: string, activeTenantId: string) {
		this.httpClient = httpClient;
		this.serviceUrl = serviceUrl;
		this.activeTenantId = activeTenantId;
	}

	private async getHeaders(): Promise<Headers> {
		const currentUser = await Auth.currentAuthenticatedUser();
		const idToken = currentUser.getSignInUserSession()?.getIdToken();
		return {
			headers: {
				authorization: `Bearer ${idToken.getJwtToken()}`,
				"x-billsaas-tenantid": this.activeTenantId
			}
		};
	}

	async getAllForTenant(): Promise<R[]> {
		const headers = await this.getHeaders();
		const response = await this.httpClient.get(`${this.serviceUrl}`, headers);
		if (!response.ok) {
			const error = new Error("GET Error") as ResponseError;
			const body = (await response.json()) as { code: string };
			error.code = body.code;
			throw error;
		}
		return (await response.json()) as Promise<R[]>;
	}

	async createOneForTenant(payload: C, urlExtension?: string): Promise<R> {
		const headers = await this.getHeaders();
		const buildUrl = urlExtension ? `${this.serviceUrl}${urlExtension}` : `${this.serviceUrl}`;
		const response = await this.httpClient.post(buildUrl, payload, headers);
		if (!response.ok) {
			const error = new Error("POST Error") as ResponseError;
			const body = (await response.json()) as { code: string };
			error.code = body.code;
			throw error;
		}
		return (await response.json()) as Promise<R>;
	}

	async getOneById(id: string): Promise<R> {
		const headers = await this.getHeaders();
		const response = await this.httpClient.get(`${this.serviceUrl}${id}`, headers);
		if (!response.ok) {
			const error = new Error("GET Error") as ResponseError;
			const body = (await response.json()) as { code: string };
			error.code = body.code;
			throw error;
		}
		return (await response.json()) as Promise<R>;
	}

	async updateOneById<T>(id: string, payload: T): Promise<R> {
		const headers = await this.getHeaders();
		const response = await this.httpClient.patch(`${this.serviceUrl}${id}`, payload as Object, headers);
		if (!response.ok) {
			const error = new Error("PATCH Error") as ResponseError;
			const body = (await response.json()) as { code: string };
			error.code = body.code;
			throw error;
		}
		return (await response.json()) as Promise<R>;
	}

	async deleteOneById(id: string): Promise<string> {
		const headers = await this.getHeaders();
		const response = await this.httpClient.delete(`${this.serviceUrl}${id}`, headers);
		if (!response.ok) {
			const error = new Error("DELETE Error") as ResponseError;
			const body = (await response.json()) as { code: string };
			error.code = body.code;
			throw error;
		}
		return id;
	}
}
