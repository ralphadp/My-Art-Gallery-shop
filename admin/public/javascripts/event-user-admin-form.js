(() => {

    const upload = new ThumbUploader('imageForm', 'preview', 'user-photo');

    /**** SUBMIT BUTTON ****/
    document.getElementById('btnSubmit').onclick = upload.uploadEvent.bind(upload);
    /**** CHANGE IMAGE ****/
    document.getElementById('input-thumb').onchange = upload.displayPreviewPhoto.bind(upload);

})();