const addTransition = (href) => {
    const app = document.querySelector('.App')
    const anchor = document.querySelector(`a[href="${href}"]`)

    anchor.addEventListener('click',(event) => {
        event.preventDefault()
        app.classList.add('spin-out')
        setTimeout(() => {
            window.location = href    
        },2500)

        })
}

export default addTransition