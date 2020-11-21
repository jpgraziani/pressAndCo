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

function testParms() {
  const myparam = {
    name: 'olivia',
    age: 13
  }
  let test = formatParams(myparam);
  console.log(test)

}
testParms()

/*****************************************/
/* NEWSWIRE API DATA */
/*****************************************/





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

}

//handle clear search results
function handleClearSearch() {

}

/*****************************************/
/* LOAD THESE ITEMS WHEN APP PAGE LOADS */
/*****************************************/
//CREATE FUNCTION THAT HOLDS ALL LOAD FUNCTIONS
function initializeApp() {

}

$(initializeApp)