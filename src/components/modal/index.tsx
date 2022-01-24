import classNames from 'classnames'
import './style.scss'
import { connect } from "react-redux"
import { IRootState } from '../../modules'
import { bindActionCreators } from 'redux'
import { toggleModal } from '../../modules/modal'
import { useEffect } from 'react'

const mapStateToProps = (state: IRootState) => ({
  modal: state.modal
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  toggleModal: toggleModal,
}, dispatch)

const TModal: React.FC<any> = ({ modal, toggleModal }) => {
  const onClose = () => {
    toggleModal(undefined, false)
  }
  const closeModal = (e: any) => {
    if (e.target.classList.contains('modal')) {
      onCancel()
    }
  }
  const onConfirm = () => {
    if (modal.opts.btnConfirm.closeFunc) {
      modal.opts.btnConfirm.closeFunc().then(()=>{
        onClose()
      })
    } else {
      onClose()
    }
  }
  const onCancel = () => {
    if (modal.opts.btnCancel && modal.opts.btnCancel.closeFunc) {
      modal.opts.btnCancel.closeFunc()
    }
    onClose()
  }
  return (
    <div className={classNames('modal', {show: modal.show})} onClick={closeModal}>
      <div className='content'>
        <div className='header'>
          {!!modal.opts?.title && <div className='title'>{modal.opts.title}</div> }
          <div className='close' onClick={onClose} />
        </div>
        {!!modal.opts?.content && (
          <div className='body'>
            {modal.opts.content}
          </div>
        )}
        {!modal.opts?.noBtn && <div className='footer'>
          <div className='btn cancel' onClick={onCancel}>
            {modal.opts?.btnCancel?.text || '取消'}
          </div>
          {modal.opts?.btnConfirm && (
            <div className='btn confirm' onClick={onConfirm}>
              {modal.opts.btnConfirm.text || '确定'}
            </div>
          )}
        </div>}
      </div>
    </div>
  )
}

export const Modal = connect(mapStateToProps, mapDispatchToProps)(TModal)
