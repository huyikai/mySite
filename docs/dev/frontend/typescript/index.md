# Typescript


<ul>
    <li v-for="(item,index) in blogs" :key="index" >
    {{item.text}}
        <ul>
            <li v-for="(i,x) in item.items" :key="index" >
                <a :href='normalizeLink(i.link)'>{{ i.text }}</a>
            </li>
        </ul>
    </li>
</ul>


<script setup>
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js'
import { useData,useRouter } from 'vitepress'
const blogs=useData().theme.value.sidebar['/dev/frontend/typescript/'][0]['items']
</script>
