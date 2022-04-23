const slider = document.querySelector(".carousel-box");
const bestMovieSection = document.querySelector("#best-movie");
const DISPLAYED_ELEMENTS_NUMBER = 5;
const modal = document.querySelector(".modal-overlay");
const singleMovie_BaseUrl = "http://localhost:8000/api/v1/titles/";
let movieList = []

fetchTopRatedMovies();

async function fetchTopRatedMovies() {
  axios
    .get(
      "http://127.0.0.1:8000/api/v1/titles/?sort_by=-votes&imdb_score_min=8&page=1&page_size=20"
    )
    .then((result) => {
      let movies = result.data.results;
      let bestMovie = movies[0];
      showBestMovie(bestMovie);
      showTopRatedMoviesData(movies);
    });
}

function getMovieInfo(movie) {
  let movieID = movie.id;
  let title = movie.title;
  let year = movie.year;
  let directors = movie.directors;
  let actorsList = movie.actors;
  let writers = movie.writers;
  let genres = movie.genres;
  let score = movie.imdb_score;
  let imageUrl = movie.image_url;
  return {
    movieID: movieID,
    title: title,
    year: year,
    directors: directors,
    casting: actorsList,
    writers: writers,
    genres: genres,
    score: score,
    imageUrl: imageUrl,
  };
}

function setMoviePicture(movie, selector) {
  let movieItem = getMovieInfo(movie);
  let bestMoviePicture = bestMovieSection.querySelector(selector);
  bestMoviePicture.setAttribute("src", movieItem.imageUrl);
}
function setMovieInfos(movie, selector) {
  let bestMovieInfos = bestMovieSection.querySelector(selector);
  let movieItem = getMovieInfo(movie);
  let movieInfoList = Object.entries(movieItem);
  movieInfoList.forEach((element) => {
    let infoTag = element[0];
    let infoToAdd = element[1];
    let selectedElement = bestMovieInfos.querySelector(`[id$=${infoTag}]`);
    if (selectedElement) selectedElement.textContent = infoToAdd;
  });
}

function showBestMovie(movie) {
  setMovieInfos(movie, '#best-movie__infos');
  setMoviePicture(movie, '#best-movie__picture');
}

function showTopRatedMoviesData(movies) {
  movies.forEach(function (movie, index) {
    let visibility = "";
    if (index < DISPLAYED_ELEMENTS_NUMBER) {
      visibility = "d-block";
    } else {
      visibility = "d-none";
    }
    let movieItem = getMovieInfo(movie);
    movieList.push(movieItem)
    slider.insertAdjacentHTML(
      "beforeend",
      `<img src="${movieItem.imageUrl}" onclick="openModal(${movieItem.movieID})" class="${visibility}"/>`
    );
  });
}

function onPrevClick(button) {
  button.parentNode.querySelector("#next-button").classList.remove("hidden");
  let firstVisibleElement = slider.querySelector(".d-block");
  let elements = slider.children;

  let index = Array.prototype.indexOf.call(elements, firstVisibleElement);

  if (index <= 0) {
    return;
  } else if (index == 1) {
    button.classList.add("hidden");
  }
  let nextVisibleElement = elements[index - 1];
  let lastVisibleElement = elements[index + DISPLAYED_ELEMENTS_NUMBER - 1];
  lastVisibleElement.classList.remove("d-block");
  lastVisibleElement.classList.add("d-none");

  nextVisibleElement.classList.remove("d-none");
  nextVisibleElement.classList.add("d-block");
}

function onNextClick(button) {
  button.parentNode
    .querySelector("#previous-button")
    .classList.remove("hidden");
  let firstVisibleElement = slider.querySelector(".d-block");
  let elements = slider.children;
  let index = Array.prototype.indexOf.call(elements, firstVisibleElement);

  if (index >= elements.length - DISPLAYED_ELEMENTS_NUMBER) {
    return;
  } else if (index == elements.length - DISPLAYED_ELEMENTS_NUMBER - 1) {
    button.classList.add("hidden");
  }
  let nextVisibleElement = elements[index + DISPLAYED_ELEMENTS_NUMBER];

  firstVisibleElement.classList.remove("d-block");
  firstVisibleElement.classList.add("d-none");

  nextVisibleElement.classList.remove("d-none");
  nextVisibleElement.classList.add("d-block");
}

function openModal(movieID) {
  let movie = movieList.find(function (movie){
    return movie.movieID == movieID;
  })

  modal.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
}