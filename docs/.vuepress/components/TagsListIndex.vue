<template>
    <div>
        <h1>
            태그목록
        </h1>
        <div class="tags-list">
            <div class="tags-list-item">
                <router-link to="/">
                    전체보기
                </router-link>
                ({{ postAllCount }})
            </div>
            <div v-for="(key, index) in Object.keys(tags)" :key="index"
                class="tags-list-item"
            >
                <router-link :to="`?tag=${key.trim()}`">
                    {{ key }}
                </router-link>
                ({{ tags[key] }})
            </div>
        </div>
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
.tags-list  {
    display: flex;
    flex-wrap: wrap;
}

.tags-list-item {
    padding: 5px;
    flex: 1 40%
}
</style>