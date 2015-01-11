'use strict';

var ApiMock = exports;

var commentsData = [
    {id: 1, author: 'Pete Hunt', text: '_One_ test comment'},
    {id: 2, author: 'Jordan Walke', text: '**Another** comment'},
    {id: 3, author: 'La Roux', text: 'One more `code` comment'}
];

ApiMock.get = function (url, success) {
    var data;
    if (url === 'comments') {
        data = commentsData;
    }
    setTimeout(function () {
        success(data);
    }, 100);
};

ApiMock.post = function (url, data, success) {
    var storage;
    if (url === 'comments') {
        storage = commentsData;
    }

    data.id = storage.length+1;
    storage.push(data);
    setTimeout(function () {
        success(storage);
    }, 100);
};
