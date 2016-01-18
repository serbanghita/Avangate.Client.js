  // Private stuff.
  function getCurrentUrl() {
    var url = window.location.href;
    if(url.substr(-1) === '/') {
      return url.substr(0, url.length - 1);
    }
    return url;
  }
  
  function extend(oldObj, newObj){
    var i;
    for(i in newObj){
      if(newObj.hasOwnProperty(i)){
        oldObj[i] = newObj[i];
      }
    }
    return oldObj;
  }
  
  function createFromPrototype(proto, initData) {
    function F() {};
    F.prototype = proto;
    var f = new F();
    f.init(initData);
    return f;
  }

  // Main class.
  var ShoppingCart = function(vendorCode, vendorSecret, orderData) {
    this.config = makeConfig({
      'vendorCode': vendorCode,
      'vendorSecret': vendorSecret
    });
    
    this.orderClient = makeHttpClient(
      this.config.getOrderUri(),
      this.config.getVendorCode(),
      this.config.getVendorSecret()
    );
    
    this.productClient = makeHttpClient(
      this.config.getProductUri(),
      this.config.getVendorCode(),
      this.config.getVendorSecret()
    );
    
    if (orderData) {
      this.order = this.makeOrder(orderData);
    }
  };
  
  function makeConfig(options) {
    return new Config(options);
  }
  
  function makeHttpClient(uri, vendorCode, vendorSecret) {
    return new ApiClient(uri, vendorCode, vendorSecret);
  }

  ShoppingCart.prototype.makeOrder = function(data) {
    return createFromPrototype(Order, data);
  };

  ShoppingCart.prototype.makeOrderItem = function(data) {
    return createFromPrototype(OrderItem, data);
  };

  ShoppingCart.prototype.makeProduct = function(data) {
    return createFromPrototype(Product, data);
  };

  ShoppingCart.prototype.makeProductPrice = function(data) {
    return createFromPrototype(ProductPrice, data);
  };
  
  ShoppingCart.prototype.getConfig = function() {
    return this.config;
  };
  
  ShoppingCart.prototype.setOrder = function(orderData) {
    this.order = this.makeOrder(orderData);
  };
  
  ShoppingCart.prototype.getOrder = function() {
    return this.order;
  };
    
  // Promises.
  ShoppingCart.prototype.fetchProduct = function(productCode) {
    return this.orderClient.request('GET', '/products/'+ productCode +'/');
  };

  ShoppingCart.prototype.fetchProductPrice = function(productCode) {
    var payLoad = {
      Item: {
        Code: productCode,
        Quantity: 1,
        PriceOptions: []
      },
      BillingDetails: {
        Country: this.getOrder().getBillingCountry(),
        State: this.getOrder().getBillingState()
      },
      Currency: this.getOrder().getCurrency(),
      CouponCode: null,
      PayType: null
    };
    return this.orderClient.request('PUT', '/orders/0/price/', payLoad);
  };
  
  ShoppingCart.prototype.updateOrder = function() {
    return this.orderClient.request('PUT', '/orders/0/', this.getOrder().asJSON());
  };

  ShoppingCart.prototype.placeOrder = function() {
    return this.orderClient.request('POST', '/orders/', this.getOrder().asJSON());
  };
  
  // @todo Enhance to return Response().
  ShoppingCart.prototype.handleError = function(error) {
    console.log(error);
  };
  