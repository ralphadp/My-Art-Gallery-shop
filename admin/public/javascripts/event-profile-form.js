(() => {

    const upload = new ThumbUploader('imageForm', 'preview', 'profile-photo-id');
    const profile = new Profile('profile_input');

    /**** SUBMIT BUTTON ****/
    document.getElementById('btnSubmit').onclick = upload.uploadEvent.bind(upload);
    /**** CHANGE IMAGE ****/
    document.getElementById('input-thumb').onchange = upload.displayPreviewPhoto.bind(upload);
    /**** ENABLE/DISABLE PROFILE INPOTS ****/
    document.getElementById('enable_profile_edition').onclick = profile.enableProfileForm.bind(profile);

})();