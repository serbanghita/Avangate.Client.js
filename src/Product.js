// @see tests/mock/product.json
var Product = {
  
  init: function(modelData) {
    this.model = modelData;
  },

  asJSON: function() {
    return this.model;
  },

  getCode: function() {
    return this.model.ProductCode;
  },

  getName: function() {
    return this.model.ProductName;
  },

  getShortDescription: function() {
    return this.model.ShortDescription;
  },

  getDefaultImageURL: function() {
    for (var i in this.model.ProductImages) {
      if (this.model.ProductImages[i].Default) {
        return this.model.ProductImages[i].URL;
      }
    }
    return null;
  },
  
  render: function() {
    var $product = document.createElement('div');
    
    var $productCode = document.createElement('div');
    $productCode.innerHTML = this.getCode();
    
    var $productName = document.createElement('div');
    $productName.innerHTML = this.getName();
    
    var $productShortDescription = document.createElement('div');
    $productShortDescription.innerHTML = this.getShortDescription();
    
    var $productImage = document.createElement('img');
    $productImage.src = this.getDefaultImageURL();

    $product.appendChild($productCode)
        .appendChild($productName)
        .appendChild($productShortDescription)
        .appendChild($productImage);

    document.body.appendChild($product);
  }
};
