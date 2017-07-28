<template>
   <div class="goods">
     <div class="menu-wrap" ref="menuWrap">
       <ul class="goodUl">
         <li v-for="(goodItem,index) in goods" class="goodItem" :class="{'current':getIndex===index}" @click="selectMenu(index,$event)">
           <span class="txt border-1px">
             <span class="icon" v-show="goodItem.type>0" :class="classMap[goodItem.type]"></span>{{goodItem.name}}
           </span>
         </li>
       </ul>
     </div>
     <div class="good-wrap" ref="goodWrap">
       <ul>
         <li v-for="item in goods" class="goodList goodHook">
           <h1 class="title">{{item.name}}</h1>
           <ul>
             <li v-for="food in item.foods" class="food-item border-1px"  @click="selectFood(food,$event)">
               <div class="icon">
                 <img :src="food.icon" width="57" height="57">
               </div>
               <div class="content">
                 <h2 class="name">{{food.name}}</h2>
                 <p class="desc">{{food.description}}</p>
                 <div class="extra">
                   <span class="count">月售{{food.sellCount}}</span>
                   <span v-show="food.rating">好评率{{food.rating}}%</span>
                 </div>
                 <div class="price">
                   <span class="new">￥{{food.price}}</span>
                   <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                 </div>
               </div>
               <div class="carControl-wrap">
                 <car-control :food="food" @add="add"></car-control>
               </div>
             </li>
           </ul>
         </li>
       </ul>
     </div>
     <shop-cart :deliveryPrice="chSeller.deliveryPrice" :min-price="chSeller.minPrice" :selectFoods="selected" ref="shopCart"></shop-cart>
     <food :food="selectedFood" ref="food"></food>
   </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shopCart from '../shopCart/shopcart.vue';
    import carControl from '../carcontrol/carcontrol.vue';
    import food from '../food/food.vue';
    const OK = 0;
    export default {
      props: {
        chSeller: {
          type: Object
        }
      },
      data () {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        };
      },
      computed: {
        getIndex () {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              return i;
            }
          }
          return 0;
        },
        selected () {
           let foods = [];
           this.goods.forEach((good) => {
             good.foods.forEach((food) => {
                 if (food.count) {
                   foods.push(food);
                 }
             });
           });
           return foods;
        }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$http.get('/api/goods').then(response => {
          response = response.body;
          if (response.errno === OK) {
            this.goods = response.data;
            this.$nextTick(() => {
                this._initScroll();
                this.heightScroll();
            });
          }
        });
      },
      methods: {
        add (target) {
          this._drop(target);
        },
        _drop (target) {
          this.$nextTick(() => {
            this.$refs.shopCart.drop(target);
          });
        },
        selectFood (food, e) {
          if (!e._constructed) {
            return;
          }
          this.selectedFood = food;
          this.$refs.food.clickFood();
        },
        selectMenu (index, e) {
         if (!e._constructed) {
           return;
         }
         const goodList = this.$refs.goodWrap.getElementsByClassName('goodHook');
         const goodListDom = goodList[index];
          this.goodScroll.scrollToElement(goodListDom, 300);
        },
        _initScroll () {
          this.menuScroll = new BScroll(this.$refs.menuWrap, {
              click: true
          });
          this.goodScroll = new BScroll(this.$refs.goodWrap, {
            click: true,
            probeType: 3
          });
          this.goodScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });
        },
        heightScroll () {
          let goodHeight = this.$refs.goodWrap.getElementsByClassName('goodHook');
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < goodHeight.length; i++) {
            height += goodHeight[i].clientHeight;
            this.listHeight.push(height);
          }
        }
      },
      components: {
        shopCart,
        carControl,
        food
      }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/minix.styl"
  .goods
    display flex
    position absolute
    bottom 46px
    width 100%
    top 174px
    overflow hidden
    .menu-wrap
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .goodUl
        .goodItem
          display table
          width 56px
          height 54px
          line-height 14px
          padding 0 12px
          &.current
            background #fff
            font-weight 700
            position relative
            margin-top -1px
            .txt
              border-none()
          .icon
            vertical-align top
            margin 0 2px 0 0
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
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
          .txt
            font-size 12px
            display table-cell
            width 56px
            vertical-align middle
            border-1px(rgba(7,17,27,0.2))
    .good-wrap
      flex 1
      .title
        font-size 12px
        line-height 26px
        height 26px
        padding-left 14px
        border-left  2px solid #d9dde1
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        position relative
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          padding-bottom 0px
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            font-size 14px
            line-height 14px
            margin 2px 0 8px 0
            color rgb(7,17,27)
          .desc,.extra
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            line-height 24px
            font-weight 700
            .new
              font-size 14px
              color rgb(240,20,20)
              margin-right 8px
            .old
              font-size 10px
              color rgb(147,153,159)
        .carControl-wrap
          position absolute
          right 0
          bottom 0
    .foot-wrap
      position absolute
      bottom 0
      left 0
      width 100%
      display flex
      .left
        flex 0 0 100px
        background #bd3073
      .right
        flex 1
        background #8b7a15

</style>
