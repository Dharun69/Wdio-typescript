export class FileUtils {

    static convertJsonToCustomType<T>(json: Record<string, unknown> | Record<string, unknown>[]): T {
        if (Array.isArray(json)) {
            // If jsonData is an array, return it as is
            return json as T;
        } else {
            // If jsonData is not an array, return it as is
            return json as T;
        }
    }
}