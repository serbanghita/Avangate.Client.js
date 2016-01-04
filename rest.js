/*jshint noempty:true, noarg:true, eqeqeq:true, devel:true, browser:true, bitwise:true, curly:true, undef:true, nonew:true, forin:true */

/**
 * 
 * ApiClient
 * 
 */
var ApiClient = function(uri, vendorCode, vendorPassword) {
  // Assign the current form reference.
  if (!uri || !vendorCode || !vendorPassword) {
      throw 'Missing init arguments.';
  }

  function prepareAuthHeader() {
    var currentDateIsoString = new Date().toISOString();
    var currentDateString = currentDateIsoString.match(/[0-9]+-[0-9]+-[0-9]+/) +' '+ currentDateIsoString.match(/[0-9]+:[0-9]+:[0-9]+/);
    var hash = CryptoJS.HmacMD5(
        vendorCode.length + vendorCode + currentDateString.length + currentDateString,
        vendorPassword
    );

    return 'code="'+ vendorCode +'" date="'+ currentDateString +'" hash="'+ hash +'"';
  }

  function request(method, url, requestBody) {
    return new Promise(function(resolve, reject) {
      var xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : null;
      xhr.open(method, uri + url, true);
      xhr.setRequestHeader('X-Avangate-Authentication', prepareAuthHeader());
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');
      //if (requestBody) {
      //xhr.setRequestHeader('Content-length', requestBody.length);
      //}
      // xhr.setRequestHeader('Connection', 'close');

      xhr.onload = function() {
        if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
          resolve(prepareResponseBody(xhr.response));
        } else {
          reject(Error(xhr.statusText));
        }
      };
      if (requestBody) {
        //console.log(requestBody);
        //console.log(prepareRequestBody(requestBody));
        xhr.send(prepareRequestBody(requestBody));
      } else {
        xhr.send();
      }
    });
  }

  function prepareRequestBody(requestBody) {
    return JSON.stringify(requestBody);
  }
  
  function prepareResponseBody(responseBody) {
    return JSON.parse(responseBody);
  }
  
  function getUri() {
    return uri;
  }
  
  function getVendorCode() {
    return vendorCode;
  }
  
  return {
    request: request,
    getUri: getUri,
    getVendorCode: getVendorCode
  };
};


/**
 * 
 * ShoppingCart
 *
 */
var ShoppingCart = function(apiClient) {
  this.apiClient = apiClient;
  
  this.controllers.init(this);
  this.models.init(this);
  this.views.init(this);
};

ShoppingCart.prototype.controllers = {
  init: function(parent) {
    this.parent = parent;
  },
  getProduct: function(productCode) {
    return this.parent.apiClient.request('GET', '/products/'+ productCode +'/');
  },
  updateOrder: function(orderData) {
    return this.parent.apiClient.request('PUT', '/orders/0/', orderData);
  },
  placeOrder: function(orderData) {
    return this.parent.apiClient.request('POST', '/orders/', orderData);
  }
};

ShoppingCart.prototype.models = {
  init: function(parent) {
    this.parent = parent;
  },
  Product: function(productData) {
    function getCode() {
      return productData.ProductCode;
    }
  
    function getName() {
      return productData.ProductName;
    }
  
    function getShortDescription() {
      return productData.ShortDescription;
    }
  
    function getDefaultImageURL() {
      for (var i in productData.ProductImages) {
        if (productData.ProductImages[i].Default) {
          return productData.ProductImages[i].URL;
        }
      }
      return null;
    }
    
    return {
      getCode: getCode,
      getName: getName,
      getShortDescription: getShortDescription,
      getDefaultImageURL: getDefaultImageURL
    };
  }
};

ShoppingCart.prototype.views = {
  init: function(parent) {
    this.parent = parent;
  },
  /**
   *
   * @param product ShoppingCart.models.Product
   */
  renderProduct: function(product) {
    var $product = document.createElement('div');
    var $productCode = document.createElement('div');
    $productCode.innerHTML = product.getCode();
    var $productName = document.createElement('div');
    $productName.innerHTML = product.getName();
    var $productShortDescription = document.createElement('div');
    $productShortDescription.innerHTML = product.getShortDescription();
    var $productImage = document.createElement('img');
    $productImage.src = product.getDefaultImageURL();
  
    $product.appendChild($productCode)
        .appendChild($productName)
        .appendChild($productShortDescription)
        .appendChild($productImage);
  
    document.body.appendChild($product);
  }
};


/**
 *
 * Demo.
 *
 */

var orderDataMock = {
  'Currency': 'usd',
  'Language': 'en',
  'Country': 'us',
  'CustomerIP': '91.220.121.21',
  'Source': 'serban.ghita.org',
  'ExternalReference': 'REST_API_AVANGTE',
  'Items': [
    {
      'Code': 'TS_Album_2013',
      'Quantity': '1'
    }
  ],
  'BillingDetails': {
    'Address': 'Test Address',
    'City': 'LA',
    'State': 'CA',
    'CountryCode': 'US',
    'Email': 'sg@avangate.com',
    'FirstName': 'Serban',
    'LastName': 'Test',
    'PostalCode': '12345'
  },
  'PaymentDetails': {
    'Type': 'CC',
    'Currency': 'USD',
    'CustomerIP': '91.220.121.21',
    'PaymentMethod': {
      'CardNumber': '4111111111111111',
      'CardType': 'VISA',
      'ExpirationYear': '2017',
      'ExpirationMonth': '12',
      'CCID': '123',
      'HolderName': 'John',
      'RecurringEnabled': 'True',
      'HolderNameTime': '12',
      'CardNumberTime': '12'
    }
  }
};

var s = new ShoppingCart(
    new ApiClient('https://api.avangate.com/rest/3.0', 'SERBANGH', '******')
);

s.controllers.getProduct('TS_Album_2013').then(
    function(productData) {
      console.log('Get product:', productData);
      s.views.renderProduct(new s.models.Product(productData));
      s.controllers.updateOrder(orderDataMock).then(
          function(response){
            console.log('Update order:', response);
            s.controllers.placeOrder(orderDataMock).then(function(response){
              console.log('Place order:', response);
            });
          },
          function(error) {
            console.log(error);
          });
    },
    function(error) {
      console.log(error);
    });