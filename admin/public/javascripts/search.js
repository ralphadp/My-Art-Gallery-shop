class Search {
    constructor(TARGET_ELEMENT, PATTERN_INPUT_ELEMENT) {
        this.TARGET_ELEMENT = TARGET_ELEMENT;
        this.PATTERN_INPUT_ELEMENT = PATTERN_INPUT_ELEMENT;
    }

    /**
     * Show/hide the search input area
     * @param {*} event 
     */
    toogleSearch(event) {
        if (this.TARGET_ELEMENT.style.display === 'flex') {
            this.TARGET_ELEMENT.style.display = 'none';
        } else {
            this.TARGET_ELEMENT.style.display = 'flex';
        }
    };

    /**
     * Check if the key pressed is <ENTER> to process the searching
     * @param {*} event
     */
    keypressEvent(event) {
        if (event.keyCode === 13) {
            this.process();
        }
    }

    /**
     * Search method to call GET search/ 
     */
    process() {
        let textPattern = this.PATTERN_INPUT_ELEMENT.value;
        if (textPattern && textPattern.length) {
            //remove spaces and stick words with +
            textPattern = textPattern.trim();
            textPattern = textPattern.replace(/\s+/g, "+");

            //check if the curren href already have the /search/ path
            let href = window.location.href;
            const position = document.location.href.indexOf("/search/");
            if (position > 0) {
                href = document.location.href.substr(0, position + 1);
            }

            //relocate
            window.location.replace(
                href + `search/${textPattern}`
            );
        }
    };
};