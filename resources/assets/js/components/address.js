import $ from 'jquery'

export default {

    template: '#address-template',

    props: ['address', 'has_error'],

    computed: {
        classHasError: function () {
            return {
                'has-error': this.has_error
            }
        }
    },

    methods: {
        enterKey: function () {
            //$("#address").trigger('geocode');
            this.$dispatch('EnterKeyPressed');
        }
    }
}