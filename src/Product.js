var Product = function Product(productData) {
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
  
  function render() {
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

  return {
    getCode: getCode,
    getName: getName,
    getShortDescription: getShortDescription,
    getDefaultImageURL: getDefaultImageURL,
    render: render
  };
};
