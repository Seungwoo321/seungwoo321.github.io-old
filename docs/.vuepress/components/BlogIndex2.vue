<template>
    <div>
        <h1 :id="title">
            <a :href="`#${title}`" class="header-anchor">#</a>
            {{ title }}
        </h1>
        <div v-for="(post, index) in posts" :key="index">
            <!-- <hr> -->
            <h2>
                <router-link :to="post.path">
                    {{ post.frontmatter.front_matter_title }}
                </router-link>
            </h2>
            <div style="display:flex;">
                <div style="flex:1 1 0;">
                    <a :href="`${post.path}`">
                        <img :src="post.frontmatter.thumbnail || defaultThumbnail" alt="post-thumbnail">
                    </a>
                </div>
                <div style="flex: 1 1 0;padding-left: 1rem">
                    <div>
                        <p>
                            {{ post.frontmatter.description }}
                        </p>
                        <p>
                            <tags-list :tags="getTags(post)"></tags-list>
                        </p>
                    </div>

                </div>
            </div>
            <p style="display:flex;justify-content:space-between;">
                <span>
                    <small>
                        {{ post.frontmatter.date.substring(0, 10) }}
                    </small>
                    |
                    <router-link :to="post.path">
                        read more
                    </router-link>
                </span>
                <small style="opacity:0.5">
                    by {{ post.frontmatter.author }}
                </small>
            </p>
            <!-- <p>


            </p> -->

        </div>
        <div v-if="noPost">
            <p>
                No post.
            </p>
        </div>
    </div>
</template>

<script>
import TagsList from './TagsList'
export default {
    name: 'BlogIndex',
    props: ['category', 'related'],
    data () {
        return {
            defaultThumbnail: '/thumb/post.png'
        }
    },
    components: {
        TagsList
    },
    computed: {
        title () {
            return this.isQuery ? this.$route.query.tag : 'All'
        },
        isQuery() {
            return !!this.$route.query.tag
        },
        noPost () {
            return this.posts.length === 0
        },
        posts () {
            return this.$site.pages.filter(this.categoryFilter).filter(this.tagFilter).sort(this.sort)
        },
    },
    methods: {
        categoryFilter (page) {
            return page.path.startsWith(`/${this.category}/`) && !page.frontmatter.index
        },
        tagFilter (page) {
            return this.isQuery ? page.frontmatter.tags && (page.frontmatter.tags.indexOf(this.$route.query.tag) > -1 || page.frontmatter.tags.map(tag => tag.toLowerCase()).indexOf(this.$route.query.tag) > -1) : true
        },
        sort (a, b) {
            return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        },
        getTags (post) {
            return post.frontmatter.tags && post.frontmatter.tags
        }
    }
}
</script>

<style>

</style>