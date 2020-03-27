<template>
        <div class="container-inner mx-auto my-16">
            <h1 class="text-orange-700 text-4xl font-bold leading-tight mb-4">{{ post.title }}</h1>
            <div class="text-xl text-gray-600 mb-4">{{ post.date }}</div>
            <div class="flex mb-4 text-sm">
                <tags :tags="post.tags"/>

            </div>
        </div>
</template>

<script>
    import Tags from "@/components/Post/Tags";
    export default {
        name: "PostTitle",
        components: {
            Tags
        },
        props: ['post'],
    }
</script>

<style scoped>

</style>
