"use strict";

$(function () {
  var player01 = new Plyr("#video001");
  setTimeout(function () {
    player01.poster = "https://arguswealth.bm/images/interest-accumulator-video-thumb.jpg";
  }, 500);
  var player02 = new Plyr("#video002");
  setTimeout(function () {
    player02.poster = "https://arguswealth.bm/images/national-pension-scheme-video-thumb.jpg";
  }, 500);
});
