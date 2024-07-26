export class PersistedEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class NotPersistedEntity {
  id?: null;
  createdAt?: null;
  updatedAt?: null;
}

export class Entity<T extends PersistedEntity | NotPersistedEntity> {
  id: T["id"];
  createdAt: T["createdAt"];
  updatedAt: T["updatedAt"];

  constructor(args: T) {
    this.id = args.id;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
