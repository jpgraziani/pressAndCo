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
//fetch real-time sections
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

function fetchNewsWireData(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
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
    createNewsWireUrl()
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