var myTimer = 0;
$('#test_tag').on('click', function (e) {
    e.preventDefault();
    let tag = $("#tag_text").val().trim();
    let id = "content_video";
    $('#tag-request').css({ 'color': '', 'border-color': '' });
    $('#tag-request-wait').text('waiting');
    $('#tag-click-wait').text('waiting');
    $('#tag-click').css({ 'color': '', 'border-color': '' });
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
    $('#time-error').text('0');
    $('#error-code').text('n/a');
    $('#error-msg').text('n/a');
    $("#original-tag").text('');
    $("#request-tag").text('');
    $('#time-response').text('0');
    $('#ad-type').text('n/a');
    $('#ad-engine').text('n/a');
    $('#api-framework').text('n/a');
    $('.meta-display').css({ 'display': 'none' });
    if (tag == '') {
        $("#tag_text").css({ 'border-color': 'red' });
        $("#tag_text").attr('placeholder', 'Tag goes here');
    }
    else {
        myTimer++;
        $("#tag_text").css({ 'border-color': 'blue' });
        $("#tag_text").attr('placeholder', '');
        $(".settingsCollapse").slideToggle();
        if (myTimer > 1) {
            restart();
            initDesktopAutoplayExample();
            playAds();
        } else {
            initDesktopAutoplayExample();
        }

    }

})

$('.settingsHeader').on('click', function (e) {
    e.preventDefault();
    $(".settingsCollapse").slideToggle();
});
