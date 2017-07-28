<template>
  <div class="title">
    <div class="line"></div>
    <div class="txt">{{advertising}}</div>
    <div class="line"></div>
  </div>

</template>

<script>
    export default {
        props: {
          advertising: {
            type: String
          }
        }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .title
    display flex
    margin 28px 36px 24px 36px
    .line
      flex 1
      position relative
      top -6px
      border-bottom 1px solid rgba(255,255,255,0.2)
    .txt
      padding 0 12px

</style>
