<template>
  <Layout>
    <main>
      <post-header :post="$page.post" />
      <article class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto px-6 sm:px-12 pt-16" :class="{'border-b border-grey-lighter pb-10 mb-16': !$page.post.author}">
        <div :class="{'pb-10': $page.post.author || $page.post.tags}" class="markdown text-lg leading-normal text-gray-700" v-html="$page.post.content" />
        <footer v-if="$page.post.author || $page.post.tags" class="flex flex-wrap pb-10 sm:pb-16">
          <div>
            <g-link v-for="tag in $page.post.tags" :key="tag.id" :to="`${tag.path}/`" class="inline-block text-orange-400 hover:text-white hover:bg-orange-400 border border-orange-400 font-sans font-bold text-xs sm:text-sm px-4 py-2 mr-4 mb-2 rounded-full transition-color transition-bg">
            <svg class="inline w-3 fill-current align-middle mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="img"><path d="M0 10V2l2-2h8l10 10-10 10L0 10zm4.5-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
            {{ tag.title }}
            </g-link>
          </div>

        </footer>
      </article>


    </main>
  </Layout>
</template>

<script>
import moment from 'moment'
import config from '~/.temp/config.js'

import slugify from '@sindresorhus/slugify'
import PostHeader from '~/components/PostHeader'

export default {
  components: {
    PostHeader,

  },
  metaInfo () {
    return {
      title: `${this.$page.post.title} ${this.$page.post.tag ? '- '+this.$page.post.tag.name : ''}`,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.description(this.$page.post)
        },

        { property: "og:type", content: 'article' },
        { property: "og:title", content: this.$page.post.title },
        { property: "og:description", content: this.description(this.$page.post) },
        { property: "og:url", content: this.postUrl },
        { property: "article:published_time", content: moment(this.$page.post.date).format('YYYY-MM-DD') },
        { property: "og:image", content: this.ogImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.$page.post.title },
        { name: "twitter:description", content: this.description(this.$page.post) },
        { name: "twitter:site", content: "@threenine39" },
        { name: "twitter:creator", content: "@threenine39" },
        { name: "twitter:image", content: this.ogImageUrl },
      ],
    }
  },
  mounted () {
    import('medium-zoom').then(mediumZoom => {
      this.zoom = mediumZoom.default('.markdown p > img')
    })
  },
  methods: {
    description(post, length, clamp) {
      if (post.description) {
        return post.description
      }

      length = length || 280
      clamp = clamp || ' ...'
      let text = post.content.replace(/<pre(.|\n)*?<\/pre>/gm, '').replace(/<[^>]+>/gm, '')

      return text.length > length ? `${ text.slice(0, length)}${clamp}` : text
    },
    titleCase(str) {
      return str.replace('-', ' ')
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
    },

  },
  computed: {
    config () {
      return config
    },

    postUrl () {
      let siteUrl = this.config.siteUrl
      let postPath = this.$page.post.path

      return postPath ? `${siteUrl}${postPath}` : `${siteUrl}/${slugify(this.$page.post.title)}/`
    },
    ogImageUrl () {
      return this.$page.post.cover || `${this.config.siteUrl}/images/rea-intelligence-card.png`
    }
  },
}
</script>

<page-query>
query Post ($path: String) {
  post (path: $path) {
    title
    path
    content
    description
    timeToRead
    tags {
      id
      title
      path
    }
  }
}
</page-query>
