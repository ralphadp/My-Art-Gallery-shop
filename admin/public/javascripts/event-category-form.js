(() => {

    const categoryType = new CategoryTypeFilter('category_path');
    /*** KEYPRESS FILTER EVENT  ***/
    document.getElementById('category_name').onkeypress = categoryType.filterKeypressEvent.bind(categoryType);
    /*** NAME INPUT COPY TO TYPE ***/
    document.getElementById('category_name').oninput = categoryType.copyEvent.bind(categoryType); 

})();