module.exports = {
    title: 'Hairpin',
    description: 'hairpin 文档',
    base: '/',
    head: [['link', { rel: 'icon', href: `/logo.png` }]],
    port: 3005,
    // serviceWorker: true,
    themeConfig: {
        repo: 'fakaka/Note',
        // lastUpdated: '最近更新',
        nav: [
            {
                text: 'Java',
                items: [
                    {
                        text: 'Java',
                        link: '/Java/'
                    },
                    {
                        text: 'Java web',
                        link: '/other/'
                    },
                    {
                        text: 'Java framework',
                        link: '/Java/framework/'
                    }
                ]
            },
            {
                text: '数据库',
                link: '/Database/'
            },
            {
                text: '环境安装',
                link: '/install/'
            },
            {
                text: '面试',
                link: '/Interview/'
            },
            {
                text: '设计模式',
                link: '/design-pattern/'
            }
        ],
        sidebar: {
            '/Java/': genJavaGroup()
        }
    }
}

function genJavaGroup() {
    return [
        '/Java/',
        {
            title: 'Collection',
            // collapsable: false,
            children: [
                '/Java/Collection/Collection-HashMap-1',
                '/Java/Collection/Collection-HashMap-2'
            ]
        },
        {
            title: 'Log',
            children: ['/Java/Log-log4j', '/Java/Log-logback']
        }
    ]
}
