var Order = {
  init: function(modelData) {
    this.model = modelData;
  },
  
  asJSON: function() {
    return this.model;
  },

  getCurrency: function() {
    return this.model.Currency;
  },

  getItems: function() {
    return this.model.Items;
  },

  getItemByCode: function(code) {
    for (var i in this.getItems()) {
      if (!this.getItems().hasOwnProperty(i)) {
        continue;
      }
      if (this.getItems()[i].Code === code) {
        return this.getItems()[i];
      }
    }
    return null;
  },

  getBillingCountry: function() {
    return this.model.BillingDetails.Country;
  },

  getBillingState: function() {
    return this.model.BillingDetails.State;
  }
};