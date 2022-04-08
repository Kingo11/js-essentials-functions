// menuId: MENU ID, TO ADD THE CLASS IS-OPEN
// toggleId: TOGGLE ID (BURGER BUTTON)
// linkMenuClass: LINK MENU CLASS, TO HIDE THE MENU
// closeId: CLOSE ID, CAN BE NULL IF IS THE SAME AS BURGER BUTTON
// blurId: BLUR ID, TO BLUR THE BODY, TO ADD CLASS BLUR
// ADD AN 'OVERFLOW-HIDDEN' CLASS TO BLOCK THE BODY WHEN THE MENU IS OPEN
// ADD AN 'IS-OPEN' CLASS TO CUSTOM MOBILE MENU
// ADD AN 'BLUR' CLASS TO BLUR THE BODY



export default function burger (menuId, toggleId, linkMenuClass, closeId, blurId) {

    /*=============== SHOW MENU ===============*/
    const navMenu = document.getElementById(menuId),
        navToggle = document.getElementById(toggleId),
        navClose = document.getElementById(closeId),
        mainForBlur = document.getElementById(blurId),
        body = document.body

    function addClass() {
        navMenu.classList.add('is-open')
        mainForBlur.classList.add('blur')
        body.classList.add('overflow-hidden')
    }

    function removeClass() {
        navMenu.classList.remove('is-open')
        mainForBlur.classList.remove('blur')
        body.classList.remove('overflow-hidden')
    }

    /*===== MENU SHOW =====*/
    /* Validate if constant exists */
    if(navToggle){

        /*===== MENU HIDDEN =====*/
        /* Validate if constant exists */
        if(navClose){
            navToggle.addEventListener('click', () =>{
                removeClass()
            })

            navClose.addEventListener('click', () =>{
                addClass()
            })
        }
        else {
            // no close button
            navToggle.addEventListener('click', () =>{
                // navMenu.classList.contains('is-open') ? navMenu.classList.remove('is-open') : navMenu.classList.add('is-open'),
                // mainForBlur.classList.add('blur'),
                // body.classList.add('overflow-hidden')
                navMenu.classList.contains('is-open') ? removeClass() : addClass()
            })
        }
    }

    /*=============== REMOVE MENU MOBILE ===============*/
    const navLink = document.querySelectorAll(`.${linkMenuClass}`)

    navLink.forEach(n => n.addEventListener('click', removeClass))

}
