var Order = function Order(orderData) {
  function asJSON() {
    return orderData;
  }
  
  return {
    asJSON: asJSON
  };
};