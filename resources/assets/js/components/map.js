import $ from 'jquery'
import geocomplete from 'geocomplete'

export default {

    template: '#map-template',

    props: ['address', 'has_error', 'location'],

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


                    if (results[0].address_components.length >= 8) {

                        var location = results[0].address_components;

                        vm.has_error = false;

                        vm.location.streetNumber = location[0].long_name;
                        vm.location.street = location[1].long_name;
                        vm.location.neighborhood = location[2].long_name;
                        vm.location.city = location[3].long_name;
                        vm.location.county = location[4].long_name;
                        vm.location.state = location[5].short_name;
                        vm.location.countryCode = location[6].short_name;
                        vm.location.zip = location[7].short_name;
                    } else {
                        vm.has_error = true;
                        vm.location.streetNumber = '';
                        vm.location.street = '';
                        vm.location.neighborhood = '';
                        vm.location.city = '';
                        vm.location.county = '';
                        vm.location.state = '';
                        vm.location.countryCode = '';
                        vm.location.zip = '';

                    }

                    return new google.maps.Marker({
                        map: vm.map,
                        position: results[0].geometry.location
                    });
                }

            });
        }
    }
}
