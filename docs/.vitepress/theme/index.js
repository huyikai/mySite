import Comment from './components/Comment.vue'
import Layout from './Theme.vue';
import 'vitepress/dist/client/theme-default/styles/fonts.css';
import 'vitepress/dist/client/theme-default/styles/vars.css';
import 'vitepress/dist/client/theme-default/styles/base.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';
import './styles/vars.scss'
import './styles/style.scss'
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue';
const theme = {
    Layout,
    NotFound,
    enhanceApp({ app }) {
        app.component('Comment', Comment)
    }
};
export default theme;