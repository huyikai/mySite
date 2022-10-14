# React


<ul>
    <li v-for="(item,index) in blogs" :key="index" >
        <a :href='normalizeLink(item.link)'>{{ item.text }}</a>
    </li>
</ul>


<script setup>
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js'
import { useData,useRouter } from 'vitepress'
const blogs=useData().theme.value.sidebar['/dev/frontend/react/'][0]['items']
</script>
