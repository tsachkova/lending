function addMenuLenguage() {
    let language = document.querySelector('.language');
    let languageP = language.previousElementSibling;
    let languageSpan = languageP.previousElementSibling;

    language.addEventListener("click", (e) => {
        languageP.classList.toggle('visible');
    })

    languageP.addEventListener('click', (e) => {
        let spanText = languageSpan.innerHTML;
        languageSpan.innerHTML = languageP.innerHTML;
        languageP.innerHTML = spanText;
    })
}

addMenuLenguage();

$('.main-slider__body').slick({
    dots: true,
    responsive: [
        {
            breakpoint: 510,
            settings: {
                dots: false,
            }
        }],
});

$('.fitness-slider__show').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.fitness-slider__body',
    responsive: [
        {
            breakpoint: 1250,
            settings: {
                arrows: true,
            }
        }],
});

$('.fitness-slider__body').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.fitness-slider__show',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
});

function addMenuButton() {
    let menuButton = document.querySelector('.menu__button');
    let menu = document.querySelector('.menu');

    menuButton.addEventListener('click', e => {

        if (e.target == menuButton) {
            menu.classList.toggle('open');
        }
    })

    let menuButtonFooter = document.querySelector('.footer__button');
    let footerMenu = document.querySelector('.footer__item-nav');

    menuButtonFooter.addEventListener('click', e => {

        if (e.target == menuButtonFooter) {

            footerMenu.classList.toggle('footer-menu__open');
        }
    })
}

addMenuButton();

$('.zoom').zoomy();

function toggleLupa() {

    if (window.innerWidth > 1140) {
        let slideShow = document.querySelector('.fitness-slider__show');

        slideShow.addEventListener('mouseenter', (e) => {
            document.querySelector('.fitness-slider__lupa').style.display = "none";
        })

        slideShow.addEventListener('mouseleave', (e) => {

            if (e.target == slideShow) {
                document.querySelector('.fitness-slider__lupa').style.display = "block";
            }
        })
    }
}

toggleLupa();

function setFitnesImgHeight() {

    let imgWeidth = document.querySelector('.fitness-slider__show-img').offsetHeight;
    document.querySelector('.img-wrapper').style.height = imgWeidth;
}

setTimeout(setFitnesImgHeight, 500);

window.addEventListener('resize', (e) => {
    document.addEventListener('mousemove', function handler(e) {
        location.reload();
        this.removeEventListener('mousemove', handler);
    })
});