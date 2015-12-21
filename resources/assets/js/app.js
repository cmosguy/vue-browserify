import $ from 'jquery';

import map from './components/map'
import address from './components/address'


export default function () {
    return {
        el: 'body',

        components: {map, address, location},

        data: {
            address: '',
            has_error: false,
            testNow: true,
            location: {
                city: "",
                streetNumber: "",
                street: "",
                neighborhood: "",
                county: "",
                state: "",
                countryCode: "",
                zip: ""
            }
        },

        events: {
            EnterKeyPressed: function () {
                this.$broadcast('EnterKeyPressed');
            },
            addressUpdated: function (location) {
                this.streetNumber = location[0].long_name;
                this.street = location[1].long_name;
                this.neighborhood = location[2].long_name;
                this.city = location[3].long_name;
                this.county = location[4].long_name;
                this.state = location[5].short_name;
                this.countryCode = location[6].short_name;
                this.zip = location[7].short_name;
            }
        },

        methods: {
            init: function () {
                this.$broadcast('MapsApiLoaded');
                $("#address").geocomplete();
            }
        }
    }
}
