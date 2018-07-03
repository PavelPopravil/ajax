!function () {
    'use strict';

    var prodList = $('.prod-list');
    var prodListPrelodaer = prodList.find('.prod-list__preloader');
    var prodListInner = prodList.find('.prod-list__inner');

    function createDataItem(data) {
        var html = '';
        html += '<div class="prod-list__list">';
            data.items.forEach(function (item) {
                html += '<div class="prod-list__item">';
                            if (item.img !== undefined) {
                                html += '<div class="prod-list__item-left">' +
                                            '<img src="' + item.img + '">' +
                                        '</div>';
                            }
                             html += '<div class="prod-list__item-right">' +
                                '<h3 class="prod-list__item-name">' + item.name + '</h3>' +
                                '<div class="prod-list__item-article">' + item.article + '</div>';
                                if (item.descr !== undefined) {
                                    html += '<div class="prod-list__item-descr"><p>' + item.descr + '</p></div>'
                                }
                                html += '<div class="prod-list__item-cost">' +
                                            '<span class="cost">' + item.cost + '</span>' +
                                            '<span class="currency">' + item.currency + '</span>' +
                                        '</div>' +
                            '</div>' +
                        '</div>'
            });
        html += '<div>';
        return html;
    }

    function initAjax(item) {
        $.ajax({
            methgod: 'GET',
            dataType: 'json',
            url: $(item).data('json'),
            crossDomain: true,
            beforeSend: function () {
                prodListInner.empty();
                prodListPrelodaer.addClass('active');
            },
            success: function (data) {
                prodListInner.append(createDataItem(data));
            },
            error: function (error) {
                console.log(error);
            },
            complete: function () {
                prodListPrelodaer.removeClass('active');
            }
        });
    }

    function setActiveTab(item, links) {
        links.removeClass('active');
        $(item).addClass('active');
    }

    function setClickHandlers(item, links) {
        $(item).on('click.linkTabs', function (e) {
            e.preventDefault();
            setActiveTab(this, links);
            initAjax(this);
        });
    }

    function initApp() {
        var block = $('.link-tabs');
        if (!block.length) {
            return false;
        }
        var links = block.find('.link-tabs__link');
        links.each(function (i, item) {
           setClickHandlers(item, links);
        });
    }

    $(function () {
       initApp();
    });
}();