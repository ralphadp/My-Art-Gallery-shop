(() => {
    const checkboxElement = document.getElementsByClassName('config-checkbox');

    for (let index = 0;  index < checkboxElement.length; index++) {
        checkboxElement.item(index).addEventListener('click', (event) => {
            document.getElementsByName(event.currentTarget.id)[0].value = event.currentTarget.checked ? 1 : 0;
        });    
    }

})();