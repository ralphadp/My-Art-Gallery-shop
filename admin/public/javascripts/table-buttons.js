class DOMButton {
    constructor(config) {
        this.unicodeIcon = config.unicodeIcon || '&#x2022;';
        this.background = config.background || 'black';
        this.clickEvent = config.clickEvent || (data => console.log('Unknown event'));
        this.data = config.data || null;
    }

    create() {
        const button = document.createElement("button");

        button.innerHTML = this.unicodeIcon;
        button.style.background = this.background;
        button.style.borderRadius = '5px';
        button.style.color = 'white';
        button.style.width = '1.5em';
        button.style.height = '1.5em';
        button.style.cursor = 'pointer';
        button.data = JSON.parse(this.data);
        button.addEventListener('click', this.clickEvent);

        return button;
    }
};

class TableButtons {

    constructor(deleteDialog, OBJECT_ID_TO_DELETE) {
        this.deleteDialog = deleteDialog;
        this.OBJECT_ID_TO_DELETE = OBJECT_ID_TO_DELETE;
    }

    /**
     * Set the function to build the path
     * @param {*} getRestPath 
     */
    setRestPathCallback(getRestPath) {
        if (getRestPath instanceof Function) {
            this.getRestPath = getRestPath;
        } else {
            console.log('The get rest path parameter is not a function');
        }
    };

    eventEdit(event) {
        let data = event.currentTarget.data;

        if (!(this.getRestPath instanceof Function)) {
            console.log('None url path is related to [Edit].');

            return false;
        }

        window.location.replace(
            window.location.origin + this.getRestPath(data)
        );
    };

    eventDelete(event) {
        let dataCategory = event.currentTarget.data;

        //update the delete dialog form
        document.getElementById(this.OBJECT_ID_TO_DELETE).value = dataCategory.id;
        //display the delete dialog form
        this.deleteDialog.show();
    };

    eventCancelDelete(event) {
        this.deleteDialog.close();
        /*To avoid to follow the action <form> route*/
        event.preventDefault();
    };

    /**
     * Attach buttons into table
     * 
     * @param {*} BUTTONS_CELL 
     * @param {*} STOP_BUTTON_ID 
     */
    attach (BUTTONS_CELL, STOP_BUTTON_ID) {
        let tableCells = document.getElementsByClassName(BUTTONS_CELL);

        for (let index = 0; index < tableCells.length; index++) {

            const cell = tableCells.item(index);
            const currentData = cell.getAttribute('data');

            cell.appendChild(new DOMButton({
                unicodeIcon: '&#x270e;',
                background: '#61d89d',
                clickEvent: this.eventEdit.bind(this),
                data: currentData
            }).create());

            cell.appendChild(new DOMButton({
                unicodeIcon: '&#x2718;',
                background: '#e73f5b',
                clickEvent: this.eventDelete.bind(this),
                data: currentData
            }).create());
        }

        /*TODO: Need to move this line to other place, not related to attach */
        document.getElementById(STOP_BUTTON_ID).addEventListener('click', this.eventCancelDelete.bind(this));
    };
};