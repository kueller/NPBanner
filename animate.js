var BANNER_WIDTH = 1090;
var raw_text = "";

function calculate_width() {
    song_width = $("#song-text").width() 
    auth_width = $("#author-text").width()

    base_width = Math.max(song_width, auth_width);
    if (base_width >= BANNER_WIDTH) return 0;

    return BANNER_WIDTH - (base_width + 80);
}

function animate_banner() {
    offset = calculate_width();
    $("#banner-spread").css("left", "-" + offset.toString() + "px");

    $("#banner-start").animate({opacity: 1.0}, 700);
    $("#banner-spread").animate({width: BANNER_WIDTH + "px"}, 1800);
    setTimeout(function() {
        $("#song-text").animate({opacity: 1.0}, 600);
        $("#author-text").animate({opacity: 1.0}, 600);
    }, 1800);

    base_delay = 10 * 1000;

    setTimeout(function() {
        $("#song-text").animate({opacity: 0}, 600);
        $("#author-text").animate({opacity: 0}, 600);
    }, base_delay);

    setTimeout(function() {
        $("#banner-spread").animate({width: "0px"}, 1800);
    }, base_delay + 600);

    setTimeout(function() {
        $("#banner-start").animate({opacity: 0}, 700);
    }, base_delay + 600 + (1800 - 700));
}

function apply_text() {
    var tok = raw_text.split("::");
    if (tok.length < 2) return;

    var song_text = tok[0].trim();

    var authors = tok[1].split(",");
    if (authors.length == 0) return;

    var author_text = "Authored by: " + authors[0].trim();
    authors.shift();

    if (authors.length > 0) {
        for (var i = 0; i < authors.length; i++) {
            authors[i] = authors[i].trim();
        }

        var feat_text = authors.join(", ");
        author_text += " feat. " + feat_text;
    }

    $("#song-text").text(song_text);
    $("#author-text").text(author_text);

    animate_banner();
}

function read_file() {
    var request = new XMLHttpRequest({mozSystem: true});
    request.open('GET', 'current.txt', false);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status == 0) {
                raw_text = request.responseText;
                apply_text();
            }
        }
    }
    request.send(null);
}

function init() {
    $("#banner-start").css("opacity", 0);
    $("#banner-spread").css("width", "0px");
    $("#song-text").css("opacity", 0);
    $("#author-text").css("opacity", 0);

    read_file();
    setInterval(read_file, 3 * 60 * 1000);
}

$(document).ready(init);
