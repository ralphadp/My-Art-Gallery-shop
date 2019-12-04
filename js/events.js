(function() {
    document.getElementById('input-search-art').addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            alert('SEARCHING ...');
        }
    });

})();