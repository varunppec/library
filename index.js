import {initializeApp} from './node_modules/firebase/app'
const firebaseConfig = {

    apiKey: "AIzaSyDwYZUhtawHiR86Alb0fuYC4ZswUxWqOyw",
  
    authDomain: "library-f10d9.firebaseapp.com",
  
    projectId: "library-f10d9",
  
    storageBucket: "library-f10d9.appspot.com",
  
    messagingSenderId: "1036671491527",
  
    appId: "1:1036671491527:web:8df0ae67f4306ae6d9cde2",
  
    measurementId: "G-NZSP6F05F8"
  
  };
  const app = initializeApp(firebaseConfig);
  

let myLibrary = [];
let properties = ['name', 'author', 'pages', 'read'];
const container = document.querySelector('.book-container');
const form = document.querySelector('.form');


function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook() {
    const books = document.querySelectorAll('.book');
    for (let book of books) {
        book.parentElement.removeChild(book);
    }
    let count = 0;
    for (let item of myLibrary) {
        let book = document.createElement('div');
        book.setAttribute('data-value', count++);
        book.classList.add(`book`);
        for (let property of properties) {
            let div = document.createElement('div');
            div.classList.add(property);
            book.append(div);
            div.innerText = item[property];
            if (property == 'pages') div.innerText+= " pages";
            if (div.innerText == 'true') {
                div.innerText = 'Read';
                div.style.backgroundColor = 'green';
            }
            if (div.innerText == 'false') {
                div.innerText = 'Not Read';
                div.style.backgroundColor = 'red';
            }
            if (div.innerText == 'Read' || div.innerText == 'Not Read') {
                div.classList.add('book_read');
                div.addEventListener('click', function() {
                    readStatusUpdate(div, item);
                })
            }
            
        }
        const delete_button = document.createElement('button');
        book.append(delete_button);
        delete_button.innerText = 'Delete';
        delete_button.id = 'delete';
        delete_button.onclick = function() {
            delete_button.parentElement.parentElement.removeChild(delete_button.parentElement);
            let index = delete_button.parentElement.getAttribute('data-value');
            console.log(index);
            myLibrary.splice(index, 1); 
        }
        container.append(book);
    }
}


const new_book = document.querySelector('#new_book');
const modal = document.querySelector('.modal');
new_book.onclick = function() {
    form.classList.add('clicked');
    modal.classList.remove('notclicked');
    modal.classList.add('clicked');
    
    form.classList.remove('notclicked');
    const read_status = document.querySelector('.read');
    read_status.onclick = function() {
        readStatusUpdate(read_status);
    }
}

form.onsubmit = function(e) {
    e.preventDefault();
    let name = form.children[0].value;
    let author = form.children[1].value;
    let pages = form.children[2].value;
    let read = (form.children[3].innerText == 'Read'?true:false);
    const newBook = new Book(name,author,Number(pages),read);
    myLibrary.push(newBook);
    modal.classList.add('notclicked');
    modal.classList.remove('clicked');
    
    
    displayBook();
}
window.onclick = function(e) {
    if (e.target == modal) {
        modal.classList.add('notclicked');
        modal.classList.remove('clicked');
    }
}

function readStatusUpdate(div, book) {

    if (div.innerText == 'Not Read') {
        div.style.backgroundColor = 'green';
        div.innerText = 'Read';
    }
    else {
        div.style.backgroundColor = 'red';
        div.innerText = 'Not Read';
    }
    if (!book) return;
    if (div.innerText == 'Read') {
        book.read = true;
    }
    else {
        book.read = false;
    }
}