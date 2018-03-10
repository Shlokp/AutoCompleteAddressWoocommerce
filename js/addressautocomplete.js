// https://stackoverflow.com/questions/33547312/google-maps-api-autocomplete-2nd-address-fields-on-same-page
// https://stackoverflow.com/questions/28023254/multiple-google-autocomplete-and-places-search-issue

var place, autocompleteBilling, autocompleteShipping;

function initAutocomplete() {
  autocompleteBilling = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('billing_address_1')),
      {componentRestrictions: {country: "gb"}});
  autocompleteBilling.addListener('place_changed',  function () {document.getElementById('billing_address_1').value=''; fillInAddress(autocompleteBilling, "billing");});

  autocompleteShipping = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('shipping_address_1')),
      {componentRestrictions: {country: "gb"}});
  autocompleteShipping.addListener('place_changed', function () {document.getElementById('shipping_address_1').value=''; fillInAddress(autocompleteShipping, "shipping");});

}

function fillInAddress(autocomplete, location) {
  var place = autocomplete.getPlace();
  var address = {};
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    switch (addressType) {
      case "street_number":
        address.street_number = place.address_components[i].short_name;
        break;
      case "route":
        address.street = place.address_components[i].short_name;
        break;
      case "administrative_area_level_2":
        address.state = place.address_components[i].short_name;
        break;
      case "postal_town":
        address.city = place.address_components[i].long_name;
        break;
      case "postal_code":
        address.postcode = place.address_components[i].short_name;
        break;
    }
  }

  $("#" + location + "_postcode").val(address.postcode).change();
  $("#" + location + "_address_1").val(address.street_number + " " + address.street).change();
  $("#" + location + "_city").val(address.city).change();
  $("#" + location + "_state").val(address.state).change();
}
