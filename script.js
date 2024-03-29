var default_content = "";

$(document).ready(function () {

    checkURL();
    $('ul li a').click(function (e) {

        checkURL(this.hash);

    });

    //filling in the default content
    default_content = $('#pageContents').html();


    setInterval("checkURL()", 250);

});

var lasturl = "";

function checkURL(hash) {
    if (!hash) hash = window.location.hash;

    if (hash != lasturl) {
        lasturl = hash;

        // FIX - if we've used the history buttons to return to the homepage,
        // fill the pageContents with the default_content

        if (hash == "")
            $('#pageContents').html(default_content);

        else
            loadPage(hash);
    }
}


function loadPage(url) {
    url = url.replace('#', '');

    console.log(url);

    $('#loading').css('visibility', 'visible');

    $.ajax({
        type: "POST",
        url: "load_page.php",
        data: 'page=' + url,
        dataType: "html",
        success: function (msg) {

            if (parseInt(msg) != 0) {
                $('#pageContents').html(msg);
                $('#loading').css('visibility', 'hidden');
            }
        }

    });

}