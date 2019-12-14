<template>
    <div style="display:flex;">
        <div class="flex-card" v-for="post in posts">
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
.flex-card {
    flex: 1 1;
    width: 50%;
    height: 301px;
    padding: 20px;
    float: left;
    box-sizing: border-box;
    margin: 8px;
}

</style>>

