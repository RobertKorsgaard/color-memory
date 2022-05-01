export interface IAction<T> {
  type: T;
  payload?: unknown;
}
