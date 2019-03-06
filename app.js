var topics = [
    'luke skywalker',
    'princess leia',
    'darth vader',
    'yoda',
    'obi-wan kenobi',
    'poe dameron',
    'han solo',
    'chewbacca',
    'r2d2',
    'c3po',
    'bb-8'
];

$.each(topics, function (index, value) {
    var newBtn = $('.buttonsGoHere').append(
        $('<button>').text(value)
    );
});

$('button').on('click', function () {
    var searchTerm = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            $('.gifsGoHere').empty();
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    gifDiv.addClass('gifDiv');
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var image = $("<img>");
                    image.addClass("imgClick");
                    image.attr("src", results[i].images.fixed_width_still.url);
                    image.attr("data-still", results[i].images.fixed_width_still.url);
                    image.attr("data-animate", results[i].images.fixed_width.url);
                    image.attr("data-state", "still");

                    gifDiv.append(p);
                    gifDiv.append(image);

                    $(".gifsGoHere").prepend(gifDiv);
                }
            }

        });
});

$('.imgClick').on('click', function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

    console.log("Click");

});