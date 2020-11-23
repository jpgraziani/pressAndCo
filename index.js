'use strict';

const API_KEY = config.API_KEY;

/*****************************************/
/* NEWYORK TIMES API URLS */
/*****************************************/

const newsWireURL = 'https://api.nytimes.com/svc/news/v3/content/all/';

const searchURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';


/*****************************************/
/* GLOBAL PARAMS */
/*****************************************/
function formatParams(params) {
  const paramItems = Object.keys(params).map(key => 
    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
  return paramItems.join('&');
}

/*****************************************/
/* NEWSWIRE API DATA */
/*****************************************/

/***** create news url *****/
function createNewsWireUrl() {
  const params = {
    ['api-key']: API_KEY
  };
  //format key
  const apiKey = formatParams(params);
  //get value from option select on form
  const userSelect = $('select option:selected').text();
  //create url 
  const url = `${newsWireURL}${userSelect}?${apiKey}`;
  
  return fetchNewsWireData(url);
}

/***** fetch real-time sections *****/
function fetchNewsWireData(url) {
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(getJson => displayNewsWireDOM(getJson))
    .catch(err => {
      $('#js-error-message').text('oops something went wrong:', err)
    });
  }

/***** display data on DOM *****/

function displayNewsWireDOM(getJson) {
  //removes previous results
  $('#js-real-time-results').empty();
  let data = getJson.results;
  console.log(data)
  data.map(article => {
      if (article.abstract.length >= 1 &&
        article.byline.length >= 1 &&
        article.des_facet.length >= 2) {
          $('main').find('#js-real-time-results').append(`
            <article class="overview-card">
              <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
              <p>${article.byline}</p>
              <p>${article.abstract}</p>
              <p>published: ${article.published_date}</p>
              <div>
                <hr>
                <p>discover more articles ${article.byline.toLowerCase()}
                <button id="js-nameSearch" name="js-nameSearch" value="${article.byline}">locate stories</button></p>
              </div>
              <div>
              <p>search key terms:</p>
              <input type="button" id="js-nameSearch" value="${article.des_facet[0]}">
              <input type="button" id="js-nameSearch" value="${article.des_facet[1]}">
              </div>
            </article>
          `);
        }
  })
  
  //displays section
  $('#js-real-time').removeClass('hidden');
}

/*****************************************/
/* SEARCH ARTICLES API */
/*****************************************/

function createSearchArticlesUrl(query) {
  const params = {
    q: query,
    ['api-key']: API_KEY
  }

  const searchParams = formatParams(params)
  const url = `${searchURL}?${searchParams}`

  return fetchSearchArticleData(url);
}

function fetchSearchArticleData(url) {
console.log(url)
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText)
  })
  .then(getJson => displaySearchArticleDOM(getJson))
  .catch(err => {
    $('#js-error-message').text('opps something went wrong:', err)
  })
}

function displaySearchArticleDOM(getJson) {
  let data = getJson.response.docs;
  console.log('hehehe', data)
  $('#js-real-time-results').empty();
  $('#js-real-time').addClass('hidden');

  data.map(article => {
    $('main').find('#js-deep-search-results').append(`
      <article class="overview-card">
        <h3><a href="${article.web_url}" target="_blank">${article.headline.main}</a></h3>
        <p>${article.abstract}</p>
        <p>${article.byline.original}</p>
      </article>
    `);
  })
  
  $('#js-deep-search').removeClass('hidden');
}


/*****************************************/
/* EVENT HANDLES */
/*****************************************/
//handle for deep search
function handleSearchArticlesBtn() {
  $('main').on('click', '#js-nameSearch', function() {
    let authorSelect = $(this).val()
    createSearchArticlesUrl(authorSelect)
  })
}

//handle for sections
function handleSectionsSubBtn() {
  $('main').on('submit', '#js-newsWire-form', event => {
    event.preventDefault();
    createNewsWireUrl();
  });
}

//handle clear search results
function handleClearSearch() {
  $('main').on('click', '#reload', function() {
    window.location.reload();
  });
}

/*****************************************/
/* LOAD THESE ITEMS WHEN APP PAGE LOADS */
/*****************************************/
//CREATE FUNCTION THAT HOLDS ALL LOAD FUNCTIONS
function initializeApp() {
  
  handleSearchArticlesBtn()
  handleSectionsSubBtn()
  handleClearSearch()
}

$(initializeApp)