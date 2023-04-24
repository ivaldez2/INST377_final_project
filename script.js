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