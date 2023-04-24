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