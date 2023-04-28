import { InternalResponseInterface } from "../interface/internal.response";

export class InternalResponse implements InternalResponseInterface {
    error?: boolean;
    errorTrace?: string;
    response: any = null;
}