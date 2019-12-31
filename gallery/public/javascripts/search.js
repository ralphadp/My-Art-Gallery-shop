(() => 
{
    const search = (patternSearchText) => {
        if (patternSearchText.length > 0) {
            patternSearchText = patternSearchText.trim();
            const words = patternSearchText.replace(/\s+/g, "+");
            window.location.replace(window.location.origin + '/search/' + words);
        }
    }

    document.getElementById('input-search-art').addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            search(document.getElementById('input-search-art').value);
        }
    });

    document.getElementById('input-search-art-anchor').addEventListener('click', () => {
        search(document.getElementById('input-search-art').value);
    });
    
})();