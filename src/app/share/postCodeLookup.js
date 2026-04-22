window.onload = function() {
    new clickToAddress({
        accessToken: '9e47e-6a245-5717e-067a7',
        dom: {
            form : '',
            search:     'search-bar',
            town:       'address-town',
            postcode:   'address-zip',
            line_1:     'address-line-1',
            line_2:     'address-line-2',
            country:    'address-country'
        },
        domMode: 'id'
    });
  };