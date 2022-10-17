import blog from "./sidebar/blog"
import css from "./sidebar/css"
import nodejs from "./sidebar/nodejs"
import docker from "./sidebar/docker"
import git from "./sidebar/git"
import java from "./sidebar/java"
import linux from "./sidebar/linux"
import react from "./sidebar/react"
import vue from "./sidebar/vue"
import typescript from "./sidebar/typescript"
import vscode from "./sidebar/vscode"
import frontendOther from "./sidebar/frontendOther"
export default {
    ...blog,
    ...css,
    '/dev/frontend/nodejs/': nodejs,
    '/dev/frontend/vue/': vue,
    '/dev/frontend/react/': react,
    '/dev/frontend/typescript/': typescript,
    '/dev/frontend/other/': frontendOther,
    '/dev/backend/java/': java,
    '/dev/backend/linux/': linux,
    '/dev/devTools/docker/': docker,
    '/dev/devTools/git/': git,
    '/dev/devTools/vscode/': vscode
}