export interface OrderRepository<T> {
  list(): Promise<T[]>;
}
