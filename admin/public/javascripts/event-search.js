(() => {
   
    const search = new Search(
        document.getElementsByClassName('search-bar').item(0),
        document.getElementById('search-input')
    );

    document.getElementsByClassName('item').item(3).onclick = search.toogleSearch.bind(search);

    document.getElementsByClassName('vertical-item').item(3).onclick = search.toogleSearch.bind(search);

    document.getElementById('search-button').onclick = search.process.bind(search);

    document.getElementById('search-input').onkeypress = search.keypressEvent.bind(search);

})();