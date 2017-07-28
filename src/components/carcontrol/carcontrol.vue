<template>
   <div class="carControl">
     <transition name="fade">
       <div class="car-reduce " v-show="food.count>0" @click.stop.prevent="reduce">
         <span class="inner icon-remove_circle_outline"></span>
       </div>
     </transition>
     <div class="car-count" v-show="food.count>0">{{food.count}}</div>
     <div class="car-add icon-add_circle" @click.stop.prevent="shopCart"></div>
   </div>
</template>

<script>
  import Vue from 'vue';
    export default {
       props: {
         food: {
           type: Object
         }
       },
      created () {
      },
      methods: {
        shopCart (e) {
           if (!e._constructed) {
              return;
           }
           if (!this.food.count) {
             Vue.set(this.food, 'count', 1);
           } else {
             this.food.count++;
           }
          this.$emit('add', event.target);
        },
        reduce (e) {
          if (!e._constructed) {
            return;
          }
          this.food.count--;
        }
      }
    };
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .carControl
    font-size 0
    .car-reduce,.car-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
    .car-count
      font-size 10px
      display inline-block
      line-height 24px
      vertical-align top
      text-align center
      padding-top 6px
    .car-reduce
      color rgb(0,160,220)
      transition all 0.4s linear
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.fade-enter-active,&.fade-leave-active
        transition: all 0.4s linear
      &.fade-enter,&.fade-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .car-add
      color rgb(0,160,220)
</style>
