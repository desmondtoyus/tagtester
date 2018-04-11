$('#test_tag').on('click', function (e) {
    e.preventDefault();
    let tag = $("#tag_text").val().trim();
    let id = "content_video";
    console.log("TAG=", tag);
    $('#tag-request').css({ 'color': '', 'border-color': '' });
    $('#tag-request-wait').text('waiting');

    $('#tag-start').css({ 'color': '', 'border-color': '' });
    $('#tag-start-wait').text('waiting');
    $('#tag-start-res').text('');
    $('#tag-start-dur').text('');
    
    $('#tag-quarter').css({ 'color': '', 'border-color': '' });
    $('#tag-quarter-wait').text('waiting');
    
    $('#tag-half').css({ 'color': '', 'border-color': '' });
    $('#tag-half-wait').text('waiting');

    $('#tag-third').css({ 'color': '', 'border-color': '' });
    $('#tag-third-wait').text('waiting');

    $('#tag-complete').css({ 'color': '', 'border-color': '' });
    $('#tag-complete-wait').text('waiting');


    $('#tag-error-wait').css({ 'color': '' });
    $('#tag-error').css({ 'color': '', 'border-color': '' });

    $('#tag-error-msg').text('');
    $('#tag-error-res').text('');


// tag-third
// tag-complete
    if (tag == '') {
        console.log('Empty Textbox');
        $("#tag_text").css({ 'border-color': 'red' });
        $("#tag_text").attr('placeholder', 'Tag goes here');
    }
    else {
        $("#tag_text").css({ 'border-color': 'blue' });
        $("#tag_text").attr('placeholder', '');
        $(".settingsCollapse").slideToggle();
        initDesktopAutoplayExample();
        playAds();  
    }

})

$('.settingsHeader').on('click', function (e) {
    e.preventDefault();
    $(".settingsCollapse").slideToggle();
});
