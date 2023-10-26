const modal = document.getElementById('add-modal');
const btnAdd = document.getElementById('btn-add');
const backDrop = document.getElementById('backdrop');


const toggleBackdrop=()=>{
    backDrop.classList.toggle('visible');
}

const openModal=()=>{
    console.log('lala');
    modal.classList.toggle('visible');
    toggleBackdrop();
}


btnAdd.addEventListener('click', openModal)