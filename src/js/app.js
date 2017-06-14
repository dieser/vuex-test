import Vue from 'vue';
import VueResource from 'vue-resource';
import app from '../components/app.vue';
import aselect from '../components/aselect.vue';
import adata from '../components/adata.vue';

Vue.use(VueResource);

window.app = new Vue({
    el: '#app',
    data: {
    },
    components: { app, aselect, adata },
    render: h => h(app)
});
