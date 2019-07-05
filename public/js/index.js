$(() => {
    let bg = $("#bg");

    function resizeBackground() {
        bg.height($(window).height() + 60);
        bg.fadeIn();
    }

    $(window).resize(resizeBackground);
    resizeBackground();

    $("audio").audioPlayer();
});