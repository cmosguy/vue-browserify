import $ from 'jquery';



export default
{
    el: 'body',

    data: {
        address: '',
        hasError: false,
        classHasError: {
            'has-error': false
        },
        city: "",
        streetNumber: "",
        street: "",
        neighborhood: "",
        county: "",
        state: "",
        countryCode: "",
        zip: ""
    },

    watch: {
        hasError: function () {
            this.classHasError =
            {
                'has-error': this.hasError
            }
        }
    },

    events: {
        mapHasError: function (message) {
            this.hasError = true;
        },
        mapHasNoError: function () {
            this.hasError = false;
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
        },
        warningAlert: function (message) {
            notie.alert(2, 'Warning<br><b>' + message + '</b><br>', 2);
        },
        enterKey: function () {
            $("#address").trigger('geocode');
            this.$broadcast('EnterKeyPressed');
        }
    }
}

module.exports = app;
