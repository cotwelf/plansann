export const FETCH_TODOS = 'UPDATE_TODOS'

export const fetchTodos = (id: number) => ({
  type: FETCH_TODOS,
  payload: id
})
