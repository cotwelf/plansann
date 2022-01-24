import { useRef, useState } from "react"
import { toggleModal } from "../modules/modal"


export const ModalAddProject = () => {
  const projectNameRef = useRef<HTMLInputElement | null>(null)
  const [ projectName, setProjectName ] = useState('')
  const onProjectNameChange = (e: any) => {
    let name = e.target.value.toString().replace(/\r?\n/g, '')
    if (name.length >= 8) {
      name = name.substring(0, 7)
    }
    if (name) {
      projectNameRef.current?.classList.remove('empty')
    } else {
      projectNameRef.current?.classList.add('empty')
    }
    e.target.value = name
    setProjectName(name)
  }
  const toggleAdding = () => {
    toggleModal({
      title: '新增项目分类',
      btnCancel: {
        closeFunc: () => {}
      },
      btnConfirm: {
        closeFunc: () => {}
      },
      content: (
        <div className="create-project">
          <input
            ref={projectNameRef}
            className='name empty'
            placeholder='请输入项目名称。如"英语"'
            onChange={onProjectNameChange}
          />
        </div>
      ),
    })
  }
}
