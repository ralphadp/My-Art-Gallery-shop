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

/**
 * In case image upload was good, set the user photo
 * @param {*} response 
 */
const uploadSuccess = (response) => {
    let newExternalId = 'ERROR, no file name code was back from server.';
    if (response.files.length) {
        newExternalId = response.files[0].split('.')[0];    
    }
    document.getElementById('profile-photo-id').value = newExternalId;
    document.getElementById('profile-image-stored').src = `http://localhost:8888/api/image/${response.type}/${newExternalId}`;

    alert(response.message);
};

/**
 * In case the failure, show the error
 * @param {*} responseError 
 */
const uploadFail = (responseError) => {
    alert(responseError.error);
};