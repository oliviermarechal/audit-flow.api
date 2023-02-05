interface EntityProps {
    [index: string]: any;
}

export abstract class Entity<T extends EntityProps> {}
