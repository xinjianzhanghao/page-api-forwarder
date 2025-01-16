export default {
    async fetch( request , env , ctx ) {
        /**
         * This function will parse the url
         * @param {boolean} bool_isHTTPS Does the api use https? Yes->true No->false
         * @param {string} str_apiHost The url.host of the api
         * @param {string} str_requestPath the path which the request is send to
         * @param {string} str_requestParams the request param part
         * @returns {string} The url api request should send to
         */
        
        function parseUrl(bool_isHTTPS , str_apiHost , str_requestPath , str_requestParams , str_apiBasePath) {
            let str_url = '';
            if (bool_isHTTPS) {
                str_url += 'HTTPS://';
            } else {
                str_url += 'HTTP://';
            }
            str_url += str_apiHost;
            str_url += str_apiBasePath;
            if (str_url.endsWith('/')) {
                str_url = str_url.substring(0 , str_url.length-1);
            }
            if (!(str_requestPath.startsWith('/'))) {
                str_url +='/';
            }
            str_url += str_requestPath;
            str_url += str_requestParams;
            return str_url;
        }
        
        /**
         * This function will make neccesary modification to the headers.
         * @param {headers} headers_requestHeaders The original request header
         * @param {string} str_apiHost The host of the api
         * @param {string} str_apiProtocol http or https of the api, not the request. not case sensitive.
         * @returns {headers} The modified request headers
         */
        function parseHeader(headers_requestHeaders , str_apiHost , str_apiProtocol) {
            let headers = new Headers(headers_requestHeaders)
            for (const [key , value] of headers) {
                if (key === "cf-connecting-ip" || key === "cf-ipcountry" || key === "cf-ray"||key === "cf-visitor" || key ==="x-real-ip" || key === "x-forwarded-proto") {
                    headers.delete(key);
                    continue;
                }
                if (key.toLowerCase() === "host" || key.toLowerCase() === ":authority") {
                    headers.set(key , str_apiHost);
                    continue;
                }
                if (key === ":scheme") {
                    headers.set(key , str_apiProtocol);
                }
            }
            return headers;
        }
        const url_requestUrl = new URL(request.url);
        const headers_requestHeaders = new Headers(request.headers);
        const unknown_body = request.body;
        if (!(env.APIHOST.match(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+(\/[a-zA-Z0-9-.,@?^=%&:/~+#]*)?$/))) {
            //invalid configuration
            return new Response('invalid configuration' , {
                status: 500,
            })
        }
        const url_APIHOST = new URL(env.APIHOST);
        const str_requestPath = url_requestUrl.pathname;
        const str_apiHost = url_APIHOST.host;
        const str_requestParams = url_requestUrl.search;
        const str_apiBasePath = url_APIHOST.pathname;
        let bool_isHTTPS = false;
        if (env.PROTOCOL.toUpperCase() === 'HTTP' || env.PROTOCOL.toUpperCase() === 'HTTPS') {
            if (env.PROTOCOL.toUpperCase() === 'HTTPS') {
                bool_isHTTPS = true;
            } else {
                bool_isHTTPS = false;
            }
        } else if (url_APIHOST.protocol.toUpperCase() === 'HTTP:' || url_APIHOST.protocol.toUpperCase() === 'HTTPS:') {
            if (url_APIHOST.protocol.toUpperCase() === 'HTTPS:') {
                bool_isHTTPS = true;
            } else {
                bool_isHTTPS =false;
            }
        } else {
            bool_isHTTPS = false;
        }
        const url = parseUrl(bool_isHTTPS , str_apiHost , str_requestPath , str_requestParams , str_apiBasePath);
        const str_apiProtocol =  new URL(url).protocol.slice(0 , -1);
        const headers = parseHeader(headers_requestHeaders , str_apiHost , str_apiProtocol);
        console.log(url);
        const apiRequest = new Request(url,{
            method: request.method,
            headers: headers,
            body: unknown_body,
        });
        
        return await fetch(apiRequest);
    }
}