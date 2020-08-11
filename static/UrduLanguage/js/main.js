(function ($) {
  "use strict";
  //single listing
  var single_listing = $(".atbd_single_listing");
  var slWidth = single_listing.width();
  if (slWidth <= 300) {
    single_listing.addClass("rs_fix");
  }

  //mobile menu fix
  $(".menu-item.menu-item-has-children").on("click", function () {
    $(this).toggleClass("active");
  });

  var rtl = true; //direo_rtl.rtl === "true" ? true : false;
  // testimonial-carousel
  $(".testimonial-carousel").owlCarousel({
    items: 1,
    dots: false,
    rtl: rtl,
    nav: true,
    navText: [
      '<span class="i la la-long-arrow-left"></span>',
      '<span class="i la la-long-arrow-right"></span>',
    ],
  });

  $(".listing-carousel").owlCarousel({
    items: 5,
    rtl: rtl,
    nav: true,
    navText: [
      '<span class="la la-long-arrow-left"></span>',
      '<span class="la la-long-arrow-right"></span>',
    ],
    dots: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      575: {
        items: 2,
      },
      767: {
        items: 3,
      },
      991: {
        items: 4,
      },
      1191: {
        items: 5,
      },
    },
  });

  // logo carousel
  $(".logo-carousel").owlCarousel({
    items: 5,
    nav: false,
    dots: false,
    margin: 100,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      575: {
        items: 3,
      },
      767: {
        items: 3,
      },
      991: {
        items: 5,
      },
    },
  });

  //setting css bg image as inline in html
  $(".bg_image_holder").each(function () {
    var $this = $(this);
    var imgLink;
    if ($this.children().attr("data-lazy-src")) {
      imgLink = $this.children().attr("data-lazy-src");
    } else if ($this.children().attr("data-src")) {
      imgLink = $this.children().attr("data-src");
    } else {
      imgLink = $this.children().attr("src");
    }
    //console.log(imgLink);
    $this
      .css({
        "background-image": "url(" + imgLink + ")",
        opacity: "1",
      })
      .children()
      .attr("alt", imgLink);
  });

  /* FAQ Accordion */
  $("p.dac_body").hide();
  $(".dacc_single > h3 > a").on("click", function (e) {
    var $this = $(this);
    $this.parent().next().slideToggle();
    $this
      .parent()
      .parents(".dacc_single")
      .siblings(".dacc_single")
      .children("p.dac_body")
      .slideUp();
    $this.toggleClass("active");
    $this
      .parent()
      .parents(".dacc_single")
      .siblings(".dacc_single")
      .children("h3")
      .children("a")
      .removeClass("active");
    e.preventDefault();
  });

  /* offcanvas menu */
  var oc_menu = $(".offcanvas-menu__contents");
  $(".offcanvas-menu__user").on("click", function (e) {
    oc_menu.addClass("active");
    e.preventDefault();
  });
  $(".offcanvas-menu__close").on("click", function (e) {
    oc_menu.removeClass("active");
    e.preventDefault();
  });

  //Video Popup
  //   $(".video-iframe").magnificPopup({
  //     type: "iframe",
  //     iframe: {
  //       markup:
  //         '<div class="mfp-iframe-scaler">' +
  //         '<div class="mfp-close"></div>' +
  //         '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
  //         "</div>",
  //       patterns: {
  //         youtube: {
  //           index: "youtube.com/",
  //           id: function(url) {
  //             var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
  //             if (!m || !m[1]) return null;
  //             return m[1];
  //           },
  //           src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1"
  //         },
  //         vimeo: {
  //           index: "vimeo.com/",
  //           id: function(url) {
  //             var m = url.match(
  //               /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/
  //             );
  //             if (!m || !m[5]) return null;
  //             return m[5];
  //           },
  //           src: "//player.vimeo.com/video/%id%?autoplay=1"
  //         }
  //       },
  //       srcAction: "iframe_src"
  //     },
  //     mainClass: "mfp-fade"
  //   });

  //blog single page
  //Style for category, if assigned category is more than 4
  var cats = $(".post-meta li:nth-child(3) a");
  if (cats.length > 3) {
    $(".post-meta li:nth-child(3)").addClass("order-3");
  }

  //body class in `listing with map` page
  $("#listing-listings_with_map")
    .parent()
    .parents("body")
    .addClass("atbdp_listings_map_page");

  //all listing sort status
  if ($(".view-mode .action-btn")) {
    var CurrentUrl = document.URL;
    var CurrentUrlEnd = CurrentUrl.split("/").filter(Boolean).pop();
    $(".view-mode .action-btn").each(function () {
      var ThisUrl = $(this).attr("href");
      var ThisUrlEnd = ThisUrl.split("/").filter(Boolean).pop();
      if (ThisUrlEnd === CurrentUrlEnd) {
        $(this).addClass("active");
      }
    });
  }

  var acbtn = $(".view-mode .action-btn:first-child");
  if (acbtn.siblings().hasClass("active") === true) {
    acbtn.removeClass("active");
  }
  if ($(".view-mode .action-btn").hasClass("active") === true) {
    $(".view-mode .action-btn")
      .siblings()
      .removeClass("ab-grid ab-list ab-map");
  }

  $(".atbd_add_listing_wrapper label")
    .has("input")
    .append("<span class='cf-select'></span>");

  $("#signup_modal")
    .find(".container-fluid, .row, .col-md-8.offset-md-2")
    .removeClass();
  $("#signup_modal").find(".add_listing_title").remove();

  $(".recover-pass-form").hide();
  $(".recover-pass-link").on("click", function (e) {
    e.preventDefault();
    $(".recover-pass-form").slideToggle().show();
  });

  //woocommerce checkout confirm address fields collapse option
  $(".woocommerce-columns address").hide();
  $(".woocommerce-column .woocommerce-column__title").on("click", function () {
    $(this).toggleClass("active");
    $(this).next().slideToggle().show();
  });

  $("body").on("change", "#at_biz_dir-categories", function (e) {
    var clearInt = setInterval(function () {
      if ($(".atbdp-checkbox-list label .cf-select").length > 0) {
        clearInterval(clearInt);
      }
      $(".atbd_add_listing_wrapper label")
        .has("input")
        .append("<span class='cf-select'></span>");
    }, 100);
  });

  //fixing widgets select options long sentence
  var maxLength = 30;
  $(".widget select > option").text(function (i, text) {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + "...";
    }
  });

  //set widget social icon background from it's color property
  function rgb2hex(rgb) {
    rgb = rgb.match(
      /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
    return rgb && rgb.length === 4
      ? "#" +
          ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
      : "";
  }

  function hex2rgba(hex, opacity) {
    //extract the two hexadecimal digits for each color
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(hex);
    //convert them to decimal
    var r = parseInt(matches[1], 16);
    var g = parseInt(matches[2], 16);
    var b = parseInt(matches[3], 16);
    //create rgba string
    var rgba = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
    //return rgba color
    return rgba;
  }

  var s_icon = $(".social-list li span.instagram i");
  s_icon.each(function () {
    var si_color = $(this).css("color");
    var si_color_hex = rgb2hex(si_color);
    $(this).css("background", hex2rgba(si_color_hex, 0.1));
  });

  var ci_color = $(
    "#category-style-two #directorist.atbd_wrapper .atbd_all_categories .atbd_category_single figure figcaption .cat-box .icon span"
  );
  ci_color.each(function () {
    var ci_color_value = $(this).css("color");
    var ci_color_hex = rgb2hex(ci_color_value);
    $(this).parent(".icon").css("background", hex2rgba(ci_color_hex, 0.1));
  });

  var fi_color = $(".feature-box-wrapper li .icon span");
  fi_color.each(function () {
    var fi_color_value = $(this).css("color");
    var fi_color_hex = rgb2hex(fi_color_value);
    $(this).parent(".icon").css("background", hex2rgba(fi_color_hex, 0.1));
  });

  //remove image from category style two
  $("#category-style-two .atbd_category_single figure img").remove();

  //location list sub items expander style
  $(".expander").on("click", function () {
    var txt = $(this).text() === "+" ? "-" : "+";
    $(this).text(txt);
  });

  $(".atbd_more-filter-contents > div").wrapAll("<div></div>");

  /* * * * * * * * *
   * Dashboard
   * * * * * * * * */
  var urlHash = window.location.hash;
  if (urlHash) {
    if (urlHash === "#v-expired-tab" || urlHash === "#v-pending-tab") {
      $(".dashboard_listing").addClass("active");
      $(".sidebar-dropdown.active .sidebar-submenu").slideDown(200);
    } else if (urlHash === "#n-expired-tab" || urlHash === "#n-pending-tab") {
      $(".dashboard_need").addClass("active");
      $(".sidebar-dropdown.active .sidebar-submenu").slideDown(200);
    }
  }

  $(".sidebar-dropdown > a").on("click", function (e) {
    e.preventDefault();
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(200);
      $(this).parent().addClass("active");
    }
    $(
      ".sidebar-submenu #v-pills-active-tab, .sidebar-submenu #n-pills-active-tab"
    ).addClass("active");
  });

  //add class deshboard menu icon
  $("#close-sidebar").on("click", function () {
    $(".page-wrapper").removeClass("toggled");
    $("#show-sidebar").removeClass("active");
  });
  $("#show-sidebar").on("click", function (e) {
    e.preventDefault();
    $(".page-wrapper").toggleClass("toggled");
    $(this).toggleClass("active");
  });

  //add class dashboard toggles
  $("#menu-toggle").on("click", function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $(window).resize(function (e) {
    if ($(window).width() <= 1199) {
      $("#wrapper").removeClass("toggled");
    } else {
      $("#wrapper").addClass("toggled");
    }
  });

  //dashboard tab active
  $('#v-pills-tab a[data-toggle="pill"]').on("click", function () {
    $('#v-pills-tab a[data-toggle="pill"]').removeClass("active");
  });

  $(function () {
    var hash = window.location.hash;
    hash && $('ul#v-pills-tab a[href="' + hash + '"]').tab("show");
    $("ul#v-pills-tab a").on("click", function (e) {
      $(this).tab("show");
      var scrollmem = $("body").scrollTop();
      window.location.hash = this.hash;
    });
  });

  // Table Responsive
  //   $(".table").footable();

  //
  //User dashboard related scripts
  $("body").on("click", "#direo_remove_listing", function (e) {
    e.preventDefault();

    var $this = $(this);
    var id = $this.data("listing_id");
    var data = "listing_id=" + id;
    swal(
      {
        title: direo_localize_data.i18n_text.confirmation_text,
        text: direo_localize_data.i18n_text.ask_conf_sl_lnk_del_txt,
        type: "warning",
        cancelButtonText: direo_localize_data.i18n_text.cancel,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: direo_localize_data.i18n_text.confirm_delete,
        showLoaderOnConfirm: true,
        closeOnConfirm: true,
      },
      function (isConfirm) {
        if (isConfirm) {
          // user has confirmed, now remove the listing
          direo_ajax_handler($this, "remove_listing", data, function (
            response
          ) {
            $("body").append(response);
            if ("success" === response) {
              // show success message
              swal({
                title: direo_localize_data.i18n_text.delete,
                type: "success",
                timer: 200,
                showConfirmButton: false,
              });
              $(".listing_id_" + id).remove();
              $this.remove();
              // deduct 1 from count from sidebar
              var urlHash = window.location.hash;
              var val = $(
                'a.direo_dash_submenu[href="' + urlHash + '"] span.badge'
              ).text();
              $('a.direo_dash_submenu[href="' + urlHash + '"] span').text(
                val - 1
              );
            } else {
              // show error message
              swal({
                title: direo_localize_data.i18n_text.error,
                text: direo_localize_data.i18n_text.error_details,
                type: "error",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          });
        }
      }
    );
    // send an ajax request to the ajax-handler.php and then delete the review of the given id
  });

  //This function handles all ajax request
  function direo_ajax_handler(
    ElementToShowLoadingIconAfter,
    ActionName,
    arg,
    CallBackHandler
  ) {
    var data;
    if (ActionName) data = "action=" + ActionName;
    if (arg) data = arg + "&action=" + ActionName;
    if (arg && !ActionName) data = arg;
    //data = data ;

    var n = data.search(direo_localize_data.nonceName);
    if (n < 0) {
      data =
        data +
        "&" +
        direo_localize_data.nonceName +
        "=" +
        direo_localize_data.nonce;
    }

    jQuery.ajax({
      type: "post",
      url: direo_localize_data.ajaxurl,
      data: data,
      beforeSend: function () {
        jQuery("<span class='atbdp_ajax_loading'></span>").insertAfter(
          ElementToShowLoadingIconAfter
        );
      },
      success: function (data) {
        jQuery(".atbdp_ajax_loading").remove();
        CallBackHandler(data);
      },
    });
  }

  /// User Dashboard
  $("#user_profile_form").on("submit", function (e) {
    // submit the form to the ajax handler and then send a response from the database and then work accordingly and then after finishing the update profile then work on remove listing and also remove the review and rating form the custom table once the listing is deleted successfully.
    var $form = $(this);
    var $queryString = $form.serialize();
    direo_ajax_handler($form, "update_user_profile", $queryString, function (
      response
    ) {
      if (response.success) {
        $("#pro_notice").html(
          '<p style="padding: 22px;" class="alert-success">' +
            response.data +
            "</p>"
        );
      } else {
        $("#pro_notice").html(
          '<p style="padding: 22px;" class="alert-danger">' +
            response.data +
            "</p>"
        );
      }
    });

    // prevent the from submitting
    return false;
  });

  if ($.trim($(".atbd_generic_header_title").text()) === "") {
    $(".atbd_generic_header_title").remove();
  }

  // Set all variables to be used in scope
  var frame,
    imgContainer = $("#profile_pic_container"), // profile picture container id here
    addImgLink = imgContainer.find("#upload_pro_pic"),
    delImgLink = imgContainer.find("#remove_pro_pic"),
    imgIdInput = imgContainer.find("#pro_pic"),
    imgTag = imgContainer.find("#pro_img");

  // ADD IMAGE LINK
  addImgLink.on("click", function (event) {
    event.preventDefault();

    // If the media frame already exists, reopen it.
    if (frame) {
      frame.open();
      return;
    }

    // Create a new media frame
    /*@todo; make the static help text translatable later*/
    frame = wp.media({
      title: direo_localize_data.uploadTitle,
      button: {
        text: direo_localize_data.uploadBTN,
      },
      library: { type: "image" }, // only
      multiple: false, // Set to true to allow multiple files to be selected
    });

    // When an image is selected in the media frame...
    frame.on("select", function () {
      const selection = frame.state().get("selection").first().toJSON();
      if (selection.type === "image") {
        // we have got an image attachment so lets proceed.
        // target the input field and then assign the current id of the attachment to an array.
        imgTag.attr("src", selection.url); // set the preview image url
        imgIdInput.attr("value", selection.id); // set the value of input field
      }
    });

    // Finally, open the modal on click
    frame.open();
  });

  delImgLink.on("click", function (e) {
    e.preventDefault();
    // if no image exist then add placeholder and hide remove image button
    imgTag.attr(
      "src",
      direo_localize_data.public_class_path + "images/no-image.jpg"
    );
    imgIdInput.attr("value", ""); // set the value of input field
  });

  /* add to favorite and remove favorite */
  $(".atbdp_mark_as_fav").each(function () {
    $(this).on("click", function (event) {
      event.preventDefault();
      var data = {
        action: "direo_public_add_remove_favorites",
        post_id: $(this).data("listing_id"),
      };
      var fav_tooltip_success =
        "<span>" + direo_localize_data.i18n_text.added_favourite + "</span>";
      var fav_tooltip_warning =
        "<span>" + direo_localize_data.i18n_text.please_login + "</span>";
      $(".atbd_fav_tooltip").hide();
      $.post(direo_localize_data.ajaxurl, data, function (response) {
        var staElement = $("#atbdp-fav_" + data["post_id"]).selector;
        if (response === "login_required") {
          $(staElement)
            .children(".atbd_fav_tooltip")
            .append(fav_tooltip_warning);
          $(staElement).children(".atbd_fav_tooltip").fadeIn();
          setTimeout(function () {
            $(staElement)
              .children(".atbd_fav_tooltip")
              .children("span")
              .remove();
          }, 3000);
        } else if ("false" === response) {
          $(staElement).removeClass("atbdp_fav_isActive");
          $(".atbd_fav_tooltip span").remove();
          $(".listing-ID-" + data["post_id"]).fadeOut(500);
          var urlHash = window.location.hash;
          var val = $('a[href="' + urlHash + '"] span.badge').text();
          $('a[href="' + urlHash + '"] span.badge').text(val - 1);
        } else {
          if ($("#atbdp-fav_" + response).selector === staElement) {
            $(staElement).addClass("atbdp_fav_isActive");
            $(staElement)
              .children(".atbd_fav_tooltip")
              .append(fav_tooltip_success);
            $(staElement).children(".atbd_fav_tooltip").fadeIn();
            setTimeout(function () {
              $(staElement)
                .children(".atbd_fav_tooltip")
                .children("span")
                .remove();
            }, 3000);
          }
        }
      });
    });
  });

  //remove favorite
  //   $(".romove_saved_item .atbdp_mark_as_fav").on("click", function() {
  //     $(this)
  //       .parents()
  //       .parent("tr")
  //       .fadeOut();
  //   });
})(jQuery);
