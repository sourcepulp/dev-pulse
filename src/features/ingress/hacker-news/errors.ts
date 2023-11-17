import { ApiError, ErrorFactory } from "../../../core/hooks/error-hook";

const hackerNewsErrors = (): ErrorFactory => {
	const getError = (errorCode?: number | string | undefined): ApiError => {
		switch (errorCode) {
			default:
				return {
					title: "Unknown error!",
					description: "An unknown error has ocurred. Please try again later.",
					code: errorCode
				};
		}
	};

	return getError;
};

export default hackerNewsErrors;
