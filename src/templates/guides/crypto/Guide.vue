<template>
    <Layout>
        <main>
            <article class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto px-6 sm:px-12 pt-16"
                     :class="{'border-b border-grey-lighter pb-10 mb-16': !$page.crypto.author}">
                <h1 class="text-orange-700 text-3xl sm:text-4xl leading-tight font-sans mb-1 sm:mb-2" >{{ $page.crypto.title }}</h1>
                <div class="markdown-body text-lg leading-normal text-gray-700"
                     v-html="$page.crypto.content" />


            </article>
        </main>
    </Layout>

</template>

<script>
    export default {
        name: "Guide"
    }
</script>

<page-query>
    query Guide($path: String) {
    crypto (path: $path) {
            title
            path
            content
            description
            timeToRead
        }
    }
</page-query>
