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
      $('js-error-message').text('oops something went wrong:', err)
    });
  }

/***** display data on DOM *****/
function displayNewsWireDOM(getJson) {
  let data = getJson.results;
  console.log(data)
  data.map(article => {
    if (article.abstract.length >= 1 &&
        article.byline.length >= 1) {
          $('main').find('#js-real-time-results').append(`
            <article class="overview-card">
              <h3>${article.title}</h3>
              <p>${article.byline}</p>
              <div>
                <p>${article.abstract}</p>
              </div>
            </article>
          `);
        }
  })
}

/*****************************************/
/* SEARCH ARTICLES API */
/*****************************************/





/*****************************************/
/* EVENT HANDLES */
/*****************************************/
//handle for deep search
function handleSearchArticlesBtn() {

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