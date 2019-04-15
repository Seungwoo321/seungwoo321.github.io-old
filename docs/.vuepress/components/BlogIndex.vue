<template>
    <div>
        <div v-for="post in posts">
            <h2>
                <router-link :to="post.path">
                    {{ post.frontmatter.title }}
                </router-link>
            </h2>

            <p>
                {{ post.frontmatter.description }}
            </p>

            <p>
                <router-link :to="post.path">
                    Read more
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: [''],
    computed: {
        posts () {
            console.log(this)
            return this.$site.pages.filter(page => page.path.startsWith('/blog/') && 
            !page.frontmatter.blog_index).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
        }
    }
}
</script>

<style>

</style>
