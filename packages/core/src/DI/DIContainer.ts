import "reflect-metadata";
import { Container, Newable } from "inversify"
import { INJECT_KEY } from "../Shared/inject-key";

export class DIContainer {
    private container = new Container();

    public get<T>(identifier: Newable<T>): T {
        const isBound = this.container.isBound(identifier);

        if (!isBound) {
            this.bind<T>(identifier);
        }

        return this.container.get<T>(identifier);
    }

    public bind<T>(identifier: Newable<T>): void {
        this.container.bind<T>(identifier).toConstantValue(
            this.resolveDependencies(identifier)
        );
    }

    private resolveDependencies<T>(identifier: Newable<T>): T {
        const params: Newable<any>[] = Reflect.getMetadata(INJECT_KEY, identifier) || [];
        
        return new identifier(...params.map(param => this.get(param)));
    }
}

export const defaultDIStorage = new DIContainer();