var place, autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('billing_address_1')),
      {componentRestrictions: {country: "gb"}});
  autocomplete.addListener('place_changed', fillInAddress);

}

function fillInAddress() {
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
  };
  $("#billing_postcode").val(address.postcode).change();
  $("#billing_address_1").val(address.street_number + " " + address.street).change();
  $("#billing_city").val(address.city).change();
  $("#billing_state").val(address.state).change();

  hidefield ();
}
function hidefield() {
  if($("#billing_address_1")) {
    $("#billing_address_2_field").show();
    $("#billing_city_field").show();
    $("#billing_state_field").show();
    $("#billing_postcode_field").show();
  }
}
