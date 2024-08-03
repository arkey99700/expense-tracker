import { Entity } from "./entities/Entity";

export default interface Endpoint<T extends Entity> {
  get: (id: number) => T;
  getAll: () => T[];
  create: (fields: keyof T) => T;
  update: (fields: keyof T) => T;
  delete: (id: number) => T | { error: Error }; // todo
}
