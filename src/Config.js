var Config = function Config(options) {
  this.settings = {
    vendorCode: null,
    vendorSecret: null,
    orderUri: getCurrentUrl(),
    productUri: getCurrentUrl()
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