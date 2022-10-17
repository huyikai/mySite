export default [
    { text: 'Blog', link: '/blog/' },
    {
        text: 'DevDocs', items: [
            {
                text: '前端', items: [
                    { text: 'CSS', link: '/dev/frontend/css/' },
                    { text: 'Nodejs', link: '/dev/frontend/nodejs/' },
                    { text: 'Vue', link: '/dev/frontend/vue/' },
                    { text: 'React', link: '/dev/frontend/react/' },
                    { text: 'TypeScript', link: '/dev/frontend/typescript/' }
                ]
            },
            {
                text: '后端', items: [
                    { text: 'Java', link: '/dev/backend/java/' },
                    { text: 'Linux', link: '/dev/backend/linux/' }
                ]
            }
        ]
    }, {
        text: 'DevTools', items: [
            {
                text: '工具', items: [
                    { text: 'Git', link: '/dev/devTools/git/' },
                    { text: 'Docker', link: '/dev/devTools/docker/' },
                    { text: 'VSCode', link: '/dev/devTools/vscode/' }
                ]
            }
        ]
    }
]