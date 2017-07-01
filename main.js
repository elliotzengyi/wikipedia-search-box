$(document).ready(function() {

    function showJSON(json) {

        var list = json.query.search;
        var htmlval = "";
        var $items;

        if (list.length > 0) {

            for (var i in list) {

                htmlval = "<div class='grid-item col-md-4' id='list" + (i + 1) + "'><a href='https://en.wikipedia.org/wiki/" + list[i].title + "' target='_blank'><div class='panel panel-default'>";
                htmlval += "<div class='panel-heading'>" + list[i].title + "</div>";
                htmlval += "<div class='panel-body'" + list[i].snippet + "...</div>";
                htmlval += "</div></a></div>";

                $items = $(htmlval);

                $grid.append($items)
                    // add and lay out newly appended items
                    .masonry('appended', $items);
            }
        }
    }

    function searchWiki() {

        var searchVal = $("#searchTxtContent").val();

        if (searchVal) {

            $grid.masonry('remove', $(".grid-item")).masonry('layout');

            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchVal + "&utf8=&format=json&continue=",
                dataType: "jsonp",
                crossDomain: true,
                timeout: 15000,
                beforeSend: function(XMLHttpRequest) {
                    $(".loading").show();
                },
                success: function(data) {
                    $(".loading").hide();
                    showJSON(data);
                }
            });
        }
    }

    $("#searchBtn").click(function() {
        searchWiki();
    });

    $('#searchTxtContent').bind('keydown', function(event) {
        if (event.keyCode == "13") {
            searchWiki();
        }
    });




    var $grid = $('.grid').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.grid-item',
        // use element for option
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

});
