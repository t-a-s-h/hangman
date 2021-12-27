const addTransition = (href,elname,animationname) => {

    // const splash = document.querySelector('#Splash')
    const app = document.querySelector('.App')
    const anchor = document.querySelector(`a[href="${href}"]`)

    anchor.addEventListener('click',(event) => {


        // Prevents browser from following link
        event.preventDefault()

        // Apply effect
        app.classList.add('spin-out')

        // Link visited only after animation is finished
        setTimeout(() => {
            window.location = href    
        },2500)

        })
}

export default addTransition