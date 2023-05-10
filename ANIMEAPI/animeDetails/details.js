let animeCapsURL = new URL(`https://api.jikan.moe/v4/anime/${localStorage.getItem('animeId')}/videos/episodes?page=${localStorage.getItem('activeOnDetails')}`);
let animeURL = new URL(`https://api.jikan.moe/v4/anime/${localStorage.getItem('animeId')}/full`);
let animePaginationURL = new URL(`https://api.jikan.moe/v4/anime/${localStorage.getItem('animeId')}/videos/episodes`);
let allAnimePaginationData = [];
let allAnimeCapsData = [];
let allAnimeData = [];

const getAllAnimeData = async () => {
    const response = await fetch(animeURL.href);
    const generalData = await response.json();
    allAnimeData.push(generalData);
}; 

const getAllAnimeCaps = async () => {
    const response = await fetch(animeCapsURL.href);
    const generalData = await response.json();
    allAnimeCapsData.push(generalData);
};

const getAllPaginationData = async () => {
    const response = await fetch(animePaginationURL.href);
    const generalData = await response.json();
    allAnimePaginationData.push(generalData);
}; 

const createAllAnimeElements = () => {
    const mainRowDiv = document.createElement('div');
    const mainCard = document.createElement('div');
    const cardImageDiv = document.createElement('div');
    const cardImage = document.createElement('img');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
    const cardContentDiv = document.createElement('div');
    const btnOnAiring = document.createElement('p');
    const onAiringIcon = document.createElement('i');
    const descriptionP = document.createElement('p');
    const mainTypesDiv = document.createElement('div');

    mainRowDiv.className = 'col s12 m7 mainRowDiv';
    mainRowDiv.id = 'mainRowDiv';
    mainCard.className = 'card mainCard col s5 push-s1 offset-m6';
    cardImageDiv.id = 'cardImageDiv';
    cardImageDiv.className = 'card-image responsive-img';
    cardImage.id = 'cardImg';
    cardImage.src = allAnimeData[0].data.images.webp.large_image_url;
    span1.id = 'span1';
    span2.id = 'span2';
    span3.id = 'span3';
    span1.className = 'card-title btn';
    span1.title = allAnimeData[0].data.title;
    span2.className = 'card-title btn cardBtnModify';
    span3.className = 'card-title btn cardBtnRatingModify';
    span1.textContent = allAnimeData[0].data.title;
    span2.textContent = allAnimeData[0].data.type;
    span3.textContent = allAnimeData[0].data.score;
    cardContentDiv.id = 'cardContentId';
    cardContentDiv.className = 'card-content';
    btnOnAiring.className = 'btn btnOnAiring';
    btnOnAiring.textContent = allAnimeData[0].data.status;
    onAiringIcon.className = 'small material-icons materialIcons onAiringIcon';
    onAiringIcon.textContent = 'desktop_windows';
    descriptionP.className = 'description description1';
    descriptionP.textContent = allAnimeData[0].data.synopsis;

    document.querySelector('#mainTextCardDiv').appendChild(mainTypesDiv);
    document.querySelector('#mainRowDiv').appendChild(mainRowDiv);
    mainRowDiv.appendChild(mainCard);
    mainCard.appendChild(cardImageDiv);
    cardImageDiv.appendChild(cardImage);
    cardImageDiv.appendChild(span1);
    cardImageDiv.appendChild(span2);
    cardImageDiv.appendChild(span3);
    mainCard.appendChild(cardContentDiv);
    cardContentDiv.appendChild(btnOnAiring);
    btnOnAiring.appendChild(onAiringIcon);

    const mainTypesCards = document.createElement('span');
    mainTypesDiv.className = 'mainTypesDiv';
    mainTypesCards.className = 'card-title mainTypes btn';
    mainTypesCards.id = 'mainTypesCards';
    if (allAnimeData[0]?.data?.genres[0]?.type == undefined) {
        mainTypesCards.textContent = allAnimeData[0].data.type;
    } else {
        mainTypesCards.textContent = allAnimeData[0].data.genres[0].type;
    }
    document.querySelector('#mainTextCardDiv').appendChild(descriptionP);
    mainTypesDiv.appendChild(mainTypesCards);

    allAnimeData[0].data.genres.forEach(genre => {
        const mainTypesCards = document.createElement('span');

        mainTypesDiv.className = 'mainTypesDiv';
        mainTypesCards.className = 'card-title mainTypes btn';
        mainTypesCards.id = 'mainTypesCards';
        mainTypesCards.textContent = genre.name;

        document.querySelector('#mainTextCardDiv').appendChild(descriptionP);
        mainTypesDiv.appendChild(mainTypesCards);
    });
};

const createAllAnimeCaps = () => {
    allAnimeCapsData[0].data.forEach(cap => {
        //creating episodes and their cards//
        const colModifyDiv = document.createElement('div');
        const colDiv = document.createElement('div');
        const cardHorizontalDiv = document.createElement('div');
        const cardImageDiv2 = document.createElement('div');
        const mainImgDiv = document.createElement('img');
        const solvingDiv = document.createElement('div');
        const cardContentIdDiv = document.createElement('div');
        const mainP2Div = document.createElement('p');
        const divider = document.createElement('li');
        const secondaryPDiv = document.createElement('p');

        colModifyDiv.className = 'col s12 push-s2 colModify';
        colDiv.className = 'col s12 m8';
        cardHorizontalDiv.className = 'card horizontal cardClick';
        cardImageDiv2.className = 'card-image cardImageUnic';
        if (cap.images.jpg.image_url == null) {
            mainImgDiv.src = 'file:///C:/Users/randy/OneDrive/Escritorio/ProyectosCursoEmmanuel/EmmaHomeworks/ANIMEAPI/images/404.jpg';
        } else {
            mainImgDiv.src = cap.images.jpg.image_url;
        }
        solvingDiv.className = 'card-stacked solving';
        cardContentIdDiv.className = 'card-content';
        cardContentIdDiv.id = 'cardContentId';
        mainP2Div.className = 'mainP2';
        mainP2Div.textContent = cap.title;
        divider.className = 'divider';
        divider.tabIndex = '-1';
        secondaryPDiv.className = 'secondaryP';
        secondaryPDiv.textContent = cap.episode;

        //Open the anime url by localstoraged id//
        cardHorizontalDiv.addEventListener('click', () => {
            window.open(cap.url);
        });

        //Appending and creating all elements//
        document.querySelector('.mainRowContainer').appendChild(colModifyDiv);
        colModifyDiv.appendChild(colDiv);
        colDiv.appendChild(cardHorizontalDiv);
        cardHorizontalDiv.appendChild(cardImageDiv2);
        cardImageDiv2.appendChild(mainImgDiv);
        cardHorizontalDiv.appendChild(solvingDiv);
        solvingDiv.appendChild(cardContentIdDiv);
        cardContentIdDiv.appendChild(mainP2Div);
        cardContentIdDiv.appendChild(divider);
        cardContentIdDiv.appendChild(secondaryPDiv);
    });



};

const createPaginationBasedOnNeededAmount = () => {
    const firstLi = document.createElement('li');
    const firstInput = document.createElement('input');

    firstLi.className = 'waves-effect waves-orange';
    firstInput.className = 'material-icons';
    firstInput.type = 'button';
    firstInput.style.fontSize = '2rem';
    firstInput.value = 'chevron_left';
    firstLi.appendChild(firstInput);
    firstLi.addEventListener('click', () => {
        let mainActiveNumber = document.querySelector('.activeOnDetails').textContent;
        let mainActiveNumberResult = (parseFloat(mainActiveNumber)) - 1;
        removeActiveClass();
        let activeResult = document.evaluate(`//li[contains(.,${mainActiveNumberResult})]`, document, null, XPathResult.ANY_TYPE, null);
        let changeActiveResult = activeResult.iterateNext();
        changeActiveResult.className = 'activeOnDetails';
        if (changeActiveResult.textContent.includes('Option')) {
            changeActiveResult.textContent = changeActiveResult.textContent.replace('Option', '').trim();
        }
        localStorage.setItem('activeOnDetails', changeActiveResult.textContent);
        animeCapsURL.searchParams.set('pageOnDetails', localStorage.getItem('activeOnDetails'));
        localStorage.setItem('pageOnDetails', animeCapsURL.href);
        animeCapsURL.searchParams.set('pageOnDetails', localStorage.getItem('activeOnDetails'));

        //VALIDATIONS
        if (changeActiveResult.textContent == 1) {
            firstInput.disabled = true;
        } else {
            firstInput.disabled = false;
        }
        if (localStorage.getItem('activeOnDetails') == allAnimeCapsData[0].pagination.last_visible_page) {
            lastInput.disabled = true;
        } else {
            lastInput.disabled = false;
        }
        location.reload();
        ///////////Adding the page and type to the pagination/////////////
    });


    //VALIDATIONS
    if (localStorage.getItem('activeOnDetails') == 1) {
        firstInput.disabled = true;
    } else {
        firstInput.disabled = false;
    }
    document.querySelector('.insertPagination').append(firstLi);

    const secondLi = document.createElement('li');
    const secondA = document.createElement('a');

    secondLi.className = 'activeOnDetails';
    secondA.textContent = '1';

    //Adding the activeOnDetails class at reloading the page.
    if (localStorage.getItem('activeOnDetails').includes(parseInt(secondLi.textContent))) {
        removeActiveClass();
        secondLi.className = 'activeOnDetails';
    }

    secondLi.addEventListener('click', () => {
        removeActiveClass();
        secondLi.className = 'activeOnDetails';
        //VALIDATIONS
        if (parseFloat(document.querySelector('.activeOnDetails').textContent) == 1) {
            firstInput.disabled = true;
        } else {
            firstInput.disabled = false;
        }
        //Creating again all elements.
        localStorage.removeItem('activeOnDetails');
        localStorage.setItem('activeOnDetails', secondA.textContent);
        localStorage.removeItem('pageOnDetails');
        animeCapsURL.searchParams.set('pageOnDetails', localStorage.getItem('activeOnDetails'));
        localStorage.setItem('pageOnDetails', animeCapsURL.href);
        location.reload();
        ///////////Adding the page and type to the pagination/////////////
    });

    secondLi.appendChild(secondA);
    document.querySelector('.insertPagination').append(secondLi);


    if (parseInt(localStorage.getItem('activeOnDetails')) >= 7) {
        const pageLi = document.createElement('li');
        const pageButton = document.createElement('button');
        pageLi.className = 'pageButton pageButton2';
        pageButton.className = 'pageButton pageButton2';
        pageButton.textContent = '...';
        pageButton.disabled = true;
        pageLi.appendChild(pageButton);
        pageLi.addEventListener('click', () => {
            removeActiveClass();
            pageLi.classList.add('activeOnDetails');
        });

        document.querySelector('.insertPagination').append(pageLi);
    }


    let currentPage = parseInt(localStorage.getItem('activeOnDetails'));
    let initialCount = 2;
    let finalCount = currentPage + 4;



    if (currentPage == 1) {
        finalCount = currentPage + 9;
    } if (currentPage == 2) {
        finalCount = currentPage + 8;
    } if (currentPage == 3) {
        finalCount = currentPage + 7;
    } if (currentPage == 4) {
        finalCount = currentPage + 6;
    } if (currentPage == 5) {
        finalCount = currentPage + 5;
    }
    if (currentPage == 6) {
        finalCount = currentPage + 4;
    }
    if (currentPage >= 7) {
        initialCount = currentPage - 4;
    }
    // if (allAnimePaginationData[0]?.pagination?.last_visible_page == undefined) {
    //     let pagination = {
    //        pagination: {
    //            last_visible_page: 1
    //        }
    //    };
    //    allAnimePaginationData.push(pagination);
    //}

    if (allAnimeCapsData[0]?.pagination?.last_visible_page == undefined) {
        animeCapsURL.searchParams.set('pageOnDetails', localStorage.getItem('activeOnDetails'));
        localStorage.setItem('activeOnDetails', '1');
        localStorage.setItem('pageOnDetails', 'https://api.jikan.moe/v4/anime?limit=24&page=1&type=' + localStorage.getItem('inputText'));
        
        localStorage.setItem('name', localStorage.getItem('filter'));
    }
    if (allAnimeCapsData[0]?.pagination?.last_visible_page == undefined) {
        let pagination = {
            pagination: {
                last_visible_page: 1
            }
        };
        allAnimePaginationData.push(pagination);
    }
    if (currentPage == allAnimeCapsData[0].pagination.last_visible_page - 1) {
        finalCount = allAnimeCapsData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimeCapsData[0].pagination.last_visible_page - 2) {
        finalCount = allAnimeCapsData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimeCapsData[0].pagination.last_visible_page - 3) {
        finalCount = allAnimeCapsData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimeCapsData[0].pagination.last_visible_page - 4) {
        finalCount = allAnimeCapsData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimeCapsData[0].pagination.last_visible_page - 5) {
        finalCount = allAnimeCapsData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimeCapsData[0].pagination.last_visible_page) {
        finalCount = allAnimeCapsData[0].pagination.last_visible_page - 1;
    }

    for (let i = initialCount; i <= finalCount; i++) {
        const pageLi = document.createElement('li');
        const pageA = document.createElement('a');
        pageLi.className = 'waves-effect waves-orange';
        pageA.textContent = i;
        pageLi.appendChild(pageA);
        //Adding the activeOnDetails class at reloading the page.
        if (localStorage.getItem('activeOnDetails').includes(i)) {
            removeActiveClass();
            pageLi.className = 'activeOnDetails waves-effect waves-orange';
        }

        pageLi.addEventListener('click', () => {
            removeActiveClass();
            pageLi.classList.add('activeOnDetails');
            //VALIDATIONS
            if (parseFloat(document.querySelector('.activeOnDetails').textContent) >= 2) {
                firstInput.disabled = false;
            } else {
                firstInput.disabled = true;
            }
            //Creating again all elements.
            localStorage.removeItem('activeOnDetails');
            localStorage.setItem('activeOnDetails', pageA.textContent);
            localStorage.removeItem('pageOnDetails');
            animeCapsURL.searchParams.set('pageOnDetails', localStorage.getItem('activeOnDetails'));
            localStorage.setItem('pageOnDetails', animeCapsURL.href);
            location.reload();
            ///////////Adding the page and type to the pagination/////////////
        });
        document.querySelector('.insertPagination').append(pageLi);
    }


    if (parseInt(localStorage.getItem('activeOnDetails')) <= allAnimeCapsData[0].pagination.last_visible_page - 7) {
        const pageLi = document.createElement('li');
        const pageButton = document.createElement('button');
        pageLi.className = 'pageButton pageButton2';
        pageButton.className = 'pageButton pageButton2';
        pageButton.textContent = '...';
        pageButton.disabled = true;
        pageLi.appendChild(pageButton);

        pageLi.addEventListener('click', () => {
            removeActiveClass();
            pageLi.classList.add('activeOnDetails');
        });

        document.querySelector('.insertPagination').append(pageLi);
    }

    const penultimateLi = document.createElement('li');
    const penultimateA = document.createElement('a');

    penultimateLi.className = 'waves-effect waves-orange';
    penultimateA.textContent = allAnimeCapsData[0].pagination.last_visible_page;
  

    //Adding the activeOnDetails class at reloading the page.
    if (localStorage.getItem('activeOnDetails').includes(penultimateA.textContent)) {
        removeActiveClass();
        penultimateLi.className = 'activeOnDetails waves-effect waves-orange';
    }

    penultimateLi.addEventListener('click', () => {
        removeActiveClass();
        penultimateLi.className = 'activeOnDetails waves-effect waves-orange';
        //Creating again all elements.
        localStorage.removeItem('activeOnDetails');
        localStorage.setItem('activeOnDetails', penultimateA.textContent);
        localStorage.removeItem('pageOnDetails');
        animeCapsURL.searchParams.set('pageOnDetails', localStorage.getItem('activeOnDetails'));
        localStorage.setItem('pageOnDetails', animeCapsURL.href);
        location.reload();
        ///////////Adding the page and type to the pagination/////////////
    });

    penultimateLi.appendChild(penultimateA);
    document.querySelector('.insertPagination').append(penultimateLi);


    const lastLi = document.createElement('li');
    const lastInput = document.createElement('input');

    lastLi.className = 'waves-effect waves-effect waves-orange';
    lastInput.className = 'material-icons';
    lastInput.type = 'button';
    lastInput.style.fontSize = '2rem';
    lastInput.value = 'chevron_right';
    lastLi.appendChild(lastInput);
    lastLi.addEventListener('click', () => {
        let mainActiveNumber = document.querySelector('.activeOnDetails').textContent;
        let mainActiveNumberResult = (parseFloat(mainActiveNumber)) + 1;
        removeActiveClass();
        let activeResult = document.evaluate(`//li[contains(.,${mainActiveNumberResult})]`, document, null, XPathResult.ANY_TYPE, null);
        let changeActiveResult = activeResult.iterateNext();
        changeActiveResult.className = 'activeOnDetails';
        if (changeActiveResult.textContent.includes('Option')) {
            changeActiveResult.textContent = changeActiveResult.textContent.replace('Option', '').trim();
        }
        localStorage.setItem('activeOnDetails', changeActiveResult.textContent);
        animeCapsURL.searchParams.set('pageOnDetails', localStorage.getItem('activeOnDetails'));
        localStorage.setItem('pageOnDetails', animeCapsURL.href);
        //VALIDATIONS
        if (changeActiveResult.textContent == allAnimeCapsData[0].pagination.last_visible_page) {
            lastInput.disabled = true;
        } else {
            lastInput.disabled = false;
        }
        ///////////Adding the page and type to the pagination/////////////
        location.reload();
    });
    //VALIDATIONS
    if (localStorage.getItem('activeOnDetails') == allAnimeCapsData[0].pagination.last_visible_page) {
        lastInput.disabled = true;
    } else {
        lastInput.disabled = false;
    }
    document.querySelector('.insertPagination').append(lastLi);
}

const removeActiveClass = () => {
    const allActiveElements = document.querySelectorAll('.active');
    allActiveElements.forEach(element => {
        element.classList.remove('active');
    });

    const allActiveElementsOnDetails = document.querySelectorAll('.activeOnDetails');
    allActiveElementsOnDetails.forEach(element => {
        element.classList.remove('activeOnDetails');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
});

document.querySelector('.modal-close').addEventListener('click', () => {
    alert('ERROR 404 please, try again later.')
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
});

const onLoadFunction = window.onload = async () => {
    await getAllAnimeData();
    await getAllAnimeCaps();
    createAllAnimeElements();
    createAllAnimeCaps();
    createPaginationBasedOnNeededAmount();
    console.log(allAnimeCapsData[0].pagination.last_visible_page);
    console.log(allAnimePaginationData)

}