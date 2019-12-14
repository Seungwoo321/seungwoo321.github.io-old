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
                <router-link to="about">
                    {{ post.frontmatter.author }}
                </router-link>
                | {{ post.frontmatter.date.substring(0, 10) }}
            </p>
        </div>
        <div v-if="noPost">
            No post.
        </div>
    </div>
</template>

<script>
export default {
    props: ['category', 'tags', 'recent', 'related'],
    computed: {
        noPost () {
            return this.posts.length === 0
        },
        posts () {
            const posts = this.$site.pages.filter(this.categoryFilter).filter(this.relatedFilter).sort(this.sort)
            return this.recent && posts.length > 3 ? posts.slice(0, 3) : posts
        }
    },
    methods: {
        categoryFilter (page) {
            return page.path.startsWith(`/${this.category}/`) && !page.frontmatter.index
        },
        relatedFilter (page) {
            return this.tags && this.tags.length > 0 || this.related ? page.frontmatter.tags && page.frontmatter.tags.include(this.tag) : true
        },
        sort (a, b) {
            return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        }
    }
}
</script>

<style>

</style>>