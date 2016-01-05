var Config = function Config(options) {
  this.settings = {
    vendorCode: null,
    vendorSecret: null,
    orderUri: 'https://api.avangate.com/rest/3.0',
    productUri: 'https://api.avangate.com/rest/3.0'
  };
  
  extend(this.settings, options);
};

Config.prototype.getVendorCode = function() {
  return this.settings.vendorCode;
};

Config.prototype.getVendorSecret = function() {
  return this.settings.vendorSecret;
};

Config.prototype.getOrderUri = function() {
  return this.settings.orderUri;
};

Config.prototype.getProductUri = function() {
  return this.settings.productUri;
};