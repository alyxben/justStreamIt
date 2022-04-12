const slider = document.querySelector(".carousel-box")
var scrollPerClick;
var imagePadding = 20
const DISPLAYED_ELEMENTS_NUMBER = 3

showTopRatedMovieData();

async function showTopRatedMovieData(){
    var result = await axios.get("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page=1&page_size=20")
    let movies = result.data.results;

    movies.forEach(function (movie, index) {
        let imageUrl = movie.image_url;
        slider.insertAdjacentHTML(
            "afterbegin", `<img src="${imageUrl}" class="img-${index}"/>`);
        });
}

function onLeftClick(){
    console.log('left')
}

function onRightClick(){
    let firstVisibleElement = slider.querySelector(".visible")

    let elements = slider.children
    let index = Array.prototype.indexOf.call(elements, firstVisibleElement);

    // todo stop if index is too big
    if(index >= elements.length - DISPLAYED_ELEMENTS_NUMBER){
        return
    }
    let nextVisibleElement = elements[index + DISPLAYED_ELEMENTS_NUMBER]

    firstVisibleElement.classList.remove('visible')
    firstVisibleElement.classList.add('hidden')

    nextVisibleElement.classList.remove('hidden')
    nextVisibleElement.classList.add('visible')

    //1er étape récuper l'index du premier element non hidden
    //2eme rendre l'element hidden
    //3eme rendre l'élément suivant non hidden(index+1)


}
function onLeftClick(){
    let firstVisibleElement = slider.querySelector(".visible")
    let elements = slider.children

    let index = Array.prototype.indexOf.call(elements, firstVisibleElement);

    // todo stop if index is too big
    if(index <= 0){
        return
    }
    let nextVisibleElement = elements[index - 1]
    let lastVisibleElement = elements[index + DISPLAYED_ELEMENTS_NUMBER - 1]
    lastVisibleElement.classList.remove('visible')
    lastVisibleElement.classList.add('hidden')

    nextVisibleElement.classList.remove('hidden')
    nextVisibleElement.classList.add('visible')
}