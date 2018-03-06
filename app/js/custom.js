//========================
// Strict Syntax Rendering
//========================
"use strict";

//=============
// jQuery Logic : Start your scripts here please...
//=============
$(function() {
	var siteBanner = $("[data-js=\"site-header\"]");
	var imgSrc = siteBanner.find(".site--header-img").attr("src");
	siteBanner.css("backgroundImage", "url("+imgSrc+")");

	var siteCompactBanner = $("[data-js=\"site-banner\"]");
	var imgCompactSrc = siteCompactBanner.find(".site--banner-img").attr("src");
	siteCompactBanner.css("backgroundImage", "url("+imgCompactSrc+")");

	// $("a[data-toggle=modal][data-target]").click(function() {
	// 	var target = $(this).attr("href");
	// 	$("a[data-toggle=tab][href=" + target + "]").tab("show");
	// });
})();