// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'REA intelligence',
  siteDescription: "investing",
  siteUrl: 'https://rea-intelligence.com',
  titleTemplate: `%s | REA Intelligence`,
  icon: 'src/assets/favicon.png',
  plugins: [
    {
      use: 'gridsome-plugin-gtag',
      options: {
        config: {
          id: process.env.GOOGLE_ANALYTICS_ID
        }
      }
    },
    {
      use: "gridsome-plugin-tailwindcss"
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
          author: {
            typeName: 'Author'
          }
        },
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/authors/*.md',
        typeName: 'Author',
        create: true,
        refs: {
          typeName: 'Post'
        }
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'static/guides/crypto/*.md',
        typeName: 'Crypto',
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
  ],
  templates: {
    Post: '/:title',
    Tag: '/tag/:id',
    Author: '/author/:title',
    Crypto: [
      {
        path: '/guides/crypto/:title',
        component: './src/templates/guides/crypto/Guide.vue'
      }],
  },
};
