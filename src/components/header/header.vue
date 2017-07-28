<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar" v-if="chSeller.avatar">
        <img :src="chSeller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{chSeller.name}}</span>
        </div>
        <div class="description">
          {{chSeller.description}}/{{chSeller.deliveryTime}}分钟到达
        </div>
        <div class="support" v-if="chSeller.supports">
          <span class="icon" :class="classMap[chSeller.supports[0].type]"></span>
          <span class="text">{{chSeller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="chSeller.supports" @click="showDetail">
        <span class="count">{{chSeller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bottom-wrap">
      <span class="bottom-left"></span><span class="bottom-txt">{{chSeller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="chSeller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <h1 class="name">{{chSeller.name}}</h1>
            <div class="star-wrap">
              <star :size="48" :score="chSeller.score"></star>
            </div>
            <advertising advertising="优惠信息"></advertising>
            <ul class="supports" v-if="chSeller.supports">
              <li v-for="item in chSeller.supports" class="support-item">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="txt">{{item.description}}</span>
              </li>
            </ul>
            <advertising advertising="商家公告"></advertising>
            <div class="bulletin">
              <p>{{chSeller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hide"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    import star from '../star/star.vue';
    import advertising from '../title/title.vue';
    export default {
      props: {
        chSeller: {
          type: Object
         }
      },
      data () {
        return {
           detailShow: false
        };
      },
      methods: {
        showDetail: function () {
          this.detailShow = true;
        },
        hide: function () {
          this.detailShow = false;
        }
      },
      created () {
          this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      },
      components: {
        star,
        advertising
      }
    };
</script>

<style  lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/minix.styl"
     .header
       position relative
       overflow hidden
       background rgba(7,17,27,0.5)
       .content-wrap
         position relative
         font-size 0
         padding  24px 16px 18px 24px
         .avatar
           vertical-align top
           display inline-block
         .content
           display inline-block
           margin-left 16px
           .title
             margin 2px 0 8px 0
             .brand
               display inline-block
               vertical-align top
               width 30px
               height 18px
               bg-image('brand')
               background-size 30px 18px
               background-repeat no-repeat
             .name
               margin-left 6px
               line-height 18px
               font-size 16px
               font-weight bold
               color rgb(255,255,255)
           .description
             font-weight 200
             font-size 12px
             color rgb(255,255,255)
             line-height 12px
           .support
             margin-top 10px
           .icon
             vertical-align top
             margin 0 4px 0 0
             display inline-block
             width 14px
             height 14px
             background-repeat no-repeat
             background-size 14px 14px
             &.decrease
               bg-image('decrease_1')
             &.discount
               bg-image('discount_1')
             &.guarantee
               bg-image('guarantee_1')
             &.invoice
               bg-image('invoice_1')
             &.special
               bg-image('special_1')
           .text
             font-weight 200
             font-size 12px
             color rgb(255,255,255)
             line-height 12px
         .supports-count
           position absolute
           right 12px
           bottom 14px
           padding 0 8px
           line-height 24px
           height 24px
           border-radius 14px
           background rgba(0,0,0,0.2)
           text-align center
           .count
             vertical-align top
             font-size 10px
             color rgb(255,255,255)
             line-height 24px
             font-weight 200
           .icon-keyboard_arrow_right
             font-size 10px
             line-height 24px
             margin-left 2px
       .bottom-wrap
         position relative
         background rgba(7,17,27,0,2)
         height 28px
         line-height 28px
         overflow hidden
         padding 0 20px 0 12px
         white-space nowrap
         text-overflow: ellipsis
         .bottom-left
           vertical-align top
           margin-top 9px
           display inline-block
           width 22px
           height 12px
           bg-image('bulletin')
           background-size 22px 12px
           background-repeat no-repeat
         .bottom-txt
           vertical-align top
           margin 0 4px 0 4px
           font-size 10px
           line-height 28px
           font-weight 200
           color rgb(255,255,255)
         .icon-keyboard_arrow_right
           position absolute
           font-size 10px
           right 10px
           top 10px
       .background
         position absolute
         left 0
         top 0
         z-index -10
         width 100%
         height 100%
         filter blur(10px)
       .detail
         position fixed
         left 0
         top 0
         width 100%
         height 100%
         overflow auto
         z-index 300
         background rgba(7,17,27,0.8)
         backdrop-filter blur(20px)
         &.fade-enter-active,&.fade-leave-active
           transition all 0.6s
         &.fade-enter,&.fade-leave-to
           opacity 0
           background rgba(7,17,27,0)
         .detail-wrap
           width 100%
           min-height 100%
           .detail-main
             margin-top 64px
             padding-bottom 64px
             color rgb(255,255,255)
             .name
              font-size 16px
              font-weight 700
              line-height 16px
              text-align center
             .star-wrap
               margin 16px 0 0px 0
               text-align center
             .supports
               margin 0 36px
               .support-item
                 margin-bottom 12px
                 font-size 0
                 &:last-child
                   margin-bottom 0px
                 .icon
                   display inline-block
                   width 16px
                   height 16px
                   background-size 16px 16px
                   background-repeat no-repeat
                   vertical-align top
                   margin-right 6px
                   margin-left 12px
                   &.decrease
                     bg-image('decrease_2')
                   &.discount
                     bg-image('discount_2')
                   &.guarantee
                     bg-image('guarantee_2')
                   &.invoice
                     bg-image('invoice_2')
                   &.special
                     bg-image('special_2')
                 .txt
                   font-size 12px
                   line-height 12px
                   font-weight 200
                   color rgb(255,255,255)
             .bulletin
               margin 0 48px
               font-size 12px
               font-weight 200
               line-height 24px
               color rgb(255,255,255)
         .detail-close
           position relative
           width 32px
           height 32px
           margin -64px auto 0 auto
           font-size 32px
           color rgba(255,255,255,0.5)
           clear both
</style>
