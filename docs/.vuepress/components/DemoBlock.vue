<template>
    <div class="demo-block">
        <div class="demo-block-tools" @click="toggle">
            <a> Show </a>
        </div>
        <div class="demo-block-content">
            <slot name="source"/>
        </div>
        <div v-show="visible">
            <slot name="hightlight"/>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            visible: false
        }
    },
    methods: {
        toggle () {
            this.visible = !this.visible;
        }
    }
}
</script>

<style>
.demo-block {
  position: relative;
  margin: 0;
  padding-bottom: .3rem;
}
.demo-block a {
    z-index: 1010;
    position: absolute;
    /* left: 0; */
    cursor: pointer;
    right: 0
}
.demo-block-content {
  /* display: flex; */
  /* padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px; */
  /* justify-content: center; */
  border: 1px solid #eeeeee
}
.demo-block-tools {
  position: absolute;
  right: 0;
  top: 0;
}

</style>