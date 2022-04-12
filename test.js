const slider = document.querySelector(".carousel-box")
var scrollPerClick;
var imagePadding = 20
const DISPLAYED_ELEMENTS_NUMBER = 5


showTopRatedMovieData();

async function showTopRatedMovieData(){
    var result = await axios.get("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page=1&page_size=20")
    let movies = result.data.results;

    movies.forEach(function (movie, index) {
        let visibility = '';
        if(index < DISPLAYED_ELEMENTS_NUMBER){
            visibility = 'd-block'
        }
        else {
            visibility = 'd-none'
        }
        let imageUrl = movie.image_url;
        slider.insertAdjacentHTML(
            "beforeend", `<img src="${imageUrl}" class="${visibility}"/>`);
        });
}

function onPrevClick(button){
    button.parentNode.querySelector('#next-button').classList.remove('hidden')
    let firstVisibleElement = slider.querySelector(".d-block")
    let elements = slider.children

    let index = Array.prototype.indexOf.call(elements, firstVisibleElement);


    if(index <= 0){
        return
    }
    else if (index == 1){
       button.classList.add('hidden')
    }
    let nextVisibleElement = elements[index - 1]
    let lastVisibleElement = elements[index + DISPLAYED_ELEMENTS_NUMBER - 1]
    lastVisibleElement.classList.remove('d-block')
    lastVisibleElement.classList.add('d-none')

    nextVisibleElement.classList.remove('d-none')
    nextVisibleElement.classList.add('d-block')
}

function onNextClick(button){
    button.parentNode.querySelector('#previous-button').classList.remove('hidden')
    let firstVisibleElement = slider.querySelector(".d-block")
    let elements = slider.children
    let index = Array.prototype.indexOf.call(elements, firstVisibleElement);


    if(index >= elements.length - DISPLAYED_ELEMENTS_NUMBER){
        return
    }
    else if(index == elements.length - DISPLAYED_ELEMENTS_NUMBER - 1){
        button.classList.add('hidden')
    }
    let nextVisibleElement = elements[index + DISPLAYED_ELEMENTS_NUMBER]

    firstVisibleElement.classList.remove('d-block')
    firstVisibleElement.classList.add('d-none')

    nextVisibleElement.classList.remove('d-none')
    nextVisibleElement.classList.add('d-block')




}
