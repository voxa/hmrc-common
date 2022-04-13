import axios, { Method } from 'axios';

import { _AccessToken } from '../types';

import * as Errors from './errors';

/**
 * Options to make a request to the API
 */
type RequestOptions = {
    /**
     * the HTTP method to make the request with
     *
     * @defaultValue 'GET'
     */
    method?: Method;
    /**
     * the version of the HMRC API to call
     *
     * @defaultValue '1.0'
     */
    version?: string;
    /**
     * the type of request to make
     *
     * @defaultValue 'params'
     */
    type?: 'data' | 'params';
    /**
     * a key-value object containing additional headers.
     *
     * @remarks These are merged with any fraud prevention headers in the token.
     * @defaultValue {}
     */
    headers?: Record<string, string>;
};

/**
 * the default options for an HMRC API request
 *
 * @ignore
 */
const defaultOptions: RequestOptions = {
    method: 'GET',
    version: '1.0',
    type: 'params',
    headers: {},
};

/**
 * Make a request to the HMRC VAT (MTD) API.
 *
 * @typeParam ArgumentType the type of the arguments passed to the HMRC API
 * @typeParam ResponseType the type of the response returned by the HMRC API
 *
 * @param token an OAuth2 access token
 * @param endpoint the API endpoint to call
 * @param args the arguments to pass to the endpoint
 * @param options the request options
 * @returns a Promise that resolves to the response body
 *
 * @throws {@link BadRequestError} if the request fails because of invalid arguments
 * @throws {@link UnauthorizedError} if the access token is invalid
 * @throws {@link ForbiddenError} if the request fails because of insufficient permissions
 * @throws {@link NotFoundError} if the endpoint or if any related data is not found
 * @throws {@link MethodNotAllowedError} if the request fails because of an invalid request method
 * @throws {@link NotAcceptableError} if the request fails because of an invalid Accept header
 * @throws {@link TooManyRequestsError} if the request fails because of rate limiting
 * @throws {@link InternalServerError} if the request fails for any other reason
 * @throws {@link NotImplementedError} if the request fails because the endpoint is not implemented
 * @throws {@link ServiceUnavailableError} if the request fails because of a temporary service outage
 * @throws {@link GatewayTimeoutError} if the request fails because of a timeout
 * @throws {@link UnknownRequestError} if the request fails for any other reason
 *
 */
export const makeRequest = async <ArgumentType, ResponseType>(
    token: _AccessToken | null,
    endpoint: string,
    args?: ArgumentType,
    options?: RequestOptions
): Promise<ResponseType> => {
    const { method, version, type, headers } = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options?.headers,
        },
    };

    const baseURL =
        process.env.NODE_ENV === 'test'
            ? 'https://test-api.service.hmrc.gov.uk.'
            : 'https://api.service.hmrc.gov.uk.';

    try {
        const { data: responseData } = await axios.request<ResponseType>({
            method,
            baseURL,
            url: endpoint,
            params: type === 'params' ? args : undefined,
            data: type === 'data' ? args : undefined,
            headers: {
                ...headers,
                ...(token ? token.headers : {}),
                ...(token
                    ? { Authorization: `Bearer ${token.accessToken}` }
                    : {}),
                Accept: `application/vnd.hmrc.${version}+json`,
            },
        });

        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { status, data } = error.response as {
                status: number;
                data: {
                    message: string;
                    code: string;
                };
            };

            const args = {
                message: data.message,
                code: data.code,
                status,
            };

            switch (status) {
                case 400:
                    throw new Errors.BadRequestError(args);
                case 401:
                    throw new Errors.UnauthorizedError(args);
                case 403:
                    throw new Errors.ForbiddenError(args);
                case 404:
                    throw new Errors.NotFoundError(args);
                case 405:
                    throw new Errors.MethodNotAllowedError(args);
                case 406:
                    throw new Errors.NotAcceptableError(args);
                case 429:
                    throw new Errors.TooManyRequestsError(args);
                case 500:
                    throw new Errors.InternalServerError(args);
                case 501:
                    throw new Errors.NotImplementedError(args);
                case 503:
                    throw new Errors.ServiceUnavailableError(args);
                case 504:
                    throw new Errors.GatewayTimeoutError(args);
                default:
                    throw new Errors.UnknownRequestError(args);
            }
        } else {
            throw error;
        }
    }
};
