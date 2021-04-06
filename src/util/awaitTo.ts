export function to<T>(promise: Promise<T>): Promise<[null, T] | [Error, null]> {
    const success = (data: T) => [null, data] as [null, T];
    const error = (err: Error) => [err, null] as [Error, null];
    return promise.then(success).catch(error);
}
