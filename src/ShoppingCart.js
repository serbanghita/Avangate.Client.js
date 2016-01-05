  // Private stuff.
  function extend(oldObj, newObj){
    var i;
    for(i in newObj){
      if(newObj.hasOwnProperty(i)){
        oldObj[i] = newObj[i];
      }
    }
    return oldObj;
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
      this.order = makeOrder(orderData);
    }
  };
  
  function makeConfig(options) {
    return new Config(options);
  }
  
  function makeHttpClient(uri, vendorCode, vendorSecret) {
    return new ApiClient(uri, vendorCode, vendorSecret);
  }

  function makeOrder(orderData) {
    return new Order(orderData);
  }
  
  function makeProduct(productData) {
    return new Product(productData);
  }
  
  ShoppingCart.prototype.getConfig = function() {
    return this.config;
  };
  
  ShoppingCart.prototype.setOrder = function(orderData) {
    this.order = makeOrder(orderData);
  };
  
  ShoppingCart.prototype.getOrder = function() {
    return this.order;
  };
    
  // Promises.
  ShoppingCart.prototype.fetchProduct = function(productCode) {
    return this.orderClient.request('GET', '/products/'+ productCode +'/');
  };
  
  ShoppingCart.prototype.updateOrder = function() {
    return this.orderClient.request('PUT', '/orders/0/', this.getOrder().asJSON());
  };

  ShoppingCart.prototype.placeOrder = function() {
    return this.orderClient.request('POST', '/orders/', this.getOrder().asJSON());
  };
  