import classNames from 'classnames'
import './style.scss'
import store from "../../store"
import { connect } from "react-redux"

const mapStateToProps = (state: any) => ({
  modal: state.modal
})
const mapDispatchToProps = () => ({
  // closeModal:
})
const TModal: React.FC<any> = ({ modal }) => {
  const onClose = () => {
    store.dispatch({ type: 'HIDE_MODAL'})
  }
  const closeModal = (e: any) => {
    if (e.target.classList.contains('modal')) {
      onClose()
    }
  }
  return (
    <div className={classNames('modal', {show: modal.status})} onClick={(e) => closeModal(e)}>
      <div className='content'>
        <div className='header'>
          {!!modal.opts?.title && <div className='title'>{modal.opts.title}</div> }
          <div className='close' onClick={onClose} />
        </div>
        {!!modal.opts?.content && <div className='body'>
          {modal.opts.content}
        </div>}
      </div>
    </div>
  )
}

export const Modal = connect(mapStateToProps, mapDispatchToProps)(TModal)
