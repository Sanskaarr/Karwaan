($j=jQuery.noConflict())(document).ready(function(){"use strict";var t=$j(".about_top_container img"),e=$j("button.about_scroll_to");t.velocity({opacity:1},2e3),e.velocity({opacity:1},2e3);var i,o,a=$j(".about_container");e.click(function(){$j("html, body").animate({scrollTop:a.offset().top},1e3)}),a.length&&(i=a.offset().top,o=!1,$j(window).scroll(function(){var t=$j(window).scrollTop();i<=t&&!o&&($j("body").addClass("animate"),$j(".about_slider").flexslider("play"),o=!0)})),$j(".about_slider").flexslider({animation:"fade",controlNav:!1,directionNav:!0,customDirectionNav:$j(".flex_custom_nav a"),slideshowSpeed:2e3,slideshow:!1,start:function(t){t.find(".current_slide").text(t.currentSlide+1),t.find(".total_slides").text(t.count)},after:function(t){t.find(".current_slide").text(t.currentSlide+1),t.find(".total_slides").text(t.count)}}),$j(".timeline_slider").flexslider({animation:"fade",controlNav:!1,directionNav:!1,slideshowSpeed:2e3,slideshow:!1,touch:!1,useCSS:!1});var n,l=$j(".timeline_position_indicator"),c=$j(".timeline_navigation li"),r=$j(".timeline_navigation li:first-child"),s=$j(".timeline_slider");r.length&&(r.addClass("active"),n=r.position().top),l.css({top:n}),c.bind("click touchstart",function(){$j(".timeline_navigation li.active").removeClass("active"),$j(this).addClass("active");var t=$j(this).position().top,e=$j(this).index();l.velocity({top:t},800,"easeOutCubic"),s.flexslider(e)}),$j("a.next_event").bind("click touchstart",function(){s.flexslider("next");var t=$j(this).attr("data-year"),e=$j('.timeline_navigation li[data-year="'+t+'"]'),i=e.position().top;l.velocity({top:i},800,"easeOutCubic"),$j(".timeline_navigation li.active").removeClass("active"),e.addClass("active")}),$j(".special_projects_slider").flexslider({animation:"slide",controlNav:!1,directionNav:!0,prevText:"",nextText:"",slideshowSpeed:2e3,slideshow:!1,animationLoop:!1,useCSS:!1,itemWidth:550})}),($j=jQuery.noConflict())(document).ready(function(){"use strict";var t=$j('.company_selection_form .individual_company_selection:first-child input[type="radio"]'),e=$j(".company_selection_form .individual_company_selection:first-child .radio_button"),i=t.val();e.addClass("active"),$j('#input_1_2 input[value="'+i+'"]').prop("checked",!0);var o=t.attr("data-email");$j("#company_to_email").text(o),$j('.company_selection_form input[type="radio"]').click(function(){var t=$j(this).val(),e=$j(this).attr("data-email");$j('#input_1_2 input[value="'+t+'"]').prop("checked",!0),$j("#company_to_email").text(e),$j(".radio_button.active").removeClass("active"),$j(this).closest(".individual_company_selection").find(".radio_button").addClass("active")})}),($j=jQuery.noConflict())(document).ready(function(){"use strict";$j(".back_to_top").click(function(){$j("html").velocity("scroll",2500,"easeOutCirc")});var e=$j("#mc-embedded-subscribe-form"),i=($j("#mc-embedded-subscribe-form input[type=submit]"),$j("#mc-embedded-subscribe-form input[type=email]"),$j("#mce-error-response")),o=$j("#mce-success-response");e.submit(function(t){t.preventDefault(),$j.ajax({method:"GET",url:e.attr("action"),data:e.serialize(),dataType:"jsonp",success:function(t){var e;"error"===t.result?(e=t.msg.slice(3),i.text(e).fadeIn(300).delay(2e3).fadeOut(300)):o.text("Success!").fadeIn(300).delay(2e3).fadeOut(300)}})})}),($j=jQuery.noConflict())(document).ready(function(){"use strict";window.history.replaceState({ajaxPage:!0,pageName:"home"},"home"),$j(window).on("popstate",function(t){null!==t.originalEvent.state&&window.location.reload()}),$j(".homepage_stills_slider").flexslider({animation:"fade",controlNav:!1,directionNav:!1,slideshowSpeed:2e3});var t="#FFFFFF",e="#000000",i="#2C2C2C",o=$j(".homepage_logo"),a=$j(".main_header"),n=($j(".homepage_panels"),$j(".motion")),l=$j(".motion h1"),c=$j(".motion_line"),r=$j("video.motion_background_video"),s=$j(".about"),d=$j(".about h1"),u=$j(".about_line"),m=$j(".about_background_image"),v=$j(".stills"),_=$j(".stills h1"),f=$j(".stills_line"),j=$j(".homepage_stills_slider"),h=$j(".homepage_motion_content"),$=$j(".homepage_about_content"),p=$j(".homepage_stills_content");setTimeout(function(){$j(".landing_logo_text").fadeOut(1500,function(){$j(".homepage_landing").fadeOut(1e3)})},2e3);var g=!1;d.hover(function(){g||(s.velocity({backgroundColor:t,backgroundColorAlpha:1,width:"50%",left:"25%"}),n.add(v).velocity({backgroundColor:e,backgroundColorAlpha:1}),l.add(_).velocity({color:i}),c.add(f).velocity({backgroundColor:i}),d.velocity({color:e}),m.velocity({opacity:1}),o.velocity({opacity:0}))},function(){g||(s.velocity({backgroundColor:t,backgroundColorAlpha:0,width:"33.33%",left:"33.33%"},{duration:50}),n.add(v).velocity({backgroundColor:t,backgroundColorAlpha:0},{duration:50}),l.add(_).velocity({color:t},{duration:50}),c.add(f).velocity({backgroundColor:t},{duration:50}),d.velocity({color:t},{duration:50}),m.velocity({opacity:0},{duration:50}),o.velocity("reverse"))}),d.click(function(){g=!0,$.load("about .about_container",function(){$j.ajaxSetup({cache:!0}),$j.getScript("wp-content/themes/jimmychin/js/custom/about.js"),$j.getScript("wp-content/themes/jimmychin/js/twitter/get_twitter.js"),$j.getScript("wp-content/themes/jimmychin/js/custom/footer.js"),$j(".mobile_homepage").remove(),window.history.pushState({ajaxPage:!0,pageName:"about"},"About","about")}),s.velocity({width:"100%",left:"0px",opacity:1},800,function(){d.velocity({opacity:0},1e3,function(){$.velocity("scroll",{duration:1e3,easing:"easeInCubic",offset:50,complete:function(){$j("body").addClass("animate"),$j(".about_slider").flexslider("play")}})})}),setTimeout(function(){a.removeClass("white")},1e3),$j(".homepage_background_overlay").remove(),$j(".menu li.current_page_item").removeClass("current_page_item"),$j(".menu li#menu-item-98").addClass("current_page_item")});var b=!1;l.hover(function(){b||(n.velocity({width:"50%"}),r.velocity({opacity:1}),c.velocity({width:"50%"}),s.velocity({left:"50%",backgroundColor:i,backgroundColorAlpha:1}),d.velocity({color:e}),u.velocity({opacity:0}),v.velocity({backgroundColor:e,backgroundColorAlpha:1}),_.velocity({color:i}),f.velocity({backgroundColor:i}),o.velocity({opacity:0}))},function(){b||(n.velocity({width:"33.33%"},{duration:50}),r.velocity({opacity:0},{duration:50}),c.velocity({width:"40px"},{duration:50}),s.velocity({left:"33.33%",backgroundColor:"rgba(255,255,255,0)",backgroundColorAlpha:0},{duration:50}),d.velocity({color:t},{duration:50}),u.velocity({opacity:1},{duration:50}),v.velocity({backgroundColor:t,backgroundColorAlpha:0},{duration:50}),_.velocity({color:t},{duration:50}),f.velocity({backgroundColor:t},{duration:50}),o.velocity("reverse"))}),l.click(function(){b=!0,h.load("motion #content",function(){$j.ajaxSetup({cache:!0}),$j.getScript("wp-content/themes/jimmychin/js/custom/motion.js"),$j(".mobile_homepage").remove(),window.history.pushState({ajaxPage:!0,pageName:"motion"},"Motion","motion")}),n.css("z-index",13),c.velocity({width:"80px"},{complete:function(){c.add(l).velocity({opacity:0},{complete:function(){n.velocity({width:"100%"},{duration:100},{easing:"easeInCubic"}),r.velocity({translateX:"0px"},function(){h.velocity({translateX:"0%"},{delay:300,complete:function(){$j("body").addClass("animate")}})})}})}}),setTimeout(function(){a.removeClass("white")},1e3),$j(".homepage_background_overlay").remove(),$j(".menu li.current_page_item").removeClass("current_page_item"),$j(".menu li#menu-item-100").addClass("current_page_item")});var y=!1;_.hover(function(){y||(n.velocity({backgroundColor:e,backgroundColorAlpha:1}),l.velocity({color:i}),c.velocity({backgroundColor:i}),s.velocity({left:"16.66%",backgroundColor:i,backgroundColorAlpha:1}),d.velocity({color:e}),u.velocity({opacity:0}),v.velocity({width:"50%",left:"50%"}),j.velocity({opacity:1}),f.velocity({width:"50%"}),o.velocity({opacity:0}))},function(){y||(n.velocity({backgroundColor:t,backgroundColorAlpha:0},{duration:50}),l.velocity({color:t},{duration:50}),c.velocity({backgroundColor:t},{duration:50}),s.velocity({left:"33.33%",backgroundColor:t,backgroundColorAlpha:0},{duration:50}),d.velocity({color:t},{duration:50}),u.velocity({opacity:1},{duration:50}),v.velocity({width:"33.33%",left:"66.66%"},{duration:50}),j.velocity({opacity:0},{duration:50}),f.velocity({width:"40px"},{duration:50}),o.velocity("reverse"))}),_.click(function(){y=!0,p.load("stills #content",function(){$j.ajaxSetup({cache:!0}),$j.getScript("wp-content/themes/jimmychin/js/custom/stills.js"),$j(".mobile_homepage").remove(),window.history.pushState({ajaxPage:!0,pageName:"stills"},"Stills","stills")}),v.css("z-index",13),f.velocity({width:"80px"},{complete:function(){f.add(_).velocity({opacity:0},{complete:function(){v.velocity({width:"100%",left:0},{duration:1e3,easing:"easeInCubic",complete:function(){p.velocity({translateX:"0%"},{delay:300})}})}})}}),setTimeout(function(){a.removeClass("white")},1e3),$j(".homepage_background_overlay").remove(),$j(".menu li.current_page_item").removeClass("current_page_item"),$j(".menu li#menu-item-102").addClass("current_page_item")})});var $j=jQuery.noConflict(),youtubeVideos={};function onYouTubePlayerAPIReady(){$j("iframe").each(function(){var t;-1!==$j(this).attr("src").indexOf("youtube")&&(t=$j(this).attr("id"),youtubeVideos[t]=new YT.Player($j(this)[0]))})}$j(".play_button").click(function(){var i=$j(this).closest(".individual_video"),o=i.find("iframe");i.find(".individual_video_cover_image").fadeOut("slow",function(){var t,e;i.find(".video_controls").fadeOut("slow"),-1!==o.attr("src").indexOf("youtube")?(t=o.attr("id"),youtubeVideos[t].playVideo()):-1!==o.attr("src").indexOf("vimeo")&&(e=i.find("iframe")[0],new Vimeo.Player(e).play())})}),($j=jQuery.noConflict())(document).ready(function(){"use strict";$j("body").hasClass("page-template-motion")&&$j("body").addClass("animate"),$j(".motion_videos").mousewheel(function(t,e){this.scrollLeft-=e,t.preventDefault()});function t(){$j(".motion_videos").stop()}$j("#motion_scroll_right").hover(function(){$j(".motion_videos").animate({scrollLeft:0},5e3,"linear")},t),$j("#motion_scroll_left").hover(function(){var t=$j(".motion_videos")[0].scrollWidth;$j(".motion_videos").animate({scrollLeft:-1*t},5e3,"linear")},t);$j(".motion_video_container").hover(function(){$j(this).find("video")[0].play(),$j(this).find(".motion_thumbnail").fadeTo(800,0),$j(this).find(".motion_overlay").fadeTo(800,1)},function(){var t=$j(this);$j(this).find(".motion_thumbnail").fadeTo(300,1,function(){t.find("video")[0].pause(),t.find("video")[0].currentTime=0}),$j(this).find(".motion_overlay").fadeTo(800,0)});var o=$j("#current_video_name"),a=$j("#current_video_position"),e=$j("#total_videos"),i=$j(".motion_videos .motion_video_container"),n=$j(window).width()/2,l=$j(".motion_videos .motion_video_container:first-child"),c=l.attr("data-name"),r=l.attr("data-position");o.text(c),a.text(r),e.text(i.length);var s=!1,d=!1;$j(".motion_videos").scroll(function(){var t=l.offset().left;n<=t?s||($j(".motion_page_title h1").fadeTo(300,0,function(){s=!1}),s=!0):d||($j(".motion_page_title h1").fadeTo(300,1,function(){d=!1}),d=!0),i.each(function(){var t=$j(this).attr("data-position"),e=$j(this).attr("data-name"),i=$j(this).offset().left;0<i&&i<n&&(o.text(e),a.text(t))})})}),($j=jQuery.noConflict())(document).ready(function(){"use strict";var t=window.location.search.substring(1);t&&($j(".publications_list li.active").removeClass("active"),$j('.publications_list li[data-publication="'+t+'"]').addClass("active"),$j(".publication_articles."+t).find("img.article_image").each(function(){var t=$j(this).attr("data-image");$j(this).attr("src",t),$j(this).removeAttr("data-image")}),$j(".publication_articles.active").hide().removeClass("active"),$j(".publication_articles."+t).fadeIn(500).addClass("active")),$j(".publications_filter li").click(function(){$j(".publications_filter li.active").removeClass("active"),$j(this).addClass("active");var t=$j(this).attr("data-category");$j(".publications_list li.active").removeClass("active"),$j(".publications_list li").each(function(){$j(this).hasClass(t)&&$j(this).addClass("active")})}),$j(".publications_list li").click(function(){var t=$j(this).attr("data-publication");$j(".publications_list li.active").removeClass("active"),$j(".publications_filter li.active").removeClass("active"),$j(this).addClass("active"),$j(".publication_articles."+t).find("img.article_image").each(function(){var t;$j(this)[0].hasAttribute("data-image")&&(t=$j(this).attr("data-image"),$j(this).attr("src",t),$j(this).removeAttr("data-image"))}),$j(".publication_articles.active").fadeOut(500,function(){$j(this).removeClass("active"),$j(".publication_articles."+t).fadeIn(500).addClass("active")})}),$j(".article_slider").flexslider({animation:"fade",controlNav:!1,slideshowSpeed:2e3,slideshow:!1,prevText:"",nextText:"",start:function(t){t.find(".current_slide").text(t.currentSlide+1),t.find(".total_slides").text(t.count)},after:function(t){t.find(".current_slide").text(t.currentSlide+1),t.find(".total_slides").text(t.count)}})}),($j=jQuery.noConflict())(document).ready(function(){"use strict";$j(".main_header .menu_button_container").click(function(){$j(".main_header .header_right").hasClass("menu_active")?($j(".main_header .header_right").removeClass("menu_active"),$j(".homepage_background_overlay").removeClass("menu_active")):($j(".main_header .header_right").addClass("menu_active"),$j(".homepage_background_overlay").addClass("menu_active"))});var t=$j(".mobile_header .menu_button_container"),e=$j(".mobile_menu"),i=$j(".close_mobile_menu");t.click(function(){e.addClass("active")}),i.click(function(){e.removeClass("active")}),$j(".carousel_slider").flexslider({animation:"slide",controlNav:!1,directionNav:!0,prevText:"",nextText:"",slideshowSpeed:2e3,slideshow:!1,useCSS:!1,animationLoop:!1,itemWidth:800}),$j('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').wrap("<div class='video_embed'/>"),$j(".video_embed").fitVids()}),($j=jQuery.noConflict())(document).ready(function(){});var mq=window.matchMedia("(min-width: 1024px)");mq.matches&&$j(".stills_grid").mousewheel(function(t,e){this.scrollLeft-=e,t.preventDefault()}),mq.addListener(function(t){t.matches?$j(".stills_grid").mousewheel(function(t,e){this.scrollLeft-=e,t.preventDefault()}):$j(".stills_grid").unbind("mousewheel")}),$j("#show_hide_filter").click(function(){$j(".stills_top_container").hasClass("filter_hidden")?($j("#show_hide_filter_text").text("Hide Menu"),$j(".stills_bottom_left_hidden_button").fadeOut(1e3)):($j("#show_hide_filter_text").text("Show Menu"),$j(".stills_bottom_left_hidden_button").fadeIn(1e3)),$j(".stills_top_container").toggleClass("filter_hidden")});var moveGridRight=function(){var t=$j(".stills_grid")[0].scrollWidth;$j(".stills_grid").animate({scrollLeft:t},5e3,"linear")},moveGridLeft=function(){$j(".stills_grid").animate({scrollLeft:0},5e3,"linear")},stopGridScroll=function(){$j(".stills_grid").stop()};$j("#stills_scroll_right").hover(moveGridRight,stopGridScroll),$j("#stills_scroll_left").hover(moveGridLeft,stopGridScroll),$j("#stills_mixitup").mixItUp();var filterButton=$j(".mobile_stills_filter_header button"),filterTitle=$j(".mobile_filter_title"),filterDrawer=$j(".mobile_stills_filter .mixitup_filters"),filterItem=$j(".mobile_stills_filter li");filterButton.on("click",function(){filterDrawer.hasClass("open")?filterDrawer.removeClass("open"):filterDrawer.addClass("open")}),filterItem.on("click",function(){var t=$j(this).attr("data-filter");t="all"!==t?$j(this).attr("data-filter").slice(1):$j(this).attr("data-filter"),filterTitle.text(t),filterDrawer.removeClass("open")});var updateLightboxInfo=function(t){var e=$j('.image_container[data-image="'+t+'"]'),i=e.attr("data-name"),o=e.attr("data-location");$j("#lightbox_image_name").text(i),i&&o?$j("#lightbox_image_location").text("// "+o):$j("#lightbox_image_location").text(o)},visibleImages=[];mq.matches&&$j(".image_container").click(function(){var t=$j(this).attr("data-image");$j(this).attr("data-name"),$j(this).attr("data-location");$j(".lightbox_image").attr("src",t),updateLightboxInfo(t),$j(".stills_lightbox").fadeIn(500),visibleImages=[],$j(".image_container").each(function(){var t=$j(this).attr("data-image");$j(this)[0].hasAttribute("style")&&visibleImages.push(t)})});var crossFadeInProgress=!1,crossFade=function(t){crossFadeInProgress=!0,$j(".lightbox_image_container").prepend('<img class="lightbox_image incoming_image" src="'+t+'" />'),$j(".lightbox_image_container .lightbox_image:first-of-type").fadeTo(800,1),$j(".lightbox_image_container .lightbox_image:last-of-type").fadeTo(800,0,function(){$j(".lightbox_image_container .lightbox_image:last-of-type").remove(),$j(".lightbox_image_container .lightbox_image.incoming_image").removeClass("incoming_image"),crossFadeInProgress=!1})};$j(".lightbox_next").click(function(){var t=$j(".lightbox_image").attr("src"),e=visibleImages.indexOf(t),i=e+1,o=e+1===visibleImages.length?visibleImages[0]:visibleImages[i];crossFadeInProgress||(crossFade(o),updateLightboxInfo(o))}),$j(".lightbox_prev").click(function(){var t=$j(".lightbox_image").attr("src"),e=visibleImages.indexOf(t),i=e-1,o=visibleImages.length-1,a=0===e?visibleImages[o]:visibleImages[i];crossFadeInProgress||(crossFade(a),updateLightboxInfo(a))}),$j(".lightbox_exit, .lightbox_exit_container").click(function(){$j(".stills_lightbox").fadeOut(500,function(){$j(".lightbox_next").fadeIn(),$j(".lightbox_prev").fadeIn()})});