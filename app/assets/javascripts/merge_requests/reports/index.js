import Vue from 'vue';
import VueRouter from 'vue-router';
import VueApollo from 'vue-apollo';
import createDefaultClient from '~/lib/graphql';
import routes from './routes';
import MergeRequestReportsApp from './components/app.vue';

export default () => {
  Vue.use(VueRouter);
  Vue.use(VueApollo);

  const el = document.getElementById('js-reports-tab');
  const { projectPath, iid, basePath } = el.dataset;
  const apolloProvider = new VueApollo({
    defaultClient: createDefaultClient(),
  });
  const router = new VueRouter({
    base: basePath,
    mode: 'history',
    routes,
  });

  // eslint-disable-next-line no-new
  new Vue({
    el,
    router,
    apolloProvider,
    provide: {
      projectPath,
      iid,
    },
    render(createElement) {
      return createElement(MergeRequestReportsApp);
    },
  });
};
