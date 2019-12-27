/**
 * In case image upload was good, set the new ExternalId
 * @param {*} response 
 */
const uploadSuccess = (response) => {
    let newExternalId = 'ERROR, no file name code was back from server.';
    if (response.files.length) {
        newExternalId = response.files[0].split('.')[0];    
    }
    document.getElementById('piece-external-id').value = newExternalId;
    document.getElementById('image-stored').src = `http://localhost:8888/api/image/${response.type}/${newExternalId}`;

    alert(response.message);
};

/**
 * In case the failure, show the error
 * @param {*} responseError 
 */
const uploadFail = (responseError) => {
    alert(responseError.error);
};