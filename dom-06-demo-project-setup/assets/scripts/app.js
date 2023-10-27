const modal = document.getElementById('add-modal');
const btnAdd = document.getElementById('btn-add');
const backDrop = document.getElementById('backdrop');
const btnCancel= document.querySelector('.btn--passive');
const btnAddMovie= document.querySelector('.btn--success');
const userInputs = document.querySelectorAll('input');

const toggleBackdrop=()=>{
    backDrop.classList.toggle('visible');
}

const toggleModal=()=>{
    modal.classList.toggle('visible');
    toggleBackdrop();
}

const cancelAddMovieHandler=()=>{
    toggleModal();

}

const addMovieHandler=()=>{
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


}

const backdropClickHandler = () =>{
    toggleModal();
}

console.log(btnCancel)

btnAdd.addEventListener('click', backdropClickHandler);
btnCancel.addEventListener('click', cancelAddMovieHandler);
btnAddMovie.addEventListener('click', addMovieHandler)