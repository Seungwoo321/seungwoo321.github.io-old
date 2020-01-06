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
                <tags-list :tags="getTags(post)"></tags-list>
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
import TagsList from './TagsList'
export default {
    name: 'BlogIndex',
    props: ['category', 'recent', 'related'],
    components: {
        TagsList
    },
    computed: {
        noPost () {
            return this.posts.length === 0
        },
        posts () {
            return this.$site.pages.filter(this.categoryFilter).sort(this.sort)
        },
    },
    methods: {
        categoryFilter (page) {
            return page.path.startsWith(`/${this.category}/`) && !page.frontmatter.index
        },
        sort (a, b) {
            return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        },
        getTags (post) {
            return post.frontmatter.tags && post.frontmatter.tags.split(',')
        }
    }
}
</script>

<style>

</style>>