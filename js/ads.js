



var myVar;
let Player = function (id, vastTag, firstTime) {
    this.id = id;
    this.console = document.getElementById('ima-sample-console');
    this.playerz = videojs(id);
    this.destroyAdsManager = this.destroyAdsManager.bind(this)
    // this.destroyAdsManager();
    this.init = function () {
        let player = videojs('content_video');
      
        

        let options = {
            id: id,
            adTagUrl: vastTag,
            adsManagerLoadedCallback: this.adsManagerLoadedCallback.bind(this),
            preload: 'auto',
            // showControlsForJSAds: false
        };
        if (firstTime > 1 ) {
            console.log('Settings2', this.settings);
            console.log('Not First time', firstTime);
            console.log('vastTag', vastTag);

            if ('undefined' !== typeof vastTag) {
                setTimeout(function () {
                    player.pause();
                }, 200);
               player.ima.initializeAdDisplayContainer();
                player.ima.setContentWithAdTag(null, vastTag, true);
                player.ima.requestAds();
            }
        
        } else {
            console.log('Settings', this.options);
            console.log('First time');
            player.ima(options); 
        }
        

        // Remove controls from the player on iPad to stop native controls from stealing
        // our click
        let contentPlayer = document.getElementById(id);
        if ((navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) &&
            contentPlayer.hasAttribute('controls')) {
            contentPlayer.removeAttribute('controls');
        }

        // Initialize the ad container when the video player is clicked, but only the
        // first time it's clicked.
        let startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            startEvent = 'touchend';
        }
        player.on('adserror', function () {
            console.log('Error Occured at', id);

        });
        player.on('adstart', function (imaAdStartEvent) {
            myVar = setInterval(function () {
                let timer = $("#content_video_ima-countdown-div").text();
                let myTimer = timer.split(" ");
                console.log('TIMER=', myTimer[1]);
                if (myTimer[1] == '0:01') {
                    console.log('SHOULD PAUSE HERE!!');
                    pause(id);
                    $("#content_video_ima-countdown-div").text(" ");
                    
                } }, 1000);
        });
        player.on('adend', function () {
            myStopFunction();
    
        });

        player.one(startEvent, function () {
            player.ima.initializeAdDisplayContainer();
        });

       
    }
}
Player.prototype.adsManagerLoadedCallback = function () {
    let events = [
        google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
        google.ima.AdEvent.Type.CLICK,
        google.ima.AdEvent.Type.COMPLETE,
        google.ima.AdEvent.Type.FIRST_QUARTILE,
        google.ima.AdEvent.Type.LOADED,
        google.ima.AdEvent.Type.MIDPOINT,
        google.ima.AdEvent.Type.PAUSED,
        google.ima.AdEvent.Type.STARTED,
        google.ima.AdEvent.Type.THIRD_QUARTILE
    ];

    for (let index = 0; index < events.length; index++) {
        this.playerz.ima.addEventListener(
            events[index],
            this.onAdEvent.bind(this));
    }
};

Player.prototype.onAdEvent = function (event) {
    let endingPlay = document.getElementById(this.id);
    if (event.type == 'loaded') {
    }
    console.log("EVENT", event.type);
    if (event.type == 'start') {
        console.log("EVENT", event.type);

    }
    if (event.type == 'pause') {
        console.log("EVENT", event.type);
    }

    if (event.type == 'complete') {
        // if (this.inArticle == 'in_article')
        console.log("EVENT", event.type);
    }
};

Player.prototype.destroyAdsManager = function () {
    if (this.adsManager) {
        console.log("AD MANAGER");
        this.adsManager.destroy();
        this.adsManager= null;
    }
};



function myStopFunction() {
    clearInterval(myVar);
}


function pause(id) {
    var player = videojs(id);
    player.ima.pauseAd();
    myStopFunction();
}