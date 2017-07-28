<template>
 <div class="shop">
   <div class="content" @click="toggleList">
     <div class="content-left">
       <div class="logo-wrap">
         <div class="logo" :class="{'heightLight':totalCount>0}">
           <i class="icon-shopping_cart" :class="{'heightLight':totalCount>0}"></i>
         </div>
         <div class="num" v-show="totalCount>0">{{totalCount}}</div>
       </div>
       <div class="price" :class="{'heightLight':total>0}">￥{{total}}元</div>
       <div class="des">另外需配送费{{deliveryPrice}}</div>
     </div>
     <div class="content-right">
       <div class="pay" :class="{'settlement': total >= 20}" @click.stop.prevent="pay">
         {{payDes}}
       </div>
     </div>
   </div>
   <div class="ball-content">
       <div v-for="ball in balls">
         <transition name="drop" >
           <div class="ball" v-show="ball.show">
             <div class="inner inner-hook"></div>
           </div>
         </transition>
         <div class="inner"></div>
       </div>
   </div>
   <transition name="fold">
   <div class="shopCarList" v-show="listShow">
     <div class="list-header">
       <h1 class="title">购物车</h1>
       <span class="empty" @click="empty">清空</span>
     </div>
     <div class="list-content" ref="listContent">
       <ul>
         <li class="food" v-for="food in selectFoods">
           <span class="name">{{food.name}}</span>
           <div class="price">
             <span>￥{{food.price*food.count}}</span>
           </div>
           <div class="cartcontrol-wrapper">
             <cartControl :food="food"></cartControl>
           </div>
         </li>
       </ul>
     </div>
   </div>
   </transition>
   <transition name="fade">
     <div class="list-mask" @click="hideList" v-show="listShow"></div>
   </transition>
 </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartControl from '../carcontrol/carcontrol.vue';
    export default {
      props: {
        deliveryPrice: {
          type: Number
        },
        minPrice: {
          type: Number
        },
        selectFoods: {
          type: Array,
          default () {
             return [
               {price: 10, count: 0}
             ];
          }
        }
      },
      data () {
        return {
           balls: [
             {show: false},
             {show: false},
             {show: false},
             {show: false},
             {show: false}
           ],
           dropBalls: [],
           fold: true
        };
      },
      computed: {
         total () {
           let totalPrice = 0;
           this.selectFoods.forEach((good) => {
             totalPrice += good.price * good.count;
           });
           return totalPrice;
         },
         totalCount () {
           let count = 0;
           this.selectFoods.forEach((good) => {
             count += good.count;
           });
           return count;
         },
          payDes () {
            if (this.total === 0) {
                return `￥${this.minPrice}起送`;
            } else if (this.total < this.minPrice) {
                let difference = this.minPrice - this.total;
                return `还差${difference}起送`;
            } else {
                return '结算';
            }
          },
          listShow () {
             if (!this.totalCount) {
                 this.fold = true;
                 return false;
             }
             let show = !this.fold;
            if (show) {
              this.$nextTick(() => {
                if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.listContent, {
                    click: true
                  });
                } else {
                  this.scroll.refresh();
                }
              });
            }
             return show;
          }
      },
      methods: {
        pay () {
           if (this.total < this.minPrice) {
               return;
           }
           alert(`需要支付${this.total}元`);
        },
        hideList () {
          this.fold = true;
        },
        empty () {
           this.selectFoods.forEach((food) => {
               food.count = 0;
           });
        },
         drop (el) {
           for (let i = 0; i < this.balls.length; i++) {
               let ball = this.balls[i];
               if (!ball.show) {
                   ball.show = true;
                   ball.el = el;
                   // dropBalls.push(ball);
                   return;
               }
           }
         },
        toggleList () {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        }
      },
      transition: {
        drop: {
          beforeEnter: {
          },
          enter: function (el, done) {
          },
          afterEnter: function (el) {
          }
        }
      },
      components: {
        cartControl
      }
    };

</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/minix.styl"
  .shop
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 100
    .content
      display flex
      background #141d27
      .content-left
        flex 1
        font-size 0
        .logo-wrap
          display inline-block
          position relative
          top -10px
          width 56px
          height 56px
          border-radius 50%
          margin 0 12px
          padding 6px
          box-sizing border-box
          vertical-align top
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.heightLight
              background rgb(0,160,220)
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color #80858a
              &.heightLight
                color #fff
          .num
            position absolute
            right 0
            top 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240,20,20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,0.1)
          font-size 16px
          color rgba(255,255,255,0.4)
          font-weight 700
          &.heightLight
            color #fff
            font-size 16px
        .des
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 14px
          color rgba(255,255,255,0.4)
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          text-align center
          line-height 48px
          font-size 12px
          color rgba(255,255,255,0.4)
          font-weight 700
          background #2b333b
          &.settlement
            background #00b43c
    .ball-content
     .ball
       position fixed
       left 32px
       bottom 22px
       z-index 100
       &.drop
         transition all 0.5s
         .inner
           width 16px
           height 16px
           border-radius 50%
           background rgb(0,160,220)
           transition all 0.5s
    .shopCarList
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        line-height 40px
        height 40px
        font-size 14px
        color rgb(7,17,27)
        padding 0 18px
        font-weight 200
        background #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index -2
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
