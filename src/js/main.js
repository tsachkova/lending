function addMenuLenguage() {
    let language = document.querySelector('.menu__language');
    let languageP = language.querySelector('p');
    let languageSpan = language.querySelector('span');

    language.addEventListener("click", (e) => {
        languageP.classList.toggle('visible');
    })

    languageP.addEventListener('click', (e) => {

        let spanText = languageSpan.innerHTML;
        languageSpan.innerHTML = languageP.innerHTML;
        languageP.innerHTML = spanText;
    })

    language.closest('li').addEventListener('mouseleave', (e) => {
        if (languageP.classList.contains('visible')) {
            languageP.classList.remove('visible')
        }
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

$('.blog__body').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    responsive: [
        {
            breakpoint: 1240,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 490,
            settings: {
                slidesToShow: 1,
            }
        },
    ],
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
    document.querySelector('.zoom').style.width = '100%';
    document.querySelector('.zoom').style.height = '100%';
    let imgHeight = document.querySelector('.fitness-slider__show-img').offsetWidth;
    document.querySelector('.img-wrapper').style.height = imgHeight / 1.325 + 'px';
}

function setElementWidth() {
    let elementWidth = document.querySelector('.instagram__body-info').offsetWidth;
    document.querySelector('.instagram__body-info').style.height = elementWidth + 'px';
}

if (window.innerWidth < 700) {
    setTimeout(setElementWidth, 200);
}

window.addEventListener('resize', (e) => {
    document.addEventListener('mousemove', function handler(e) {
        let zoomyDiv = document.querySelector('.zoomy');
        zoomyDiv.outerHTML = '';
        setTimeout($('.zoom').zoomy());
        setTimeout(setFitnesImgHeight, 200);
        if (window.innerWidth < 700) {
            setTimeout(setElementWidth, 200);

        } else {
            document.querySelector('.instagram__body-info').style.height = '280px'
        }

        this.removeEventListener('mousemove', handler);
    })
});