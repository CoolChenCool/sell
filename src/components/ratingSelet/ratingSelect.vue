<template>
   <div class="ratingSelect">
     <div class="ratingType border-1px">
       <span @click="select(2,$event)" class="all" :class="{'active':mySelect===2}">{{des.all}}<span class="count">{{ratings.length}}</span></span>
       <span @click="select(0,$event)" class="positive" :class="{'active':mySelect===0}">{{des.positive}}<span class="count">{{positives.length}}</span></span>
       <span @click="select(1,$event)" class="negative" :class="{'active':mySelect===1}">{{des.negative}}<span class="count">{{negatives.length}}</span></span>
     </div>
     <div class="onlyContent border-1px" :class="{'on':myOnly}" @click="toggleSelect">
       <i class="icon-check_circle"></i>
       <span class="txt">只看评价的内容</span>
     </div>
   </div>
</template>

<script>
  const All = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
    export default {
       props: {
         ratings: {
            type: Array,
            default () {
                return [];
            }
         },
         onlyContent: {
             type: Boolean,
             default: true
         },
         des: {
            type: Object,
            default () {
                return {
                  positive: '推荐',
                  negative: '吐槽',
                  all: '全部'
                };
            }
         },
         selectType: {
             type: Number,
             default: All
         }
       },
      data () {
         return {
             mySelect: this.selectType,
             myOnly: this.onlyContent
         };
      },
      computed: {
         positives () {
            return this.ratings.filter((rating) => {
               return rating.rateType === POSITIVE;
            });
         },
         negatives () {
           return this.ratings.filter((rating) => {
             return rating.rateType === NEGATIVE;
           });
         }
      },
       methods: {
         select (type, e) {
            if (!e._constructed) {
                return;
            }
           this.mySelect = type;
           this.$emit('myselect', this.mySelect);
         },
         toggleSelect (e) {
           if (!e._constructed) {
             return;
           }
           this.myOnly = !this.myOnly;
           this.$emit('myOnly', this.myOnly);
         }
       }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/minix.styl";
  .ratingSelect
    .ratingType
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7,17,27,0.2))
      font-size 0
      .all,.positive,.negative
        display inline-block
        font-size 12px
        color rgb(77,85,93)
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        line-height 16px
        .count
          font-size 8px
          margin-left 2px
      .all
        background-color rgba(0,160,220,0.2)
        &.active
          color #fff
          background-color rgb(0,160,220)
      .positive
        background-color rgba(0,160,220,0.2)
        &.active
          background-color rgb(0,160,220)
          color #fff
      .negative
        background-color rgba(77,85,93,0.2)
        &.active
          background-color rgb(0,160,220)
          color #fff

  .onlyContent
    padding 12px 18px
    font-size 0
    border-1px(rgba(7,17,27,0.2))
    &.on
      .icon-check_circle
        color #366cad
    .icon-check_circle
      font-size 24px
      line-height 24px
      color rgb(147,153,159)
      display inline-block
      vertical-align top
      margin-right 4px
    .txt
      font-size 12px
      line-height 24px
      color rgb(147,153,159)
      display inline-block
      vertical-align top
</style>
