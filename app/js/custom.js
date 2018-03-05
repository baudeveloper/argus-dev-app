//========================
// Strict Syntax Rendering
//========================
"use strict";

//=============
// jQuery Logic
//=============
$(function() {
	var siteBanner = $("[data-js=\"site-header\"]");
	var imgSrc = siteBanner.find(".site--header-img").attr("src");
	siteBanner.css("backgroundImage", "url("+imgSrc+")");

	var siteCompactBanner = $("[data-js=\"site-banner\"]");
	var imgCompactSrc = siteCompactBanner.find(".site--banner-img").attr("src");
	siteCompactBanner.css("backgroundImage", "url("+imgCompactSrc+")");

	// $("[data-js=\"modal-team-member\"]").click(function(e) {
	// 	var tab = e.target.hash;
	// 	$("li > a[href=\"" + tab + "\"]").tab("show");
	// });

	$("a[data-toggle=modal][data-target]").click(function() {
		var target = $(this).attr("href");
		$("a[data-toggle=tab][href=" + target + "]").tab("show");
	});
})();

// Start your scripts here please...
