var OrderItem = {
  
  init: function(modelData) {
    this.model = modelData;
  },
  
  getCode: function() {
    return this.model.Code;
  },
  
  getQuantity: function() {
    return this.model.Quantity;
  }
  
};