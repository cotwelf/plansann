export const toggleToast = (message: any) => {
  const toast = document.createElement('div')
  toast.classList.add('toast')
  toast.innerHTML = message
  document.body.appendChild(toast)
  setTimeout(()=> {
    document.body.removeChild(toast)
  }, 3000)
}

export const countWorkDays = () => {
  
}
