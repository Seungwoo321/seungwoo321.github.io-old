<template>
    <div class="tags-list-index">
        <span>
            <router-link to="/blog">
                All
            </router-link>
            ({{ postAllCount }})
        </span>
        <span v-for="(key, index) in Object.keys(tags)" :key="index">
            <router-link :to="`?tag=${key.trim()}`">
                {{ key }}
            </router-link>
            ({{ tags[key] }})
        </span>
    </div>
</template>

<script>
export default {
    computed: {
        postAllCount () {
            return this.$site.pages.filter(page => page.frontmatter.tags).length
        },
        tags () {
            return this.$site.pages.reduce((accumulator, currentValue) => {
                currentValue.frontmatter.tags && currentValue.frontmatter.tags.forEach(tag => {
                    if (!accumulator[tag]) accumulator[tag] = 0
                    accumulator[tag] ++
                })
                return accumulator
            }, {})
        }
    }
}
</script>

<style scoped>
.tags-list-index  {
    margin-bottom: 20px;
}
.tags-list-index span {
    padding: 2px;
    font-weight: 500;
    margin-top: 5px;
}
</style>