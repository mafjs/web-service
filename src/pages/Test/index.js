import {mapState, mapActions} from 'vuex';

export default require('./test.pug')({
    name: 'Test',

    data: function () {
        return {
            count: 0
        };
    },

    computed: {
        ...mapState('user', ['login']),
        ...mapState('page', ['text'])
    },

    created: function () {
        this.count++;

        this.setMeta({
            title: 'IndexPage title'
        });

        this.setUser({
            login: 'test'
        });
    },

    methods: {
        ...mapActions(['setMeta']),
        ...mapActions('user', ['setUser']),
        ...mapActions('page', ['init']),

        test: function () {
            this.count++;
        }
    }
});
