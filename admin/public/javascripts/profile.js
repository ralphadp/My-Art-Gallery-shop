
class Profile {

    constructor(PROFILE_ROW_CLASSNAME) {
        this.profile = document.getElementsByClassName(PROFILE_ROW_CLASSNAME);
    }

    /**
     * Enable / disable all the elements in profile form
     * @param {*} event 
     */
    enableProfileForm (event) {
        const enable = event.currentTarget.checked;
        for (let index = 0; index < this.profile.length; index++) {
            this.profile.item(index).readOnly = !enable;
            this.profile.item(index).disabled = !enable;
        }
    }
};
