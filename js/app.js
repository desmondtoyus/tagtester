$('#test_tag').on('click', function (e) {
    e.preventDefault();
    let tag = $("#tag_text").val().trim();
    let id = "content_video";
    console.log("TAG=", tag);
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
