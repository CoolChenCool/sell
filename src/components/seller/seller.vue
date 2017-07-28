<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overView">
        <div class="collection">
          <i class="icon-favorite" :class="{'active':active}" @click="toggleFavorite"></i>
          <p class="des" :class="{'active':active}">{{favoriteTxt}}</p>
        </div>
        <h1 class="name">{{chSeller.name}}</h1>
        <div class="seller-star">
          <star :size="36" :score="chSeller.score"></star>
        </div>
        <div class="ratingCount">({{chSeller.ratingCount}})</div>
        <div class="sellCount">月售{{chSeller.sellCount}}单</div>
        <ul class="block-wrap">
          <li class="block">
            <h2>起送价</h2>
            <div class="des">{{chSeller.minPrice}}<span class="unit">元</span></div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="des">{{chSeller.deliveryPrice}}<span class="unit">元</span></div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="des">{{chSeller.deliveryTime}}<span class="unit">分钟</span></div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="announcement">
        <h1 class="name1">公告与活动</h1>
        <p class="notice border-1px">{{chSeller.bulletin}}</p>
        <ul class="supports" v-if="chSeller.supports">
          <li v-for="item in chSeller.supports" class="support-item border-1px">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="txt">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li v-for="pic in chSeller.pics" class="pic-item">
              <img :src="pic" alt="商家图片" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title border-1px">
          商家信息
        </div>
        <ul>
          <li class="info-item" v-for="item in chSeller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
    export default {
        props: {
            chSeller: {
                type: Object
            }
        },
        components: {
            star,
            split
        },
      data () {
        return {
            active: (() => {
              loadFromLocal(this.chSeller.id, 'favorite', false);
            })()
        };
      },
      computed: {
        favoriteTxt () {
           return this.active ? '已收藏' : '未收藏';
        }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      },
      methods: {
        toggleFavorite (e) {
            if (!e._constructed) {
                return;
            }
            this.active = !this.active;
            saveToLocal(this.chSeller, 'favorite', this.active);
        },
          _inscroll () {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.seller, {
                  click: true
                });
              } else {
                this.scroll.refresh();
                }
          },
          _picWrapper () {
            if (this.chSeller.pics) {
              let picWidth = 120;
              let margin = 6;
              let width = (picWidth + margin) * this.chSeller.pics.length;
              this.$refs.picList.style.width = width + 'px';
              this.$nextTick(() => {
                if (!this.picScroll) {
                  this.picScroll = new BScroll(this.$refs.picWrapper, {
                    eventPassthrough: 'vertical',
                    scrollX: true
                  });
                } else {
                  this.picScroll.refresh();
                }
              });
            }
          }
      },
      watch: {
        'chSeller' () {
          this.$nextTick(() => {
            this._inscroll();
            this._picWrapper();
          });
        }
      },
      mounted () {
        this.$nextTick(() => {
          this._inscroll();
          this._picWrapper();
        });
      }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/minix.styl';
  .seller
    position absolute
    left 0
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .overView
      position relative
      padding 18px
      font-size 0
      .collection
        position absolute
        right 16px
        top 16px
        text-align center
        .icon-favorite
          display block
          font-size 24px
          line-height 24px
          color #d4d6d9
          &.active
           color rgb(240,20,20)
        .des
          font-size 10px
          line-height 10px
          color #d4d6d9
          padding-top 3px
          &.active
            color rgb(77,85,93)
      .name
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
        margin-bottom 8px
      .seller-star
        vertical-align top
        display inline-block
        margin-right 8px
        padding 1px 0 17px 0
      .ratingCount,.sellCount
        vertical-align top
        display inline-block
        font-size 10px
        line-height 18px
        color rgb(77,85,93)
      .ratingCount
        margin-right 12px
      .block-wrap
        display flex
        border-top 1px solid rgba(7,17,27,0.1)
        .block
          flex 1
          margin  18px 0 0 0
          text-align center
          border-right 1px solid rgba(7,17,27,0.1)
          &:last-child
            border-right none
          h2
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            margin-bottom 4px
          .des
            font-size 24px
            line-height 24px
            color rgb(7,17,27)
            .unit
              font-size 12px
    .announcement
       position relative
       padding 18px 18px 0 18px
       font-size 0
      .name1
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
        margin-bottom 8px
      .notice
        font-size 12px
        line-height 24px
        font-weight 200
        color rgb(240,20,20)
        padding-left 12px
        border-1px rgba(7,17,27,0.1)
        padding-bottom  16px
      .supports
        .support-item
          border-1px rgba(7,17,27,0.1)
          font-size 0
          padding 16px 12px
          &:last-child
            margin-bottom 0
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
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .txt
            font-size 16px
            line-height 12px
            font-weight 200
            color rgb(7,17,27)

    .pics
      padding 18px 0 0 18px
      margin-bottom 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
        margin-bottom 12px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
    .info
      padding 18px 18px 0 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
        padding-bottom 12px
        border-1px(rgba(7,17,27,0.1))
      .info-item
        padding 16px 12px
        font-size 12px
        line-height 16px
        font-weight 200
        color rgb(7,17,27)
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
</style>
