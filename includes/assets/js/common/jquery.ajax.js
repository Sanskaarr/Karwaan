/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global commonfunctions */

const jsonHeader = {
    prefix: '/iconicusoffice',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Ico-Requested': 'true'
    }
};
const htmlHeader = {
    prefix: '/iconicusoffice',
    headers: {
        'Accept': 'text/html',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Ico-Requested': 'true'
    }

};
var jQueryAjax = {

    create(method, url, data, dataType, contentType = false, headers = {}, is_Sync = false, encypt = {}) {
        var t = {};
        t.headers = headers;
        t.method = method;
        t.url = url;
        t.dataType = dataType;
        t.processData = false;
        t.cache = false;
//        t.beforeSend = function () {
//            commonfunctions.blockUI('');
//        };
//        t.complete = function () {
//            commonfunctions.unblockUI('');
//        };

        if (data)
            t.data = data;
        t.contentType = contentType;
        if (is_Sync)
            t.async = !is_Sync;
        return $.ajax(t);
    },
    postFormWithFile(url, data, dataType, defaultcontentType = false, is_Sync = false, headers = jsonHeader.headers, encypt = 'multipart/form-data') {
        var response = this.create('POST', url, data, dataType, defaultcontentType, headers, is_Sync, encypt);
        if (response.status === 600)
        {
            window.location = window.location.href.replace("#", "");
        } else {
            return response;
    }
    },
    get: function (url, dataType, data = void 0, defaultcontentType = false, is_Sync = false, headers = jsonHeader.headers, ) {
        var response = this.create('GET', url, data, dataType, defaultcontentType, headers, is_Sync, void 0);
        if (response.status === 600)
        {
            window.location = window.location.href.replace("#", "");
        } else {
            return response;
    }
    },
    post: function (url, data, dataType, defaultcontentType = false, is_Sync = false, headers = jsonHeader.headers, ) {
        var response = this.create('POST', url, data, dataType, defaultcontentType, headers, is_Sync, void 0);
        if (response.status === 600)
        {
            window.location = window.location.href.replace("#", "");
        } else {
            return response;
    }
    },
    delete: function (url, data = void 0, dataType, defaultcontentType = true, is_Sync = false, headers = jsonHeader.headers, ) {
        var response = this.create('DELETE', url, data, dataType, defaultcontentType, headers, is_Sync, void 0);
        if (response.status === 600)
        {
            window.location = window.location.href.replace("#", "");
        } else {
            return response;
    }
    }
};