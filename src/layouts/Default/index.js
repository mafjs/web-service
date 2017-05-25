import {mapState, mapActions} from 'vuex';

export default require('./default.pug')({

    name: 'DefaultLayout',

    computed: {
        ...mapState([
            'meta',
            'pageName'
        ])
    },

    methods: {
        ...mapActions([
            'init'
        ])
    }

});
