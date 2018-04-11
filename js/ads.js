// Copyright 2017 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var adsManager;
var adsLoader;
var adDisplayContainer;
var playButton;
var videoContent;
var adsInitialized;
var autoplayAllowed;
var autoplayRequiresMuted;
var intervalTimer;
var responseTime = 0;
var responseTimer;

function initDesktopAutoplayExample() {
    videoContent = document.getElementById('content_video');
    setUpIMA();
    // Check if autoplay is supported.
    responseTime =0;
    responseTimer = setInterval(
        function () {
            responseTime += 0.1;

        },
        100);
    checkAutoplaySupport();
}

function checkAutoplaySupport() {
    // Test for autoplay support with our content player.
    var playPromise = videoContent.play();
    if (playPromise !== undefined) {
        playPromise.then(onAutoplayWithSoundSuccess).catch(onAutoplayWithSoundFail);
    }
}

function onAutoplayWithSoundSuccess() {
    // If we make it here, unmuted autoplay works.
    videoContent.pause();
    autoplayAllowed = true;
    autoplayRequiresMuted = false;
    autoplayChecksResolved();
}

function onAutoplayWithSoundFail() {
    // Unmuted autoplay failed. Now try muted autoplay.
    checkMutedAutoplaySupport();
}

function checkMutedAutoplaySupport() {
    videoContent.volume = 0;
    videoContent.muted = true;
    var playPromise = videoContent.play();
    if (playPromise !== undefined) {
        playPromise.then(onMutedAutoplaySuccess).catch(onMutedAutoplayFail);
    }
}

function onMutedAutoplaySuccess() {
    // If we make it here, muted autoplay works but unmuted autoplay does not.
    videoContent.pause();
    autoplayAllowed = true;
    autoplayRequiresMuted = true;
    autoplayChecksResolved();
}

function onMutedAutoplayFail() {
    // Both muted and unmuted autoplay failed. Fall back to click to play.
    videoContent.volume = 1;
    videoContent.muted = false;
    autoplayAllowed = false;
    autoplayRequiresMuted = false;
    autoplayChecksResolved();
}

function setUpIMA() {
    // Create the ad display container.
    createAdDisplayContainer();
    // Create ads loader.
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);
    // Listen and respond to ads loaded and error events.
    adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded,
        false);
    adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError,
        false);

    // An event listener to tell the SDK that our content video
    // is completed so the SDK can play any post-roll ads.
    videoContent.onended = contentEndedListener;
}

function contentEndedListener() {
    videoContent.onended = null;
    if (adsLoader) {
        adsLoader.contentComplete();
    }
}

function autoplayChecksResolved() {
    // Request video ads.
    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = document.getElementById('tag_text').value;

    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.
    adsRequest.linearAdSlotWidth = 640;
    adsRequest.linearAdSlotHeight = 400;

    adsRequest.nonLinearAdSlotWidth = 640;
    adsRequest.nonLinearAdSlotHeight = 150;

    adsRequest.setAdWillAutoPlay(autoplayAllowed);
    adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
    adsLoader.requestAds(adsRequest);
}

function createAdDisplayContainer() {
    // We assume the adContainer is the DOM id of the element that will house
    // the ads.
    adDisplayContainer = new google.ima.AdDisplayContainer(
        document.getElementById('adContainer'), videoContent);
}

function playAds() {
    try {
        if (!adsInitialized) {
            adDisplayContainer.initialize();
            adsInitialized = true;
        }
        // Initialize the ads manager. Ad rules playlist will start at this time.
        adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
        // Call play to start showing the ad. Single video and overlay ads will
        // start at this time; the call will be ignored for ad rules.
        adsManager.start();
    } catch (adError) {
        // An error may be thrown if there was a problem with the VAST response.
        videoContent.play();
    }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
    // Get the ads manager.
    var adsRenderingSettings = new google.ima.AdsRenderingSettings();
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    // videoContent should be set to the content video element.
    adsManager = adsManagerLoadedEvent.getAdsManager(
        videoContent, adsRenderingSettings);

    // Add listeners to the required events.
    adsManager.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        onContentPauseRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        onContentResumeRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
        onAdEvent);

    // Listen to any additional events, if necessary.
    adsManager.addEventListener(
        google.ima.AdEvent.Type.LOADED,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.STARTED,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.COMPLETE,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.FIRST_QUARTILE,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CLICK,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.MIDPOINT,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.PAUSED,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.STARTED,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.THIRD_QUARTILE,
        onAdEvent);
    if (autoplayAllowed) {
        playAds();
    } 
}

function onAdEvent(adEvent) {
    console.log('EVENT HAPPENING = ', adEvent)
    var ad = adEvent.getAd();
    switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            clearInterval(intervalTimer);
            console.log("Event: Ads loaded");
            $('#tag-request').css({ 'color': 'green', 'border-color': 'green' });
            $('#tag-request-wait').text('')

            if (!ad.isLinear()) {
                videoContent.play();
            }
            break;

        case google.ima.AdEvent.Type.STARTED:
            console.log("Event: Ads Started");
            $('#tag-start').css({ 'color': 'green', 'border-color': 'green', });
            $('#tag-start-wait').text('');
            clearInterval(responseTimer);
            $('#tag-start-res').html(`Response time: ${responseTime.toFixed(2)} sec\n`);
           
            intervalTimer = setInterval(
                function () {
                    let remainingTime = adsManager.getRemainingTime().toFixed(0);    
                        if (remainingTime == '-1') {
                            remainingTime = '0:00'
                        }   
                    $('#tag-start-dur').html(`Duration: ${ad.getDuration().toFixed(0) } sec \n ${remainingTime} sec remaining`);
                },
                1000);
            break;

        case google.ima.AdEvent.Type.FIRST_QUARTILE:
            console.log("Event: FIRST_QUARTILE");
            $('#tag-quarter-wait').text('');
            $('#tag-quarter').css({ 'color': 'green', 'border-color': 'green', });
            break;

        case google.ima.AdEvent.Type.CLICK:
            console.log("Event: CLICKED");
            break;

        case google.ima.AdEvent.Type.MIDPOINT:
            console.log("Event: HALF WAY");
            $('#tag-half-wait').text('');
            $('#tag-half').css({ 'color': 'green', 'border-color': 'green', });
            break;

        case google.ima.AdEvent.Type.THIRD_QUARTILE:
            console.log("Event: THIRD_QUARTILE");
            $('#tag-third-wait').text('');
            $('#tag-third').css({ 'color': 'green', 'border-color': 'green', });
            break;

        case google.ima.AdEvent.Type.COMPLETE:
            console.log("Event: COMPLETED");
            $('#tag-complete-wait').text('');
            $('#tag-complete').css({ 'color': 'green', 'border-color': 'green', });
            break;

        case google.ima.AdEvent.Type.PAUSED:
            break;
    }
}

function onAdError(adErrorEvent) {
    $('#tag-error-wait').text('');
    $('#tag-error').css({ 'color': 'red', 'border-color': 'red'});
    clearInterval(responseTimer);
    $('#tag-error-msg').html(`Error Message: ${adErrorEvent.getError()}`)
    $('#tag-error-res').html(`Response time: ${responseTime.toFixed(2)} sec\n`);
    console.log(adErrorEvent.getError());
    console.log("Event: Error Occured");
    adsManager.destroy();
}

function restart(){
    adsManager.destroy();
}

function onContentPauseRequested() {
    videoContent.pause();
    videoContent.onended = null;
}

function onContentResumeRequested() {
    videoContent.play();
    videoContent.onended = contentEndedListener;
}

function playAds() {
    // Initialize the container. Must be done via a user action on mobile devices.
    videoContent.load();
    adDisplayContainer.initialize();

    try {
        // Initialize the ads manager. Ad rules playlist will start at this time.
        adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
        // Call play to start showing the ad. Single video and overlay ads will
        // start at this time; the call will be ignored for ad rules.
        adsManager.start();
    } catch (adError) {
        // An error may be thrown if there was a problem with the VAST response.
        videoContent.play();
    }
}