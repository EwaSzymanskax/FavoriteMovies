const modal = document.getElementById('add-modal');
const btnAdd = document.getElementById('btn-add');
const backDrop = document.getElementById('backdrop');
const btnCancel= document.querySelector('.btn--passive');
const btnAddMovie= document.querySelector('.btn--success');
const userInputs = document.querySelectorAll('input');
const entryText = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];


const toggleBackdrop = ()=>{
    backDrop.classList.toggle('visible');
};

const updateUI = ()=>{
    if(movies.length === 0){
        entryText.style.display = "block";
    } else {
        entryText.style.display = "none"; 
    }
};

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};


const closeMovieDeletionModal = () =>{
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) =>{
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode('true'));

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');


    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId));
    // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageUrl, rating) =>{
    const newMovieElement = document.createElement('li');
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class="movie-element__image
            <img src="${imageUrl} alt="${title}">
        </div>
        <div class="movie__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
        `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
};

const closeMovieModal = () =>{
    modal.classList.remove('visible');
};

const showModal=()=>{
    modal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () =>{
    for(const usrInput of userInputs){
        usrInput.value = "";
    };
};

const cancelAddMovieHandler= () =>{
    closeMovieModal();
    clearMovieInput();
    toggleBackdrop();
};

const addMovieHandler= () =>{
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1
    +ratingValue > 5 
    ){
        alert('please enter value! (rating between 1 and 5)');
        return
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();

};

const backdropClickHandler = () =>{
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};

btnAdd.addEventListener('click', showModal);
backDrop.addEventListener('click', backdropClickHandler);
btnCancel.addEventListener('click', cancelAddMovieHandler);
btnAddMovie.addEventListener('click', addMovieHandler)