function getRandomIntInclusive(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function injectHTML(list){
    console.log('fired injectHTML');
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = '';
    list.forEach((item) => {
        const str = `<li><a href="${item.website}" target="_blank">${item.market_name}</a>/
        Dates: (${item.season1_date}) meat? (${item.meat}) seafood? (${item.seafood})</li>`;
        //const str = `<li>${item.market_name}</li>`;
        target.innerHTML += str;
    });
}

function filterList(list, query) {
    return list.filter((item) => {
        const lowerCaseName = item.market_name.toLowerCase();
        const lowerCaseQuery = query.toLowerCase();
        return lowerCaseName.includes(lowerCaseQuery);
    });
}

function cutMarketList(list){
    console.log('fired cut list');
    const range = [...Array(5).keys()];
    return newArray = range.map((item) => {
        const index = getRandomIntInclusive(0, list.length-1);
        return list[index];
    });
}


async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const loadDataButton = document.querySelector('#data_load');
    const clearDataButton = document.querySelector('#data_clear');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#market');

    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
    generateListButton.classList.add('hidden');


    const storedData = localStorage.getItem('storedData');
    let parsedData = JSON.parse(storedData);
    if (parsedData?.length > 0) {
        generateListButton.classList.remove('hidden');
    }

    let currentList = []; // this is "scoped" to the main event function
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener("click", async (submitEvent) => {
      // async has to be declared on every function that needs to "await" something

      // This prevents your page from becoming a list of 1000 records from the county, even if your form still has an action set on it
      //submitEvent.preventDefault();

      // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
      console.log("Loading data");
      loadAnimation.style.display = "inline-block";


        // Basic GET request - this replaces the form Action
        const results = await fetch(
            "https://data.princegeorgescountymd.gov/resource/sphi-rwax.json"
        );

        // This changes the response from the GET into data we can use - an "object"
        const storedList = await results.json();
        localStorage.setItem('storedData', JSON.stringify(storedList));
        parsedData = storedList;
  
        if (parsedData?.length > 0) {
          generateListButton.classList.remove('hidden');
      }
        loadAnimation.style.display = "none";
});


generateListButton.addEventListener('click',(event) =>{
  console.log('generate new list');
  currentList = cutMarketList(parsedData);
  console.log(currentList);
  injectHTML(currentList);
})

textField.addEventListener('input', (event) => {
    console.log('input', event.target.value);
    const newList = filterList(currentList, event.target.value);
    console.log(newList);
    injectHTML(newList);
})
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests


