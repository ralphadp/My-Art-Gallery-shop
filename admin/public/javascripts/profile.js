(() => {
    
    /**
     * Enable / disable all the elements at profile form
     * @param {*} enable 
     */
    const enableProfileForm = (enable) => {
        const profile = document.getElementsByClassName('profile_input');
        for (let index = 0; index < profile.length; index++) {
            profile.item(index).readOnly = !enable;
            profile.item(index).disabled = !enable;    
        }
    }

    document.getElementById('enable_profile_edition').addEventListener('click', (event) => {
        enableProfileForm(event.currentTarget.checked);
    });

})();