module.exports = {
  title: "Hairpin",
  description: "hairpin 文档",
  base: "/",
  head: [["link", { rel: "icon", href: `/logo.png` }]],
  port: 3005,
  // serviceWorker: true,
  themeConfig: {
    repo: "fakaka/note",
    // lastUpdated: '最近更新',
    nav: [
      {
        text: "Java",
        items: [
          {
            text: "Java base",
            link: "/Java/base/",
          },
          {
            text: "Java web",
            link: "/other/",
          },
          {
            text: "Java framework",
            link: "/Java/framework/",
          },
        ],
      },
      {
        text: "JavaScript",
        items: [
          {
            text: "Javascript",
            link: "/Javascript/",
          },
          {
            text: "Vue",
            link: "/Javascript/vue/",
          },
          {
            text: "Node",
            link: "/Javascript/node/",
          },
        ],
      },
      {
        text: "数据库",
        link: "/Database/",
      },
      {
        text: "设计模式",
        link: "/design-pattern/",
      },
      {
        text: "环境安装",
        link: "/install/",
      },
    ],
    sidebar: {
      "/Java/base/": genJavaGroup(),
      "/Java/framework/": [
        {
          text: "framework",
          items: [
            { text: "value_is_null", link: "/Java/framework/value_is_null" },
          ],
        },
      ],
      "/Javascript/vue/": [
        {
          text: "Vue",
          items: [{ text: "Vue-cli", link: "/Javascript/vue/Vue-cli" }],
        },
      ],
    },
  },
};

function genJavaGroup() {
  return [
    // "/Java/base/",
    {
      text: "Collection",
      // collapsable: false,
      items: [
        {
          text: "Collection-HashMap-1",
          link: "/Java/Collection/Collection-HashMap-1",
        },
        {
          text: "Collection-HashMap-2",
          link: "/Java/Collection/Collection-HashMap-2",
        },
      ],
    },
    {
      text: "Log",
      items: [
        {
          text: "log4j",
          link: "/Java/Log-log4j",
        },
        {
          text: "logback",
          link: "/Java/Log-logback",
        },
      ],
    },
  ];
}
