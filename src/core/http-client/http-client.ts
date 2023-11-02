/* eslint-disable @typescript-eslint/ban-types */
export type RequestOptions = { headers?: Record<string, string> };

export interface HttpClient {
	get(url: string, options?: RequestOptions): Promise<Response>;
	patch(url: string, body: Object, options?: RequestOptions): Promise<Response>;
	post(url: string, body: Object, options?: RequestOptions): Promise<Response>;
	delete(url: string, options?: RequestOptions): Promise<Response>;
}
