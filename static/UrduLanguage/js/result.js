let texts = [];
let finalText = [];
var xhr = null;

function onUnload() {
    if (xhr) xhr.abort();
    return "some message";
}
$(document).ready(function() {
    console.log("Result JS is ready");
    window.onbeforeunload = onUnload;
    initMyIframe();
});

function initMyIframe() {
    onUnload();
    texts = [];
    finalText = [];
    setTimeout(function() {
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
                    "<style type='text/css'> .goog-te-banner{ display:none!important; } #google_translate_element { display:none!important; }  #goog-gt-tt { display:none!important; }  </style>"
                )
            );
        setTimeout(function() {
            traverseHtml();
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
            $("#myIFrame")
                .contents()
                .find("a")
                .click(function() {
                    console.log("Click Captured on all Anchor tags");
                    $("#wrapper").fadeIn(300);
                    initMyIframe();
                });
            setTimeout(function() {
                $("#wrapper").fadeOut(1000);
            }, 4000);
        }, 4000);
    }, 2000);
}

function traverseHtml() {
    console.log("Traverse HTML Called");
    const contents = $("#myIFrame").contents();
    // Getting All Paragraphs Text
    const iFrameParagraphs = contents.find("p");
    iFrameParagraphs.each(function() {
        const text = $(this).text().trim();
        if (text.length > 15) {
            console.log("Paragraph Text is: ", text);
            let str = text;
            str = str.replace(/\s+/g, "").toLowerCase();
            texts[str] = text;
        }
    });
    // Getting All Heading 1 Text
    const iFrameH1 = contents.find("h1");
    iFrameH1.each(function() {
        const text = $(this).text().trim();
        if (text.length > 15) {
            console.log("Heading 1 Text is: ", text);
            let str = text;
            str = str.replace(/\s+/g, "").toLowerCase();
            texts[str] = text;
        }
    });
    // Getting All Heading 2 Text
    const iFrameH2 = contents.find("h2");
    iFrameH2.each(function() {
        const text = $(this).text().trim();
        if (text.length > 15) {
            console.log("Heading 2 Text is: ", text);
            let str = text;
            str = str.replace(/\s+/g, "").toLowerCase();
            texts[str] = text;
        }
    });
    // Getting All Heading 3 Text
    const iFrameH3 = contents.find("h3");
    iFrameH3.each(function() {
        const text = $(this).text().trim();
        if (text.length > 15) {
            console.log("Heading 3 Text is: ", text);
            let str = text;
            str = str.replace(/\s+/g, "").toLowerCase();
            texts[str] = text;
        }
    });
    // Getting All Heading 4 Text
    const iFrameH4 = contents.find("h4");
    iFrameH4.each(function() {
        const text = $(this).text().trim();
        if (text.length > 15) {
            console.log("Heading 4 Text is: ", text);
            let str = text;
            str = str.replace(/\s+/g, "").toLowerCase();
            texts[str] = text;
        }
    });
    // Getting All Heading 5 Text
    const iFrameH5 = contents.find("h5");
    iFrameH5.each(function() {
        const text = $(this).text().trim();
        if (text.length > 15) {
            console.log("Heading 5 Text is: ", text);
            let str = text;
            str = str.replace(/\s+/g, "").toLowerCase();
            texts[str] = text;
        }
    });
    // Getting All Font Text
    const iFrameFont = contents.find("font");
    iFrameFont.each(function() {
        const text = $(this).text().trim();
        if (text.length > 15) {
            console.log("Font Text is: ", text);
            let str = text;
            str = str.replace(/\s+/g, "").toLowerCase();
            texts[str] = text;
        }
    });
    // Getting All Span Text
    const iFrameSpan = contents.find("span");
    iFrameSpan.each(function() {
        const text = $(this).text().trim();
        if (text.length > 15) {
            console.log("Span Text is: ", text);
            let str = text;
            str = str.replace(/\s+/g, "").toLowerCase();
            texts[str] = text;
        }
    });
    // Getting All Div Text
    const iFrameDiv = contents.find("div");
    iFrameDiv.each(function() {
        const text = $(this).text().trim();
        if (
            text.length > 15 &&
            !(
                text.includes("div") ||
                text.includes("img") ||
                text.includes("p") ||
                text.includes("h1") ||
                text.includes("style") ||
                text.includes("script")
            )
        ) {
            let str = text;
            str = str.replace(/\s+/g, " ");
            console.log("Div Str is: ", str);
            let str1 = text;
            str1 = str1.replace(/\s+/g, "").toLowerCase();
            texts[str1] = str;
        }
    });

    console.log("Texts Array is: ", texts);

    for (var key in texts) {
        if (texts.hasOwnProperty(key)) {
            finalText.push(texts[key]);
        }
    }
    setTimeout(() => {
        convertSnippetToSpeech(0);
    }, 3000);

    // for (let i = 0; i < iFrameParagraphs.length; i++) {
    //     console.log("Current Paragraph is: ", iFrameParagraphs[i]);
    //     console.log("Current Paragraph is: ", iFrameParagraphs[i]);
    // }
    // const iframeChildren = $("#myIFrame").contents().find("body")[0].children;
    // // console.log("iFrame Body: ", iframeBody);
    // console.log("iFrame Body Children: ", iframeChildren.length);
    // for (let i = 0; i < iframeChildren.length; i++) {
    //     const levelOneChild = iframeChildren[i].children;
    //     console.log("Level one child, children count is: ", levelOneChild.length);
    //     if (levelOneChild.length > 0) {
    //         traverseChildren(levelOneChild);
    //     }
    //     // console.log("Count is: ", i);
    //     // console.log("Child at index: ", iframeChildren[i]);
    // }
    // iframeChildren.forEach((child) => {
    //     console.log("Child: ", child);
    // });

    // console.log("iFrame Body: ", iframeBody[0].prevObject);
    // console.log("iFrame Body: ", iframeBody.prevObject);

    // console.log("Convert Title to Speech p Tags is: ", pTags);
    // pTags.forEach((p) => {
    //     console.log("Single p Tag is: ", p);
    //     console.log("Single p Tag Text is: ", p.text());
    // });
    // let title = $("#title").text();
    // jQuery.ajax({
    //     type: "get",
    //     url: `/textToSpeech?text=${title}`,
    //     success: function(data) {
    //         setTimeout(function() {
    //             convertSnippetToSpeech();
    //         }, 3000);
    //     },
    //     error: function(err) {
    //         console.log("Error: ", err);
    //         convertSnippetToSpeech();
    //     },
    // });
}

// function traverseChildren(children) {
//     console.log("Traverse Children Called: ", children);
//     for (let i = 0; i < children.length; i++) {
//         const levelTwoChild = children[i].children;
//         const levelTwoHtml = children[i].html();
//         console.log(
//             "Traverse Children Called, Level Children are: ",
//             levelTwoChild
//         );
//         console.log("Traverse Children Called, Level HTML are: ", levelTwoHtml);
//     }
// }

function convertSnippetToSpeech(index) {
    if (index >= finalText.length) {
        return;
    }

    xhr = jQuery.ajax({
        type: "get",
        url: `/textToSpeech?text=${finalText[index]}`,
        success: function(data) {
            setTimeout(() => {
                convertSnippetToSpeech(index + 1);
            }, 10000);
        },
        error: function(err) {
            console.log("Error: ", err);
        },
    });
}

function initTranslator() {
    $.when(
        new google.translate.TranslateElement({
                pageLanguage: "en",
                includedLanguages: "ur",
                layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,
            },
            "google_translate_element"
        )
    ).done(function() {
        setTimeout(function() {
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
        select.addEventListener("click", function() {
            select.dispatchEvent(new Event("change"));
        });
        setTimeout(function() {
            select.click();
            select.click();
        }, 1000);
    });
}