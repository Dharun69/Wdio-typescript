export class FileUtils {

    
    static convertJsonToCustomType<T>(json: Record<string, unknown>): T {
        return json as T;
    }
}

