export interface ReduxAction<T, P> {
  type: T;
  payload?: P;
}

export type RequiredReduxAction<T, P> = Required<ReduxAction<T, P>>;
export type ReduxActionWithoutPayload<T> = Omit<
  ReduxAction<T, unknown>,
  "payload"
>;
