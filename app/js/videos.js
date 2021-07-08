"use strict";

$(function () {
  var player01 = new Plyr("#video001");
  setTimeout(function () {
    player01.poster = "../images/interest-accumulator-video-thumb.jpg";
  }, 500);
  var player02 = new Plyr("#video002");
  setTimeout(function () {
    player02.poster = "../images/national-pension-scheme-video-thumb.jpg";
  }, 500);
  var player03 = new Plyr("#video003");
  setTimeout(function () {
    player03.poster = "../images/holiday-cheer.jpg";
  }, 500);
});
