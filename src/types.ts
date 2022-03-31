/**
 * Type for HMRC access token object.
 * Although defined in the hmrc-common package, this should be exported from hmrc-auth
 */
export type _AccessToken = {
    /**
     * the access token string
     */
    accessToken: string;
    /**
     * the type of token
     */
    tokenType: string;
    /**
     * the expiry time of the token
     */
    expiresAt: Date;
    /**
     * the refresh token string
     */
    refreshToken: string;
    /**
     * a list of scopes that the token can access
     */
    scopes: string[];
    /**
     * a list of headers to add to any request made with the token
     */
    headers: Record<string, string>;
};
