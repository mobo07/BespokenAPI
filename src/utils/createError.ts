interface ResponseError extends Error {
    status?: number;
}

export const createError = (code: number, message: string) => {
    const err: ResponseError = new Error();
    err.status = code;
    err.message = message;
    return err;
};