/**
 * In case image upload was good, set the user photo
 * @param {*} response 
 */
const uploadSuccess = (response) => {
    let photoId = 'SERVER ERROR, none filename was return';
    if (response.files.length) {
        photoId = response.files[0].split('.')[0];
    }
    document.getElementById('user-photo').value = photoId;
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