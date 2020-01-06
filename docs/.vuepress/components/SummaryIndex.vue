<template>
    <div class="flex-container">
        <div class="flex-card" v-for="post in posts.slice(0, 3)">
            <strong>
                <router-link :to="post.path">
                    {{ post.frontmatter.title }}
                </router-link>
            </strong>
            <div class="summary">
                {{ post.frontmatter.description  }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['category'],
    computed: {
        posts () {
            return this.$site.pages.filter(page => page.path.startsWith(`/${this.category}/`) && 
            !page.frontmatter.index).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
        }
    }
}
</script>

<style scoped>
.flex-container {
    display:flex;
    line-height: 1.5rem;
    margin-bottom: 20px;
}
.flex-card {
    flex: 1 1;
    width: 50%;
    /* height: 100px; */
    padding: 20px;
    float: left;
    box-sizing: border-box;
    margin: 8px;
}

</style>>

