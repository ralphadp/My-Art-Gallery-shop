(() => {

    document.getElementById('category_name').addEventListener('keypress', (event) => {
        let char = String.fromCharCode(event.which);
        if (!/^[a-zA-Z ]+$/.test(char)) {
            event.preventDefault();
        }
     });

     document.getElementById('category_name').addEventListener('input', (event) => { 
        let categoryName = document.getElementById('category_name').value;
        categoryName = categoryName.toLocaleLowerCase();
        document.getElementById('category_path').value = categoryName.replace(/ /g,'-');    
    });

})();