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
	// siteBanner.attr("src", imgSrc);
	siteBanner.css("backgroundImage", "url("+imgSrc+")");
})();

// Start your scripts here please...
