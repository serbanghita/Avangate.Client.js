var sc = new ShoppingCart('SERBANGH', 'W9(a39#d+D3A0+2@6]6]');
sc.setOrder({
  'Currency': 'usd',
  'Language': 'en',
  'Country': 'us',
  'CustomerIP': '91.220.121.21',
  'Source': 'serban.ghita.org',
  'ExternalReference': 'REST_API_AVANGTE',
  'Items': [
    {
      'Code': 'TS_Album_2013',
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

sc.fetchProduct('TS_Album_2013').then(function(response) {
    console.log(response);
  },
  function(error) {
    console.log(error);
});
/*
sc.updateOrder().then(function(response) {
    console.log(response);
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