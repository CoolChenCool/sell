<template>
  <div class="app">
    <v-header :chSeller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/" exact>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :chSeller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import {urlParse} from './common/js/until';
  const OK = 0;
  export default {
    data () {
      return {
        seller: {
            id: (() => {
               let queryParam = urlParse();
               return queryParam.id;
            })()
        }
      };
    },
    created () {
      this.$http.get('/api/seller').then(response => {
        response = response.body;
        if (response.errno === OK) {
         this.seller = response.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "./common/stylus/minix.styl"
  .app
    .tab
      display flex
      width 100%
      height 40px
      border-1px (rgba(7,17,27,0.1))
      .tab-item
        text-align center
        line-height 40px
        flex 1
        font-size 14px
        & > a
          display block
          color rgb(77,85,93)
          &.active
            color #e74c3c
</style>
