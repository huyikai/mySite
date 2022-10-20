import DefaultTheme from "../theme-default";
import Comment from './components/Comment.vue'
const theme = {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('Comment', Comment)
    }
};
export default theme;