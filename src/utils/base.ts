import store from '../store'

export const toggleModal = ({ content, title }: any) => {
  store.dispatch({ type: 'SHOW_MODAL', payload: {content, title} })
}
