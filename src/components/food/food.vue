<template>
  <transition name="move">
    <div class="food" v-show="show" ref="food">
      <div class="food-content">
         <div class="header-content">
           <img :src="food.image"  alt="图片">
           <div class="back" @click="hide">
             <i class="icon-arrow_lift"></i>
           </div>
         </div>
         <div class="content">
           <h1 class="title">{{food.name}}</h1>
           <div class="detail">
             <span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
           </div>
           <div class="price">
             <span class="new">￥{{food.price}}</span>
             <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
           </div>
           <div class="carControl-wrap">
             <car-control :food="food"></car-control>
           </div>
           <transition name="fade">
             <div class="shopCar" v-show="food.count===0||!food.count" @click="buy">
               <span class="add">加入购物车</span>
             </div>
           </transition>
         </div>
        <div class="split-wrap" v-show="food.info">
          <split></split>
        </div>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h2 class="title">商品评价</h2>
          <rating-select :only-content="onlyContent" :ratings="food.ratings" :des="des" :select-type="selectType" @myselect="mySelect" @myOnly="myOnly"></rating-select>
        </div>
        <div class="rating-wrap">
          <ul v-show="food.ratings&&food.ratings.length">
            <li v-for="rating in food.ratings" class="everyRating border-1px" v-show="needShow(rating.rateType,rating.text)">
              <div class="user">
                <span class="userName">{{rating.username}}</span>
                <img :src="rating.avatar" width="12" height="12" class="avatar">
              </div>
              <div class="rateTime">
                <span ref="time">{{rating.rateTime | formaDate}}</span>
              </div>
              <div class="thumb-wrap" v-show="rating.text">
                <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':'rating.rateType===1'}" class="icon"></i><span class="txt">{{rating.text}}</span>
              </div>
            </li>
          </ul>
          <div class="evaluate" v-show="!food.ratings|| !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
   import BScroll from 'better-scroll';
   import Vue from 'vue';
   import carControl from '../carcontrol/carcontrol.vue';
   import split from '../split/split.vue';
   import ratingSelect from '../ratingSelet/ratingSelect.vue';
   import {formaDate} from '../../common/js/date';
   const All = 2;
    export default {
        props: {
          food: {
             type: Object
           }
        },
       data () {
          return {
             show: false,
             selectType: All,
             onlyContent: true,
             des: {
                positive: '推荐',
                negative: '吐槽',
                all: '全部'
             },
             myType: All
          };
       },
       methods: {
        mySelect (v) {
          this.selectType = v;
          this.$nextTick(() => {
             this.scroll.refresh();
          });
        },
         myOnly (v) {
           this.onlyContent = v;
           this.$nextTick(() => {
             this.scroll.refresh();
           });
         },
         needShow (type, text) {
            if (this.onlyContent && !text) {
                return false;
            } else if (this.selectType === All) {
                return true;
            } else {
                return type === this.selectType;
            }
         },
          clickFood () {
             this.show = true;
             this.onlyContent = false;
             this.selectType = All;
             this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
             });
          },
        hide () {
          this.show = false;
        },
        buy (e) {
           if (e._constructed) {
              return;
           }
          this.$emit('add', e.target);
          Vue.set(this.food, 'count', 1);
        }
      },
      filters: {
        formaDate (time) {
          let date = new Date(time);
          return formaDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      components: {
        carControl,
        split,
        ratingSelect
      }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/minix.styl'
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    background #fff
    width: 100%
    transform translate3d(0,0,0)
    &.move-enter-active,&.move-leave-active
      transition all .8s
    &.move-enter, &.move-leave-to
      transform translate3d(100%,0,0)
    .header-content
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        left 0
        top 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        i
          font-size 20px
          padding 10px
          color #ff1f67
    .content
      position relative
      margin 18px
      .title
        font-size 14px
        line-height 14px
        font-weight 700
        margin  0 0 8px 0
        color rgb(7,17,27)
      .detail
        font-size 10px
        line-height 10px
        color rgb(147,153,159)
        .sellCount
          margin-right 12px
      .price
        margin 18px 0
        .new
          font-size 14px
          line-height 24px
          font-weight 700
          color rgb(240,20,20)
        .old
          font-size 10px
          line-height 24px
          font-weight 700
          color rgb(147,153,159)
          text-decoration line-through
      .carControl-wrap
        position absolute
        right 0
        bottom -6px
      .shopCar
        position absolute
        right 0
        bottom 0
        z-index 10
        height 24px
        border-radius 12px
        font-size 10px
        line-height 23px
        color rgb(255,255,255)
        background-color rgb(0,160,220)
        text-align center
        opacity 1
        transform translate3d(0,0,0)
        .add
          display inline-block
          padding 0px 12px
        &.fade-enter-active,&.fade-leave-active
          transition all .5s
        &.fade-enter, &.fade-leave-to
          opacity 0
          transform translate3d(-100%,100%,0)
    .info
      margin 18px
      .title
        line-height 14px
        font-size 14px
        margin-bottom 6px
        color rgb(7,17,27)
      .text
        font-size 12px
        line-height 24px
        font-weight 700
        color rgb(77,85,93)
    .rating
      padding-top 18px
      .title
        margin-left 18px
    .rating-wrap
      margin 0 18px 18px 18px
      .everyRating
        position relative
        border-1px rgba(7,17,27,0.1)
        .rateTime
          padding 16px 0 6px 0
          font-size 10px
          line-height 12px
          color rgb(147,153,159)
        .user
          position absolute
          right 0
          top 16px
          .userName
            display inline-block
            vertical-align top
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
            margin-right 6px
        .thumb-wrap
          font-size 0
          .icon
            display inline-block
            font-size 12px
            line-height 24px
            color rgb(147,153,159)
            margin-right 4px
            vertical-align top
            &.icon-thumb_up
              color rgb(0,160,220)
          .txt
            display inline-block
            font-size 12px
            line-height 23px
            color rgb(7,17,27)
            vertical-align top
      .evaluate
        font-size 12px
        line-height 24px
        color rgb(75,85,93)
</style>
