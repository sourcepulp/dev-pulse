import { BaseDTO } from "./base-dto";

/**
 * @typeParam R - Return type
 */
export interface Repository<R extends BaseDTO> {
	getAll: () => Promise<R[]>;
	getOneById: (id: string | number) => Promise<R>;
}

export interface ResponseError extends Error {
	code?: number | string;
}
