# vscode


<!-- <ul>
    <li v-for="(item,index) in blogs" :key="index" >
        <a :href='normalizeLink(item.link)'>{{ item.text }}</a>
    </li>
</ul>


<script setup>
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js'
import { useData,useRouter } from 'vitepress'
const blogs=useData().theme.value.sidebar['/dev/devTools/vscode/'][0]['items']
</script> -->

<script setup>
import Summary from '../../../.vitepress/components/Summary.vue'
</script>
<span v-for="i in 3">{{ i }}</span>

aaa
<Summary />
bbb