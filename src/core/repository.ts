import { BaseDTO } from "./base-dto";

/**
 * @typeParam R - Return type
 * @typeParam C - Create request type
 * @typeParam U - Update request type
 */
export interface Repository<R extends BaseDTO, C, U> {
	getAllForTenant: () => Promise<R[]>;
	createOneForTenant: (payload: C, urlExtension?: string) => Promise<R>;
	getOneById: (id: string) => Promise<R>;
	updateOneById: (id: string, payload: U) => Promise<R>;
	deleteOneById: (id: string) => Promise<any>;
}

export interface ResponseError extends Error {
	code?: number | string;
}
