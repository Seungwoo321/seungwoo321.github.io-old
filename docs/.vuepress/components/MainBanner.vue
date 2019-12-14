<template>
    <div class="banner">
        <h1>
            {{ title }}
        </h1>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style>
.banner {
    /* display: inline-block; */
    position: absolute;
    /* height: 150px; */
    /* background-color: yellow; */
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
}
.banner h1 {
    text-align: center;
    padding: 60px 0;
    border-bottom: 1px solid #eaecef;
    
}
</style>