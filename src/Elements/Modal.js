import './modal.css'

const Modal = ({children, show}) => {
    return (
        show && (
            <div className='modal'>
                <div onClick={(e)=>e.stopPropagation()} className='modal-box'>
                    {children}
                </div>
            </div>
        )
    )
}

export default Modal
