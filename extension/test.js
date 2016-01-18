var sc = new ShoppingCart('SCSERBOE', 'm^+T_4%FExA*p@iuK#[N');
sc.setOrder({
  'Currency': 'USD',
  'Language': 'en',
  'Country': 'us',
  'CustomerIP': '91.220.121.21',
  'Source': 'serban.ghita.org',
  'ExternalReference': 'REST_API_AVANGTE',
  'Items': [
    {
      'Code': 'AS_Test',
      'Quantity': '1'
    }
  ],
  'BillingDetails': {
    'Address': 'Test Address',
    'City': 'LA',
    'State': 'CA',
    'CountryCode': 'US',
    'Email': 'sg@avangate.com',
    'FirstName': 'Serban',
    'LastName': 'Test',
    'PostalCode': '12345'
  },
  'PaymentDetails': {
    'Type': 'CC',
    'Currency': 'USD',
    'CustomerIP': '91.220.121.21',
    'PaymentMethod': {
      'CardNumber': '4111111111111111',
      'CardType': 'VISA',
      'ExpirationYear': '2017',
      'ExpirationMonth': '12',
      'CCID': '123',
      'HolderName': 'John',
      'RecurringEnabled': 'True',
      'HolderNameTime': '12',
      'CardNumberTime': '12'
    }
  }
});

sc.fetchProduct('AS_Test').then(makeProduct,
    function(error) {
      console.log(error);
    });

sc.fetchProductPrice('AS_Test').then(makeProductPrice,
    function(error) {
      
    });

/*
 sc.updateOrder().then(function(response) {
 console.log('updateOrder', response);
 },
 function(error) {
 console.log(error);
 });

 sc.placeOrder().then(function(response) {
 console.log(response);
 },
 function(error) {
 console.log(error);
 });
 */