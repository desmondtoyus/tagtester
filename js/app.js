let firstTime = 0;
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
        // $('#content_video').dispose();
        firstTime++
        $("#tag_text").css({ 'border-color': 'blue' });
        $("#tag_text").attr('placeholder', '');
        $(".settingsCollapse").slideToggle();
        // if (firstTime > 1) {
        //     let player1 = new Player(id, tag, firstTime);
        //     player1.init();
        // } else {
        //     let player1 = new Player(id, tag, firstTime);
        //     player1.init();  
        // }
    
        let player1 = new Player(id, tag, firstTime);
        player1.init();  
    }

})

$('.settingsHeader').on('click', function (e) {
    e.preventDefault();
    $(".settingsCollapse").slideToggle();
});


// if (firstTimeAds == "yes") {
//     // The first time
//     player.ima(options);
//     firstTimeAds = "no";
// } else {
//     // alert ("not first time");
//     player.ima.changeAdTag(player.currentClip.ads.adCall);
//     player.ima.requestAds();
// }