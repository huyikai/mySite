<template>
    <div id="gitalk-container"></div>
</template>
<script setup lang="ts">
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

console.log(location.pathname)
const commentConfig = {
    clientID: 'b8f1bac3db10c9fad408',
    clientSecret: '086a4ba4f6846b95a1496d8fbdde985b0e46fad8',
    // repo: "https://github.com/huyikai/mySite",
    repo: "mySite",
    owner: "huyikai",
    admin: ["huyikai"],
};
const gitalk = new Gitalk(commentConfig);
gitalk.render("gitalk-container");
</script>