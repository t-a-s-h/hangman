const addTransition = (href) => {

    const splash = document.querySelector('#Splash')
    const anchor = document.querySelector(`a[href="${href}"]`)

    anchor.addEventListener('click',(event) => {


        // Prevents browser from following link
        event.preventDefault()

        // Apply fade-out effect
        splash.classList.add('fade-out')

        // Link visited only after animation is finished
        setTimeout(() => {
            window.location = href
        },1500)

        })
}

const getTimeInMS = (time) => {
    console.log(time,time.match(/[0-9]*(?=s$)/))
    return time.match(/[0-9]*(?=s$)/)[0]
}

export default addTransition