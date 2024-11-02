export default interface RepositoryInterface<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<boolean>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}