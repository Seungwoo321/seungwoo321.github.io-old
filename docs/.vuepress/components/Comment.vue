<template>
    <div ref="comment"></div>
</template>

<script>
export default {
    mounted () {
        const utterances = document.createElement("script");
        utterances.type = "text/javascript";
        utterances.async = true;
        utterances.crossorigin = "anonymous";
        utterances.src = "https://utteranc.es/client.js";

        utterances.setAttribute("issue-term", "pathname");
        utterances.setAttribute("theme", "github-light");
        utterances.setAttribute("repo", "Seungwoo321/blog-comment");

        this.$refs.comment.appendChild(utterances);
    }
}
</script>

<style>

</style>