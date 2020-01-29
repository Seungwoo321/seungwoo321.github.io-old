<template>
    <div>
        <span class="tag" v-for="(key, index) in tags" :key="index">
            <router-link :to="`?tag=${key.trim()}`">
                {{ key }}
            </router-link>
        </span>
    </div>
</template>

<script>
export default {
    props: ['tags']
}
</script>

<style scoped>
span.tag {
    padding: 5px;
    border-radius: 7px;
    font-size: small;
    background: #3eaf7c;
    margin-right: 5px;
    color: #fff;
    font-weight: 500;
    margin-top: 5px;
}
span.tag a {
    color: #fff;
}
</style>