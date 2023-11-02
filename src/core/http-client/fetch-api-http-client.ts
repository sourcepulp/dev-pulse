/* eslint-disable import/prefer-default-export */
import { HttpClient, RequestOptions } from "./http-client";

export class FetchApiHttpClient implements HttpClient {
	async get(url: string, options?: RequestOptions | undefined): Promise<Response> {
		return fetch(url, { headers: options?.headers });
	}

	async patch(url: string, body: any, options?: RequestOptions | undefined): Promise<Response> {
		return fetch(url, {
			method: "PATCH",
			headers: options?.headers,
			body: JSON.stringify(body)
		});
	}

	async post(url: string, body: any, options?: RequestOptions | undefined): Promise<Response> {
		return fetch(url, {
			method: "POST",
			headers: options?.headers,
			body: JSON.stringify(body)
		});
	}

	async delete(url: string, options?: RequestOptions | undefined): Promise<Response> {
		return fetch(url, {
			method: "DELETE",
			headers: options?.headers
		});
	}
}
