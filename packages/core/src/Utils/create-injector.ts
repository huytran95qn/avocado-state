import { Newable } from "inversify";
import { defaultDIStorage } from "../DI/DIContainer";

export function createInjector<T>(
    identifier: Newable<T>
): T {
    const instance = defaultDIStorage.get(identifier);

    if (!instance) {
        throw new Error(`No binding found for identifier: ${identifier.name}`);
    }

    return instance
}