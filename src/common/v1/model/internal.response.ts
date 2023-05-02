import { InternalResponseInterface, InternalResponsePaginatedInterface } from "../interface/internal.response";

export class InternalResponse implements InternalResponseInterface {
    status?: number = 503;
    error?: boolean;
    errorTrace?: string;
    response?: any = null;
}

export class InternalResponsePaginated implements InternalResponsePaginatedInterface {
    status?: number = 503;
    error?: boolean;
    errorTrace?: string;
    response?: any;
}