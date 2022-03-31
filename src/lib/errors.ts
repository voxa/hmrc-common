type HMRCErrorArgs = {
    message: string;
    code?: string;
    status?: number;
};

export class UnknownRequestError extends Error {
    code?: string;
    status?: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'UnknownRequestError';
        this.code = args.code;
        this.status = args.status;
    }
}

export class BadRequestError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'BadRequestError';
        this.code = args.code;
        this.status = 400;
    }
}

export class UnauthorizedError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'UnauthorizedError';
        this.code = args.code;
        this.status = 401;
    }
}

export class ForbiddenError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'ForbiddenError';
        this.code = args.code;
        this.status = 403;
    }
}

export class NotFoundError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'NotFoundError';
        this.code = args.code;
        this.status = 404;
    }
}

export class MethodNotAllowedError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'MethodNotAllowedError';
        this.code = args.code;
        this.status = 405;
    }
}

export class NotAcceptableError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'NotAcceptableError';
        this.code = args.code;
        this.status = 406;
    }
}

export class TooManyRequestsError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'TooManyRequestsError';
        this.code = args.code;
        this.status = 429;
    }
}

export class InternalServerError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'InternalServerError';
        this.code = args.code;
        this.status = 500;
    }
}

export class NotImplementedError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'NotImplementedError';
        this.code = args.code;
        this.status = 501;
    }
}

export class ServiceUnavailableError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'NotImplementedError';
        this.code = args.code;
        this.status = 503;
    }
}

export class GatewayTimeoutError extends Error {
    code?: string;
    status: number;

    constructor(args: HMRCErrorArgs) {
        super(args.message);
        this.name = 'GatewayTimeoutError';
        this.code = args.code;
        this.status = 504;
    }
}
