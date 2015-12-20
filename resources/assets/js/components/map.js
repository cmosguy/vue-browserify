import $ from 'jquery'
import geocomplete from 'geocomplete'

export default {

    template: '#map-template',

    props: ['address', 'hasError', 'classHasError'],

    events: {
        MapsApiLoaded: function () {
            console.log('Google maps API loaded.');
            this.createMap();
        },
        EnterKeyPressed: function () {
            this.locateAddress();
        }
    },

    watch: {
        address: function () {
            this.locateAddress();
        }

    },

    methods: {
        createMap: function () {

            $("#address").geocomplete();
            this.map = new google.maps.Map(this.$els.map, {
                zoom: 14
//center: {lat: 42, lng: -85}
            });

            this.locateAddress();
        },

        locateAddress: function () {
            var geocoder = new google.maps.Geocoder();
            var vm = this;

            geocoder.geocode({address: this.address}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    vm.map.setCenter(results[0].geometry.location);

//location = results[0].address_component;

                    if (results[0].address_components.length > 8) {
//vm.city = results[0].address_components[3].long_name;
                        vm.$dispatch('addressUpdated', results[0].address_components);
                    }

                    vm.$dispatch('mapHasNoError');

                    return new google.maps.Marker({
                        map: vm.map,
                        position: results[0].geometry.location
                    });
                }

//alert('Had trouble loading that address');
//vm.warningAlert('Had trouble loading address');
//vm.$root.warningAlert('Had trouble loading address');
//vm.$root.hasError = true;
//vm.classHasError = {
//    'has-error': true
//};
                vm.$dispatch('mapHasError', 'This doesn\'t look like a valid address');
//notie.alert(2, 'Warning<br><b>' + 'Had trouble loading address' + '</b><br>', 2);
//App.alert({
//    container     : $('#alert_container').val(), // alerts parent container(by default placed after the page breadcrumbs)
//    place         : "append", // "append" or "prepend" in container
//    type          : 'info', // alert's type
//    message       : "Test alert", // alert's message
//    close         : true, // make alert closable
//    reset         : false, // close all previouse alerts first
//    focus         : true, // auto scroll to the alert after shown
//    closeInSeconds: 10000, // auto close after defined seconds
//    icon          : 'fa fa-warning' // put icon class before the message
//});
            });
        }
    }
}
