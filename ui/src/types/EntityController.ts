import { Route } from "../api/Routes";
import { Entity } from "./entities/Entity";

export default interface EntityController<T extends Entity> {
  url: Route;
  get: (id: number) => T;
  create: (values: keyof T) => T;
  update: (id: number, values: keyof T) => T;
  delete: (id: number) => T | { error: Error }; // todo
}
