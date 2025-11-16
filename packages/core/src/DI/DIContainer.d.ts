import { Container, Newable } from "inversify";

export class DIContainer {
    private container: Container;
    public get<T>(identifier: Newable<T>): T;
    public bind<T>(identifier: Newable<T>): void;
}

export const defaultDIStorage: DIContainer;