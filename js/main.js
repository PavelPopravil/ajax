!function () {
    'use strict';

    function initAjax(item) {
        $.ajax({
            methgod: 'GET',
            dataType: 'json',
            url: $(item).data('json'),
            crossDomain: true
        })
        .success(function (data) {
            console.log(data);
        });
    }

    function setClickHandlers(item) {
        item.on('click.linkTabs', function (e) {
            e.preventDefault();
            initAjax(this);
        });
    }

    function initApp() {
        var block = $('.link-tabs');
        if (!block.length) {
            return false;
        }
        var links = block.each(function (i, item) {
           setClickHandlers(item);
        });
    }

    $(function () {
       initApp();
    });
}();