module.exports = {
  siteName: 'REA-Intelligence',
  siteDescription: "latest Cryptocurrency and Blockchain News, Information and Data for the US and UK markets, researched and written by a team of expert crypto-journalists",
  siteUrl: 'https://rea-intelligence.com',
  titleTemplate: `%s | REA-Intelligence`,
  icon: 'src/favicon.png',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        ['gridsome-plugin-remark-shiki', {
          theme: 'min-light'
        }]
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
          author: {
            typeName: 'Author',
            create: true,
          },
        },
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-158618204-1',
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      },
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'REA Intelligence, Crypto Currency Tutorials, Articles & News',
          feed_url: 'https://rea-intelligence.com/feed.xml',
          site_url: 'https://rea-intelligence.com',
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://rea-intelligence.com' + node.path,
          author: node.author,
          date: node.date,
        }),
        output: {
          dir: './static',
          name: 'feed.xml',
        },
      },
    },
  ],

  templates: {
    Post: '/:title',
    Tag: '/tag/:id',
    Author: '/author/:id',
  },

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ])

        if (process.env.NODE_ENV === 'production') {
          options.plugins.push(...[
            require('@fullhuman/postcss-purgecss')({
              content: [
                'src/assets/**/*.css',
                'src/**/*.vue',
                'src/**/*.js'
              ],
              defaultExtractor: content => content.match(/[\w-/:%]+(?<!:)/g) || [],
              whitelistPatterns: [/shiki/]
            }),
          ])
        }

        return options
      })
  },
}
