<template>
  <div class="control">
    <transition name="scroll">
      <div class="cart-desc icon-remove_circle_outline" v-show="food.count >0"@click.stop.prevent="decrease"></div>
    </transition>
       <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="add"></div>
  </div>
</template>
<script>
import Vue from 'vue';
  export default{
    props:{
      food:{
                 type:Object,
                 default:{}
               }
    },created(){

    },methods:{
      add(event){
      if(!event._constructed){
        return;
      }
        if(!this.food.count){
          Vue.set(this.food,"count",1);
        }else{
          this.food.count++;
          console.log(this.food.count);
        }
        this.$emit('add-cart',event.target);
      },
      decrease(){
        if(this.food.count>0){
          this.food.count--;
        }
      }
    }
  }
</script>
<style scoped>
.control{
  font-size:0;
}
.cart-count{
  font-size:10px;
    line-height:24px;
    color:rgb(147,153,159);
    display:inline-block;
   text-align:center;
   vertical-align:top;
   padding-top:6px;
}
.cart-desc,.cart-add{
   display:inline-block;
   padding:6px;
       color:rgb(0,160,220);
         font-size:24px;
         line-height:24px;
}
.cart-add{
   display:inline-block;

}
.scroll-enter-active, .scroll-leave-active{
  transition: all 0.5s ease;
 opacity:1;
 transform:rotate3d(0);
 }
.scroll-enter, .scroll-leave-active{
  opacity: 0;
  transform:rotate3d(180deg);}
</style>
