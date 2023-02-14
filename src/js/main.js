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

$('.main-slider__body').slick();

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

let menuButton = document.querySelector('.menu__button');
let menu = document.querySelector('.menu');

menuButton.addEventListener('click', e => {

    if (e.target == menuButton) {
        menu.classList.toggle('open');
    }
})