export const toggleModal = ({ content, title }: any) => {
  console.log(window.store.getState().modal.status)
  window.store.dispatch({ type: 'SHOW_MODAL', payload: {content, title} })
}
