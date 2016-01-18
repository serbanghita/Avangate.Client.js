// @see tests/mock/productPrice.json
var ProductPrice = {
  
  init: function(modelData) {
    this.model = modelData;
  },

  getCurrency: function() {
    return this.model.Currency;
  },

  getUnitNetPrice: function() {
    return this.model.UnitNetPrice;
  },

  getUnitGrossPrice: function() {
    return this.model.UnitGrossPrice;
  },

  getUnitVAT: function() {
    return this.model.UnitVAT;
  },

  getUnitDiscount: function() {
    return this.model.UnitDiscount;
  },

  getUnitNetDiscountedPrice: function() {
    return this.model.UnitNetDiscountedPrice;
  },

  getUnitGrossDiscountedPrice: function() {
    return this.model.UnitGrossDiscountedPrice;
  },

  getUnitAffiliateCommission: function() {
    return this.model.UnitAffiliateCommission;
  },

  getNetPrice: function() {
    return this.model.UnitAffiliateCommission;
  },

  getGrossPrice: function() {
    return this.model.GrossPrice;
  },

  getNetDiscountedPrice: function() {
    return this.model.NetDiscountedPrice;
  },

  getGrossDiscountedPrice: function() {
    return this.model.GrossDiscountedPrice;
  },

  getDiscount: function() {
    return this.model.Discount;
  },

  getVAT: function() {
    return this.model.VAT;
  },

  getAffiliateCommission: function() {
    return this.model.AffiliateCommission;
  }

};