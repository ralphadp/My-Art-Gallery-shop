class CategoryTypeFilter {

    constructor(CATEGORY_TYPE_ID) {
        this.CATEGORY_TYPE_ID = CATEGORY_TYPE_ID;
    }

    filterKeypressEvent(event) {
        let char = String.fromCharCode(event.which);

        if (!/^[a-zA-Z ]+$/.test(char)) {
            event.preventDefault();
        }
    }

    copyEvent(event) {
        let categoryName = event.currentTarget.value;

        categoryName = categoryName.toLocaleLowerCase();
        document.getElementById(this.CATEGORY_TYPE_ID).value = categoryName.replace(/ /g,'-');
    }
};
