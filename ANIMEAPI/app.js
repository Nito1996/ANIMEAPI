let animeURL = new URL('https://api.jikan.moe/v4/anime?limit=24');
let allAnimeData = [];
let allAnimePaginationData = [];

const getAllAnimeData = async () => {
    const response = await fetch(localStorage.getItem('page'));
    const generalData = await response.json();
    generalData.data.forEach(data => {
        allAnimeData.push(data);
        allAnimePaginationData.push(generalData);
    });
}

const createAllAnimeElements = () => {
    allAnimeData.forEach(animeData => {
        const colDiv = document.createElement('div');
        const cardDiv = document.createElement('div');
        const cardImageDiv = document.createElement('div');
        const cardImage = document.createElement('img');
        const cardContentDiv = document.createElement('div');
        const firstCardTitle = document.createElement('span');
        const firstMaterialIcons = document.createElement('i');
        const mainP = document.createElement('p');
        const mainA = document.createElement('a');
        const cardRevealDiv = document.createElement('div');
        const secondCardTitle = document.createElement('span');
        const secondMaterialIcons = document.createElement('i');
        const secondP = document.createElement('p');

        //Adding all atributes//
        colDiv.className = 'col s3 m3';
        cardDiv.className = 'card cardDivClass';
        cardImageDiv.className = 'card-image waves-effect waves-block waves-orange hoverable parallax';
        cardImage.className = 'imgCard';
        cardImage.src = animeData.images.webp.large_image_url;
        cardContentDiv.className = 'card-content';
        firstCardTitle.className = 'tooltipped truncate card-title grey-text text-darken-4';
        firstCardTitle.setAttribute('title', animeData.title);
        firstCardTitle.textContent = animeData.title;
        firstMaterialIcons.className = 'material-icons activator firstMaterialIcons';
        firstMaterialIcons.textContent = 'more_vert';
        mainP.className = 'mainP btn';
        mainA.href = animeData.trailer.embed_url;
        mainA.target = 'blank';
        mainA.textContent = 'Watch trailer!';
        cardRevealDiv.className = 'card-reveal';
        secondCardTitle.className = 'card-title white-text text-lighten-4';
        secondCardTitle.textContent = animeData.title;
        secondMaterialIcons.className = 'material-icons modifyIcon';
        secondMaterialIcons.textContent = 'close';
        secondP.textContent = animeData.synopsis;
        secondP.className = 'secondP white-text text-lighten-4';

        //Adding a click event to open the detail page on the images//
        const playButtonImg = document.createElement('img');
        playButtonImg.src = 'file:///C:/Users/randy/OneDrive/Escritorio/ProyectosCursoEmmanuel/EmmaHomeworks/ANIMEAPI/images/playButtonImgYT.png'
        playButtonImg.className = 'playButtonImg';
        playButtonImg.style.display = 'none';
        playButtonImg.addEventListener('click', () => {
            localStorage.setItem('animeId', animeData.mal_id);
            const detailsUrl = new URL('C:/Users/randy/OneDrive/Escritorio/ProyectosCursoEmmanuel/EmmaHomeworks/ANIMEAPI/animeDetails/details.html');
            document.querySelectorAll('.playButtonImg').forEach(element => {
                element.addEventListener('click', () => {
                    localStorage.setItem('activeOnDetails', 1);
                    window.open(detailsUrl);
                });
            });
        });

        cardImage.addEventListener('click', () => {
            localStorage.setItem('animeId', animeData.mal_id);
            const detailsUrl = new URL('C:/Users/randy/OneDrive/Escritorio/ProyectosCursoEmmanuel/EmmaHomeworks/ANIMEAPI/animeDetails/details.html');
            document.querySelectorAll('.card-image').forEach(element => {
                element.addEventListener('click', () => {
                    localStorage.setItem('activeOnDetails', 1);
                    window.open(detailsUrl);
                });
            });
        });

        cardDiv.addEventListener('mouseover', () => {
            playButtonImg.style.display = 'flex';
        });

        cardDiv.addEventListener('mouseout', () => {
            playButtonImg.style.display = 'none';
        });




        //Appending all elements//
        document.querySelector('.mainCreatedRow').appendChild(colDiv);
        colDiv.appendChild(cardDiv);
        cardDiv.appendChild(playButtonImg);
        cardDiv.appendChild(cardImageDiv);
        cardImageDiv.appendChild(cardImage);
        cardDiv.appendChild(cardContentDiv);
        cardContentDiv.appendChild(firstCardTitle);
        firstCardTitle.appendChild(firstMaterialIcons);
        cardContentDiv.appendChild(mainP);
        mainP.appendChild(mainA);
        cardDiv.appendChild(cardRevealDiv);
        cardRevealDiv.appendChild(secondCardTitle);
        secondCardTitle.appendChild(secondMaterialIcons);
        cardRevealDiv.appendChild(secondP);
    });
}

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
        let mainActiveNumber = document.querySelector('.active').textContent;
        let mainActiveNumberResult = (parseFloat(mainActiveNumber)) - 1;
        removeActiveClass();
        let activeResult = document.evaluate(`//li[contains(.,${mainActiveNumberResult})]`, document, null, XPathResult.ANY_TYPE, null);
        let changeActiveResult = activeResult.iterateNext();
        changeActiveResult.className = 'active';
        if (changeActiveResult.textContent.includes('Option')) {
            changeActiveResult.textContent = changeActiveResult.textContent.replace('Option', '').trim();
        }
        localStorage.setItem('active', changeActiveResult.textContent);
        animeURL.searchParams.set('page', localStorage.getItem('active'));
        localStorage.setItem('page', animeURL.href);
        animeURL.searchParams.set('page', localStorage.getItem('active'));

        //VALIDATIONS
        if (changeActiveResult.textContent == 1) {
            firstInput.disabled = true;
        } else {
            firstInput.disabled = false;
        }
        if (localStorage.getItem('active') == allAnimePaginationData[0].pagination.last_visible_page) {
            lastInput.disabled = true;
        } else {
            lastInput.disabled = false;
        }
        location.reload();
        window.location.href = '#streaming';
        ///////////Adding the page and type to the pagination/////////////
        filterByType();
        filterByTypeIfNotAll();
        filterByName();
    });


    //VALIDATIONS
    if (localStorage.getItem('active') == 1) {
        firstInput.disabled = true;
    } else {
        firstInput.disabled = false;
    }
    document.querySelector('.insertPagination').append(firstLi);

    const secondLi = document.createElement('li');
    const secondA = document.createElement('a');

    secondLi.className = 'active';
    secondA.textContent = '1';
    secondA.href = '#streaming';

    //Adding the active class at reloading the page.
    if (localStorage.getItem('active').includes(parseInt(secondLi.textContent))) {
        removeActiveClass();
        secondLi.className = 'active';
    }

    secondLi.addEventListener('click', () => {
        removeActiveClass();
        secondLi.className = 'active';
        //VALIDATIONS
        if (parseFloat(document.querySelector('.active').textContent) == 1) {
            firstInput.disabled = true;
        } else {
            firstInput.disabled = false;
        }
        //Creating again all elements.
        localStorage.removeItem('active');
        localStorage.setItem('active', secondA.textContent);
        localStorage.removeItem('page');
        animeURL.searchParams.set('page', localStorage.getItem('active'));
        localStorage.setItem('page', animeURL.href);
        location.reload();
        ///////////Adding the page and type to the pagination/////////////
        filterByType();
        filterByTypeIfNotAll();
        filterByName();
    });

    secondLi.appendChild(secondA);
    document.querySelector('.insertPagination').append(secondLi);


    if (parseInt(localStorage.getItem('active')) >= 7) {
        const pageLi = document.createElement('li');
        const pageButton = document.createElement('button');
        pageLi.className = 'pageButton';
        pageButton.className = 'pageButton';
        pageButton.textContent = '...';
        pageButton.disabled = true;
        pageLi.appendChild(pageButton);
        pageLi.addEventListener('click', () => {
            removeActiveClass();
            pageLi.classList.add('active');
        });

        document.querySelector('.insertPagination').append(pageLi);
    }


    let currentPage = parseInt(localStorage.getItem('active'));
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

    if (allAnimePaginationData[0]?.pagination?.last_visible_page == undefined) {
        animeURL.searchParams.set('page', localStorage.getItem('active'));
        localStorage.setItem('active', '1');
        localStorage.setItem('page', 'https://api.jikan.moe/v4/anime?limit=24&page=1&type=' + localStorage.getItem('inputText'));
        document.querySelector('.dropdown-trigger').textContent = localStorage.getItem('inputText');
        localStorage.setItem('name', localStorage.getItem('filter'));
        window.location.href = '#streaming';
        filterByType();
        filterByTypeIfNotAll();
        filterByName();
    }
    if (allAnimePaginationData[0]?.pagination?.last_visible_page == undefined) {
        let pagination = {
            pagination: {
                last_visible_page: 1
            }
        };
        allAnimePaginationData.push(pagination);
    }
    if (currentPage == allAnimePaginationData[0].pagination.last_visible_page - 1) {
        finalCount = allAnimePaginationData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimePaginationData[0].pagination.last_visible_page - 2) {
        finalCount = allAnimePaginationData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimePaginationData[0].pagination.last_visible_page - 3) {
        finalCount = allAnimePaginationData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimePaginationData[0].pagination.last_visible_page - 4) {
        finalCount = allAnimePaginationData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimePaginationData[0].pagination.last_visible_page - 5) {
        finalCount = allAnimePaginationData[0].pagination.last_visible_page - 1;
    }
    if (currentPage == allAnimePaginationData[0].pagination.last_visible_page) {
        finalCount = allAnimePaginationData[0].pagination.last_visible_page - 1;
    }

    for (let i = initialCount; i <= finalCount; i++) {
        const pageLi = document.createElement('li');
        const pageA = document.createElement('a');
        pageLi.className = 'waves-effect waves-orange';
        pageA.href = '#streaming';
        pageA.textContent = i;
        pageLi.appendChild(pageA);
        //Adding the active class at reloading the page.
        if (localStorage.getItem('active').includes(i)) {
            removeActiveClass();
            pageLi.className = 'active waves-effect waves-orange';
        }

        pageLi.addEventListener('click', () => {
            removeActiveClass();
            pageLi.classList.add('active');
            //VALIDATIONS
            if (parseFloat(document.querySelector('.active').textContent) >= 2) {
                firstInput.disabled = false;
            } else {
                firstInput.disabled = true;
            }
            //Creating again all elements.
            localStorage.removeItem('active');
            localStorage.setItem('active', pageA.textContent);
            localStorage.removeItem('page');
            animeURL.searchParams.set('page', localStorage.getItem('active'));
            localStorage.setItem('page', animeURL.href);
            location.reload();
            ///////////Adding the page and type to the pagination/////////////
            filterByType();
            filterByTypeIfNotAll();
            filterByName();
        });
        document.querySelector('.insertPagination').append(pageLi);
    }


    if (parseInt(localStorage.getItem('active')) <= allAnimePaginationData[0].pagination.last_visible_page - 7) {
        const pageLi = document.createElement('li');
        const pageButton = document.createElement('button');
        pageLi.className = 'pageButton';
        pageButton.className = 'pageButton';
        pageButton.textContent = '...';
        pageButton.disabled = true;
        pageLi.appendChild(pageButton);

        pageLi.addEventListener('click', () => {
            removeActiveClass();
            pageLi.classList.add('active');
        });

        document.querySelector('.insertPagination').append(pageLi);
    }

    const penultimateLi = document.createElement('li');
    const penultimateA = document.createElement('a');

    penultimateLi.className = 'waves-effect waves-orange';
    penultimateA.textContent = allAnimePaginationData[0].pagination.last_visible_page;
    penultimateA.href = '#streaming';

    //Adding the active class at reloading the page.
    if (localStorage.getItem('active').includes(penultimateA.textContent)) {
        removeActiveClass();
        penultimateLi.className = 'active waves-effect waves-orange';
    }

    penultimateLi.addEventListener('click', () => {
        removeActiveClass();
        penultimateLi.className = 'active waves-effect waves-orange';
        //Creating again all elements.
        localStorage.removeItem('active');
        localStorage.setItem('active', penultimateA.textContent);
        localStorage.removeItem('page');
        animeURL.searchParams.set('page', localStorage.getItem('active'));
        localStorage.setItem('page', animeURL.href);
        location.reload();
        ///////////Adding the page and type to the pagination/////////////
        filterByType();
        filterByTypeIfNotAll();
        filterByName();
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
        let mainActiveNumber = document.querySelector('.active').textContent;
        let mainActiveNumberResult = (parseFloat(mainActiveNumber)) + 1;
        removeActiveClass();
        let activeResult = document.evaluate(`//li[contains(.,${mainActiveNumberResult})]`, document, null, XPathResult.ANY_TYPE, null);
        let changeActiveResult = activeResult.iterateNext();
        changeActiveResult.className = 'active';
        if (changeActiveResult.textContent.includes('Option')) {
            changeActiveResult.textContent = changeActiveResult.textContent.replace('Option', '').trim();
        }
        localStorage.setItem('active', changeActiveResult.textContent);
        animeURL.searchParams.set('page', localStorage.getItem('active'));
        localStorage.setItem('page', animeURL.href);
        //VALIDATIONS
        if (changeActiveResult.textContent == allAnimePaginationData[0].pagination.last_visible_page) {
            lastInput.disabled = true;
        } else {
            lastInput.disabled = false;
        }
        ///////////Adding the page and type to the pagination/////////////
        filterByType();
        filterByTypeIfNotAll();
        filterByName();
        location.reload();
        window.location.href = '#streaming';
    });
    //VALIDATIONS
    if (localStorage.getItem('active') == allAnimePaginationData[0].pagination.last_visible_page) {
        lastInput.disabled = true;
    } else {
        lastInput.disabled = false;
    }
    document.querySelector('.insertPagination').append(lastLi);
}

const filterByType = () => {
    localStorage.setItem('inputText', document.querySelector('.dropdown-trigger').textContent.toLowerCase());
    let actualPageAndType = localStorage.getItem('page') + '&type=' + localStorage.getItem('inputText');
    localStorage.setItem('filter', actualPageAndType);
}

const filterByTypeIfNotAll = () => {
    ///////////Filter if any type except all/////////////
    if (localStorage.getItem('inputText').includes('all')) {
    } else {
        localStorage.setItem('page', localStorage.getItem('filter'));
    }
}

const filterByName = () => {
    ///////////Filter if any name except empty on the first letter/////////////
    if (document.querySelector('#autocomplete-input').value == '') {
        if (localStorage.getItem('name').includes('&letter=')) {
            localStorage.setItem('name', localStorage.getItem('name').replace('&letter=', ''));
        }
       filterByType();
       filterByTypeIfNotAll();
    } else {
        localStorage.setItem('page', localStorage.getItem('filter') + '&letter=' + localStorage.getItem('inputSearch'));
    } 
} 

const removeActiveClass = () => {
    const allActiveElements = document.querySelectorAll('.active');
    allActiveElements.forEach(element => {
        element.classList.remove('active');
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
})

document.querySelector('.questions').addEventListener('click', () => {
    alert('ERROR 404 please, try again later.')
})

document.querySelector('.questions2').addEventListener('click', () => {
    alert('ERROR 404 please, try again later.')
})

const mainVideoReproduction = () => {
    var x = document.createElement("video");
    x.setAttribute("id", "myVideo");
    x.setAttribute("class", 'parallaxVideo responsive-video');
    x.setAttribute("controls", "controls");
    var y = document.createElement("source");
    y.setAttribute("src", 'file:///C:/Users/randy/OneDrive/Escritorio/ProyectosCursoEmmanuel/EmmaHomeworks/ANIMEAPI/images/mainVideoTrailer.mp4');
    y.setAttribute("type", "video/mp4");
    x.appendChild(y);
    x.loop = true;
    x.autoplay = true;
    document.querySelector('.videoContainer').appendChild(x);
}

const animeDirectoryAtReload = () => {
    animeURL.searchParams.set('page', localStorage.getItem('active'));
    localStorage.setItem('active', '1');
    localStorage.setItem('page', 'https://api.jikan.moe/v4/anime?limit=24&page=1');
    localStorage.setItem('inputText', 'all');
    localStorage.setItem('inputSearch', '');
    localStorage.setItem('name', localStorage.getItem('filter'));
    location.reload();
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const onLoadFunction = window.onload = async () => {
    await getAllAnimeData();
    createAllAnimeElements();
    if (document.querySelector('#autocomplete-input').value == '') {
        document.querySelector('#autocomplete-input').value = localStorage.getItem('inputSearch');
    }
   
    createPaginationBasedOnNeededAmount();
    document.querySelector('.dropdown-trigger').textContent = localStorage.getItem('inputText');
    document.querySelectorAll('.selectedOptions').forEach(option => {
        option.addEventListener('click', () => {
            removeActiveClass()
            localStorage.setItem('active', 1);
            location.reload();
            window.location.href = '#streaming';
            filterByType();
            filterByTypeIfNotAll();
        });
    })
    document.querySelector('#autocomplete-input').addEventListener('keypress', function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            localStorage.setItem('name', localStorage.getItem('filter') + '&letter=' + document.querySelector('#autocomplete-input').value.replace(/\s+/g, '').toLowerCase())
            localStorage.setItem('inputSearch', document.querySelector('#autocomplete-input').value.toLowerCase());
            location.reload();
            window.location.href = '#streaming';
            filterByType();
            filterByTypeIfNotAll();
           
            if (document.querySelector('#autocomplete-input').value == '') {
                localStorage.setItem('page', `https://api.jikan.moe/v4/anime?limit=24&page=1&type=${localStorage.getItem('inputText')}`);
            } else {
                filterByName();
            }
        }
    });
}