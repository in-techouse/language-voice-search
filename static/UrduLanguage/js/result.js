$(document).ready(function () {
  console.log("Result JS is ready");
  initMyIframe();
});

function initMyIframe() {
  setTimeout(function () {
    const iFrameBody = $("#myIFrame").contents().find("body");
    const iFrameHead = $("#myIFrame").contents().find("head")[0];

    iFrameBody.append(
      `<div id="google_translate_element" style="display: none;"></div>`
    );

    var libraryJQuery = document.createElement("script");
    libraryJQuery.type = "text/javascript";
    libraryJQuery.src = "https://code.jquery.com/jquery-3.5.1.js";
    iFrameHead.append(libraryJQuery);

    var library = document.createElement("script");
    library.type = "text/javascript";
    library.src = "http://translate.google.com/translate_a/element.js";
    iFrameHead.append(library);

    $("#myIFrame")
      .contents()
      .find("head")
      .append(
        $(
          "<style type='text/css'> #google_translate_element { display:none!important; }  #goog-gt-tt { display:none!important; }  </style>"
        )
      );
    setTimeout(function () {
      const scriptCode = document.createElement("script");
      scriptCode.type = "text/javascript";
      scriptCode.text = `
        $.when(
          new google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "ur",
              layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,
            },
            "google_translate_element"
          )
        ).done(function () {
          setTimeout(function () {
            const googleFrame = $(".goog-te-banner-frame").contents();            
            googleFrame.find("a").css("display", "none");
            googleFrame.find("img").css("display", "none");
            googleFrame.find(".goog-te-banner-content").css("display", "none");
            googleFrame.find("#options").css("display", "none");
            const googleTranslateDiv = googleFrame.find(".goog-te-button");
            googleTranslateDiv.css("background-color", "red");
            googleTranslateDiv.css("position", "absolute");
            googleTranslateDiv.css("top", "0");
            googleTranslateDiv.css("left", "0");
            googleTranslateDiv.css("right", "0");
            googleTranslateDiv.css("width", "100%");
            const googleTranslateButton = googleFrame.find(
              ".goog-te-button div button"
            );
            googleTranslateButton.css("background-color", "#f5548e");
            googleTranslateButton.css("color", "#FFFFFF");
            googleTranslateButton.css("font-weight", "800");
            googleTranslateButton.css("border-color", "#f5548e");
            googleTranslateButton.css("padding-top", "7px");
            googleTranslateButton.css("padding-bottom", "7px");
            googleTranslateButton.css("width", "100%");
            googleTranslateButton.css("height", "40px");
            $(".skiptranslate").show(500);
          }, 3000);
          var select = document.getElementsByClassName("goog-te-combo")[0];
          select.selectedIndex = 1;
          select.addEventListener("click", function () {
            select.dispatchEvent(new Event("change"));
          });
          setTimeout(function () {
            select.click();
            select.click();
          }, 1000);
        });
      `;
      iFrameHead.append(scriptCode);
      $("#myIFrame").contents().find("#goog-gt-tt").css("display", "none");
      setTimeout(function () {
        $("#wrapper").fadeOut(1000);
        convertTitleToSpeech();
      }, 4000);
    }, 4000);
  }, 2000);
}

function convertTitleToSpeech() {
  let title = $("#title").text();
  jQuery.ajax({
    type: "get",
    url: `/textToSpeech?text=${title}`,
    success: function (data) {
      setTimeout(function () {
        convertSnippetToSpeech();
      }, 3000);
    },
    error: function (err) {
      console.log("Error: ", err);
      convertSnippetToSpeech();
    },
  });
}

function convertSnippetToSpeech() {
  let snippet = $("#snippet").text();
  jQuery.ajax({
    type: "get",
    url: `/textToSpeech?text=${snippet}`,
    success: function (data) {},
    error: function (err) {
      console.log("Error: ", err);
    },
  });
}

function initTranslator() {
  $.when(
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "ur",
        layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    )
  ).done(function () {
    setTimeout(function () {
      const googleFrame = $(".goog-te-banner-frame").contents();
      googleFrame.css("display", "none");
      // googleFrame.find("a").css("display", "none");
      // googleFrame.find("img").css("display", "none");
      // googleFrame.find(".goog-te-banner-content").css("display", "none");
      // googleFrame.find("#options").css("display", "none");
      // googleFrame.find(".goog-te-button").css("display", "none");

      // const googleTranslateDiv = googleFrame.find(".goog-te-button");
      // googleTranslateDiv.css("background-color", "red");
      // googleTranslateDiv.css("position", "absolute");
      // googleTranslateDiv.css("top", "0");
      // googleTranslateDiv.css("left", "0");
      // googleTranslateDiv.css("right", "0");
      // googleTranslateDiv.css("width", "100%");
      // const googleTranslateButton = googleFrame.find(
      //   ".goog-te-button div button"
      // );
      // googleTranslateButton.css("background-color", "#f5548e");
      // googleTranslateButton.css("color", "#FFFFFF");
      // googleTranslateButton.css("font-weight", "800");
      // googleTranslateButton.css("border-color", "#f5548e");
      // googleTranslateButton.css("padding-top", "7px");
      // googleTranslateButton.css("padding-bottom", "7px");
      // googleTranslateButton.css("width", "100%");
      // googleTranslateButton.css("height", "40px");
      // $(".skiptranslate").show(500);
    }, 3000);
    var select = document.getElementsByClassName("goog-te-combo")[0];
    select.selectedIndex = 1;
    select.addEventListener("click", function () {
      select.dispatchEvent(new Event("change"));
    });
    setTimeout(function () {
      select.click();
      select.click();
    }, 1000);
  });
}
