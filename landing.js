let search = document.querySelector('#searchInput');
let cardContainer = document.querySelector('.display')
let inputBtn = document.querySelector('#searchSubmit');
let bookResults = document.querySelector('#result');

let bookCards = [];
// document.querySelectorAll('.card') ? bookCards = document.querySelectorAll('.card') : bookCards = [];
if(document.querySelectorAll('.card')){
    bookCards = document.querySelectorAll('.card');
}else{
    bookCards = [];
}


let bookResultsShow = document.querySelector('.bookResults');

let searchHistory = [];
// localStorage.getItem('searchList') ? searchHistory = JSON.parse(localStorage.getItem('searchList')) : searchHistory = [];

if (localStorage.getItem('searchList')) {
    searchHistory = JSON.parse(localStorage.getItem('searchList'))
} else {
    searchHistory = [];
}

inputBtn.addEventListener('click', (e) => {
    e.preventDefault();

    bookResults.innerHTML = search.value;

    let myArr = search.value.split(' ');
    let newSearch = myArr.join('+')

    if (search.value != "") {

        let searchHistory = [];
        if(localStorage.getItem('searchList')){
            searchHistory = JSON.parse(localStorage.getItem('searchList'))
        }else{
            searchHistory = [];
        } 

        const date = new Date();
        const searchHistoryNow = {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            value: search.value,
        }
        searchHistory.push(searchHistoryNow);
        localStorage.setItem('searchList', JSON.stringify(searchHistory));

        cardContainer.classList.remove('hide');
        async function fetchingData() {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${newSearch}`);
            const data = await response.json();
            let bookStore = [];

            const dataItems = data.items;
            dataItems.map(arrItems => {

                const bookInfo = arrItems.volumeInfo;
                const books = {
                    id: arrItems.id,
                    image: bookInfo.imageLinks.thumbnail,
                    title: bookInfo.title,
                    author: bookInfo.authors == undefined ? bookInfo.authors = ["Not Found"] : bookInfo.authors = bookInfo.authors[0],
                    pageCount: bookInfo.pageCount,
                    publisher: bookInfo.publisher
                }
                console.log(arrItems.volumeInfo.authors)
                if (bookStore.length < dataItems.length) {
                    bookStore.push(books);
                }
                localStorage.setItem('bookStore', JSON.stringify(bookStore));
            })

            const cardWrapper = document.querySelector('.DisplayCard');
            JSON.parse(localStorage.getItem('bookStore')) ?
                JSON.parse(localStorage.getItem('bookStore')) : bookStore = [];
            cardWrapper.innerHTML = "";
            bookStore.map(item => {

                item.name == undefined ? item.name = 'Not Found' : item.name;
                item.title == undefined ? item.title = 'Not Found' : item.title;
                item.pageCount == undefined ? item.pageCount = 'Not Found' : item.pageCount;
                item.publisher == undefined ? item.publisher = 'Not Found' : item.publisher;

                cardWrapper.innerHTML += `
                <div class="card">
                    <img class="cardImage" src=${item.image} alt="${item.title} is loading...">
                    <div class="cardBody">
                        <h5 class="cardTitle">${item.title}</h5>
                        <p class="cardAuthor">Author: ${item.author}</p>
                        <p class="cardPageCount">Page Count: ${item.pageCount}</p>
                        <p class="cardPublisher">Publisher: ${item.publisher}</p>
                    </div>
                    <div class="cardBtn">
                        <button class="cardBuyNow">Buy Now</button>
                    </div>
                </div>
                `
            })
        }
        fetchingData();

    }
    else {
        cardContainer.classList.add('hide');
    }
})