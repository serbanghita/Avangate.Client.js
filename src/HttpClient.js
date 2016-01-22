/**
 *
 * ApiClient
 *
 */
var HttpClient = function(uri, vendorCode, vendorPassword) {
    
  // Assign the current form reference.
  if (!uri || !vendorCode || !vendorPassword) {
    throw 'Missing init arguments.';
  }
  
  var _request;
  var _response;
  
  // Success.
  var HTTP_SUCCESS = 200;
  var HTTP_CREATED = 201;
  
  // Error.
  var HTTP_NOT_FOUND = 404;
  var HTTP_BAD_REQUEST = 400;

  /**
   * Utility
   */
  
  function fromStringToJSON(str) {
    return str ? JSON.parse(str) : {};
  }
  
  function fromJSONToString(jsonObj) {
    return JSON.stringify(jsonObj);
  }
  
  /**
   * Request
   * 
   * @param method
   * @param url
   * @param headers
   * @param body
   * @constructor
   */
  var Request = function(method, url, headers, body) {
    this.method = method;
    this.url = url;
    this.headers = headers || {};
    this.body = body;
  };
  
  Request.prototype.getMethod = function() {
    return this.method;
  };
  
  Request.prototype.getUrl = function() {
    return this.url;
  };
  
  Request.prototype.getHeaders = function() {
    return this.headers;
  };
  
  Request.prototype.getBody = function() {
    return this.body;
  };

  /**
   * Response
   * 
   * @param status
   * @param body
   * @constructor
   */
  var Response = function(status, body) {
    this.status = status;
    this.body = body;
  };
  
  Response.prototype.setStatus = function(status) {
    this.status = status;
  };
  
  Response.prototype.getStatus =  function() {
    return this.status;
  };
  
  Response.prototype.setBody = function(body) {
    this.body = body;
  };
  
  Response.prototype.getBody = function() {
    return this.body;
  };

  /**
   * 
   * Factory methods
   * 
   */
  function makeAuthHeader() {
    var currentDateIsoString = new Date().toISOString();
    var currentDateString = currentDateIsoString.match(/[0-9]+-[0-9]+-[0-9]+/) +' '+ currentDateIsoString.match(/[0-9]+:[0-9]+:[0-9]+/);
    var hash = CryptoJS.HmacMD5(
        vendorCode.length + vendorCode + currentDateString.length + currentDateString,
        vendorPassword
    );

    return 'code="'+ vendorCode +'" date="'+ currentDateString +'" hash="'+ hash +'"';
  }
  
  function makeRequest(method, url, headers, body) {
    url = uri + url;
    headers = headers || {
          'X-Avangate-Authentication': makeAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json'
    };
    return new Request(method, url, headers, body);
  }

  
  function doRequest(request) {
    
    return new Promise(function(resolve, reject) {
      var xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : null;
      
      xhr.open(request.getMethod(), request.getUrl(), true);
      
      (function(headers){
        for (var i in headers) {
          if (headers.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, headers[i]);
          }
        }
      })(request.getHeaders());
      
      xhr.onload = function() {
        
        if(xhr.readyState === 4) {
          if (xhr.status === HTTP_SUCCESS || xhr.status === HTTP_CREATED) {
            resolve(_response = new Response(xhr.status, fromStringToJSON(xhr.response)));
          }

          if (xhr.status === HTTP_BAD_REQUEST) {
            resolve(_response = new Response(xhr.status, fromStringToJSON(xhr.response)));
          } else {
            _response = new Response(xhr.status, fromStringToJSON(xhr.response));
            reject(new Error(xhr.statusText, xhr.status));
          }
        }
        
      };
      
      if (request.getBody()) {
        xhr.send(fromJSONToString(request.getBody()));
      } else {
        xhr.send();
      }
    });
    
  }
  
  function getRequest() {
    return _request;
  }
  
  function getResponse() {
    return _response;
  }

  return {
    request: function(method, url, body) {
      return doRequest(makeRequest(method, url, null, body));
    },
    getRequest: getRequest,
    getResponse: getResponse
  };
};
