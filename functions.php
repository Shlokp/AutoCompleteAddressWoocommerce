<?php

// Only load the autocomplete js when on the checkout page
function addressautocompletejs() {
    // Page ID, title, slug, or array of such.
    // e.g. is_page('My page title') - page title
    // e.g. is_page(2) - page id
    // e.g. is_page('my-page-title') - page slug
    // e.g. is_page( array( 'page1', 'page1')) - in this example an array of page slugs.
    // Check out the references for more on this function.
    if (class_exists( 'WooCommerce' ) && ( is_checkout()) ) {
        wp_enqueue_script( 'addressautocomplete', '/wp-content/themes/astra-child/js/addressautocomplete.js' , array(), '1.0.0', true );
        wp_enqueue_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', array(), '1.0.0', true );
        wp_enqueue_script( 'googleplacesapi', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCD15Oww69TNUikIjRLNhtc5ntgn6htnLA&libraries=places&callback=initAutocomplete', array(), '1.0.0', true );
    }
}
add_action( 'wp_enqueue_scripts', 'addressautocompletejs' );

?>
