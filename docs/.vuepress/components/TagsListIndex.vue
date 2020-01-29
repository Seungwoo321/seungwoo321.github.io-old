<template>
    <div class="tags-list-index">
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
        tags () {
            return this.$site.pages.reduce((accumulator, currentValue) => {
                currentValue.frontmatter.tags && currentValue.frontmatter.tags.split(',').forEach(tag => {
                    if (typeof accumulator[tag] === 'undefined') {
                        accumulator[tag] = 0
                    }
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