(function() {
    'use strict';

    function createCORSRequest(method, url) {
        var request = new XMLHttpRequest();
        if ("withCredentials" in request) {
            request.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            request = new XDomainRequest();
            request.open(method, url);
        } else if (window.ActiveXObject) {
            request = new ActiveXObject('Microsoft.XMLHTTP');
            request.open(method, url);
        } else {
            request = null;
        }

        return request;
    }

    function loadXMLDoc(referenceNode, memberSlug, host, program) {
        'use strict';
        var v = 2016061301;

        var request = createCORSRequest('GET', host + '/widgets/ux-daily?' + program + '=' + memberSlug + '&v=' + v + '&domain=' + document.domain);
        if (request) {
            request.onload = function() {
                if (request.status == 200) {
                    var iframe = document.createElement('iframe');

                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('width', '300px');
                    iframe.setAttribute('name', 'idf_ux_daily_widget');
                    iframe.setAttribute('scrolling', 'no');
                    iframe.setAttribute('allowfullscreen', 'true');
                    iframe.style.cssText = "position:static;visibility: visible; display: inline-block; padding: 0px; border: none; max-width: 100%; min-width: 300px; margin-top: 0px; margin-bottom: 0px; min-height: 500px;";

                    referenceNode.parentNode.insertBefore(iframe, referenceNode.nextSibling);
                    var doc = iframe.contentWindow.document;
                    doc.open().write(request.responseText);
                    doc.close();
                    setTimeout(function() {
                        iframe.height = Math.max(
                                Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
                                Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
                                Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)) + 'px';
                        iframe.style.cssText += 'height:' + iframe.height + ';';
                    }, 100);
                }
                else {
                    console.warn('IDF UX widget: error status: ' + request.status, request);
                }
                referenceNode.style.display = 'none';
            };

            request.send();
        }
    }

    var referenceNode = document.getElementById('idf-ux-daily-widget-link');
    loadXMLDoc(referenceNode, referenceNode.dataset.memberSlug, referenceNode.dataset.widgetDatasource, referenceNode.dataset.program);
})();
