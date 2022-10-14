# Dev Docs

## 前端
<ul>
    <li v-for="(item,index) in doc.frontend" :key="index" >
        <a :href='normalizeLink(item.link)'>{{ item.text }}</a>
    </li>
</ul>

## 后端
<ul>
    <li v-for="(item,index) in doc.backend" :key="index" >
        <a :href='normalizeLink(item.link)'>{{ item.text }}</a>
    </li>
</ul>


<script setup>
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js'
import { useData,useRouter } from 'vitepress'
import {  ref } from 'vue'

const templist=useData().theme.value.sidebar
const doc=ref({
    'frontend':[],
    'backend':[]
})
for(let k in templist){
    let text=templist[k][0].text
    if(k.indexOf('frontend')>=0){
        doc.value.frontend.push({
            text,
            link:k
        })
    }
    if(k.indexOf('backend')>=0){
        doc.value.backend.push({
            text,
            link:k
        })
    }
}
</script>
