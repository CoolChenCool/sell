<template>
  <div class="rating" ref="rating">
    <div class="rating-content">
      <div class="overView">
        <div class="view-left">
          <h1 class="score">{{chSeller.score}}</h1>
          <p class="comprehensive">综合评分</p>
          <div class="above">高于周边商家{{chSeller.rankRate}}%</div>
        </div>
        <div class="view-right">
          <div class="score-wrap">
            <span class="server">服务态度</span>
            <div class="serverScore">
              <star :size="36" :score="chSeller.serviceScore"></star>
            </div>
            <span class="score">{{chSeller.serviceScore}}</span>
          </div>
          <div class="score-wrap">
            <span class="server">服务态度</span>
            <div class="serverScore">
              <star :size="36" :score="chSeller.serviceScore"></star>
            </div>
            <span class="score">{{chSeller.serviceScore}}</span>
          </div>
          <div class="arrive-wrap">
            <span class="arrive">送达时间</span>
            <span class="deliveryTime">{{chSeller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :ratings="ratings" :onlyContent="onlyContent" :des="des" :selectType="selectType" @myselect="myselect" @myOnly="myOnly"></rating-select>
      <div class="rating-wrap">
        <ul>
          <li v-for="rating in ratings" class="list-rating border-1px" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="用户图像" width="28" height="28">
            </div>
            <div class="list-right">
              <div class="name">{{rating.username}}</div>
              <div class="ratingStar">
                <star :size="24" :score="rating.score"></star>
              </div>
              <div class="deliveryTime" v-show="rating.deliveryTime">
                {{rating.deliveryTime}}分钟送达
              </div>
              <div class="text" v-show="rating.text">
                {{rating.text}}
              </div>
              <div class="recommend" v-show="rating.recommend.length">
                <i class="icon-thumb_up"  v-show="rating.rateType===0"></i>
                <i class="icon-thumb_down"  v-show="rating.rateType===1"></i>
                <span v-for="lable in rating.recommend">
                  <span class="lable border-1px">{{lable}}</span>
                </span>
              </div>
            </div>
            <div class="rateTime">
              {{rating.rateTime | formaDate}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import {formaDate} from '../../common/js/date';
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import ratingSelect from '../ratingSelet/ratingSelect.vue';
  import shopCart from '../shopCart/shopcart.vue';
  const All = 2;
  const ERR_OK = 0;
    export default {
       props: {
         chSeller: {
            type: Object
          }
       },
      data () {
        return {
          ratings: [],
          onlyContent: false,
          selectType: All,
          des: {
            positive: '推荐',
            negative: '吐槽',
            all: '全部'
          }
        };
      },
      components: {
        star,
        split,
        ratingSelect,
        shopCart
      },
      filters: {
        formaDate (time) {
          let date = new Date(time);
          return formaDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      created () {
         this.$http.get('/api/ratings').then((response) => {
             response = response.body;
             if (response.errno === ERR_OK) {
                 this.ratings = response.data;
                 this.$nextTick(() => {
                     this._initScroll();
                 });
             }
         }, response => {
             console.log(response);
         });
      },
      methods: {
        _initScroll () {
         this.scroll = new BScroll(this.$refs.rating, {
             click: true
         });
        },
        myOnly (v) {
          this.onlyContent = v;
           this.$nextTick(() => {
             this.scroll.refresh();
           });
        },
        myselect (v) {
          this.selectType = v;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        needShow (type, txt) {
           if (!txt && this.onlyContent) {
             this.onlyContent = true;
             return false;
           } else if (this.selectType === All) {
              return true;
           } else {
             return type === this.selectType;
           }
        }
      }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/minix.styl';
  .rating
    position absolute
    top 174px
    left 0
    width 100%
    bottom 0
    overflow hidden
    .overView
      display flex
      padding 18px 0
      .view-left
        flex 0 0 137px
        width 137px
        border-right 1px solid rgba(7,17,27,0.2)
        text-align center
        padding 6px 0
        @media only screen and (max-width 320px)
          flex 0 0 110px
          width 110px
        .score
          font-size 24px
          line-height 28px
          color rgb(255,153,0)
        .comprehensive
          font-size 12px
          line-height 12px
          color rgb(7,17,27)
          padding 6px 0 8px 0
        .above
          font-size 10px
          line-height 10px
          color rgb(147,153,159)
      .view-right
        flex 1
        padding 6px 24px
        @media only screen and (max-width 320px)
          padding 6px 10px
        .score-wrap
          padding-bottom 8px
          font-size 0
          .server
            display inline-block
            vertical-align top
            font-size 12px
            line-height 18px
            color rgb(7,17,27)
          .serverScore
            display inline-block
            vertical-align top
            margin 0 12px
            padding-top 2px
          .score
            font-size 12px
            line-height 18px
            color rgb(255,153,0)
            display inline-block
            vertical-align top
        .arrive-wrap
          font-size 0
          .arrive
            display inline-block
            font-size 12px
            line-height 18px
            color rgb(7,17,27)
            margin-right 12px
          .deliveryTime
            display inline-block
            font-size 12px
            line-height 18px
            color rgb(147,153,159)
    .list-rating
      position relative
      display flex
      padding 18px
      border-1px(rgba(7,17,27,0.1))
      .avatar
        margin-right 12px
      .list-right
        .name
          font-size 10px
          color rgb(7,17,27)
          line-height 12px
        .ratingStar
          display inline-block
          margin 4px 6px 6px 0
        .deliveryTime
          display inline-block
          font-size 10px
          color rgb(147,153,159)
          line-height 12px
          font-weight 200
        .text
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
        .recommend
          padding 8px 0 0 0
          .icon-thumb_up,.icon-thumb_up
            font-size 12px
            line-height 16px
          .icon-thumb_up
            margin-right 8px
            color rgb(0,160,220)
          .icon-thumb_down
            color rgb(183,187,191)
          .lable
            margin-right 8px
            border-1px(rgba(7,17,27,0.1))
            border-radius 2px
            background-color #fff
            font-size 9px
            line-height 16px
            color rgb(147,153,159)
            padding 6px
      .rateTime
        position absolute
        right 18px
        top 18px
        font-size 10px
        line-height 12px
        color rgb(147,153,159)
        font-weight 200
</style>
