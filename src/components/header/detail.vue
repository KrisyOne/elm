<template>
  <div class="detail-wrapper clearfix" >
      <div class="detail-main">
          <h2 class="name">{{seller.name}}</h2>
         <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
         </div>
         <div class="title">
            <div class="line"></div>
             <div class="text">优惠信息</div>
              <div class="line"></div>
         </div>
        <ul class="support" v-if="seller.supports">
             <li v-for="(item,index) in seller.supports" class="support-item">
                         <span class="icon" :class="classMap[item.type]"></span>
                         <span class="description">{{item.description}}</span>
                     </li>
        </ul>
        <div class="title">
                    <div class="line"></div>
                     <div class="text">商家公告</div>
                      <div class="line"></div>
                 </div>
          <p class="detail-content">{{seller.bulletin}}</p>
       </div>
       <div class="detail-close" @click="DetailClose">
             <i class="icon-close"></i>
       </div>
  </div>
</template>
<script>
import VStar from '../star/star'
  export default{
  components:{
    VStar
  },
     props:{
        seller:{
          type:Object
        }
      } ,created() {
           this.classMap=['decrease','discount','special','invoice','guarantee'];
         },
         methods:{
          DetailClose(){
             this.$emit('on-close')
          }
         }
  }
</script>
<style scoped>
.detail-wrapper{
  min-height:100%;
   width:100%;
}
.detail-main{
    margin-top:64px;
    padding-bottom:64px;
    height:100%;
    width:100%;
}
.detail-main .name{
  font-size:18px;
  font-weight:700;
  color:rgb(255,255,255);
  line-height:18px;
  text-align:center;
  margin-bottom:18px;
}
.detail-close{
  position:relative;
  width:32px;
  height:32px;
  margin:30px auto 0 auto;
  font-size:32px;
  color:rgba(255,255,255,.5);
}
.star-wrapper{
  padding:2px 0;
}
.title{
  display:flex;
  width:80%;
  margin:28px auto;
}
.line{
  flex:1;
  position:relative;
  top:-6px;
  border-bottom:1px solid rgba(255,255,255,.2)
}
.text{
  padding:0 12px;
  font-size:14px;
  font-weight:700;
}
.icon{
  display:inline-block;
   vertical-align:top;
  width:16px;
  height:16px;
  margin-right:4px;
  background-size:16px 16px;

}
.decrease{
   background-image:url('decrease_1@2x.png');
 }
 .discount{
   background-image:url('discount_1@2x.png');
 }
 .invoice{
   background-image:url('invoice_1@2x.png');
 }
  .guarantee{
    background-image:url('guarantee_1@2x.png');
  }
   .special{
     background-image:url('special_1@2x.png');
   }
   .support{
      margin:0 auto;
      width:80%;
   }
   .support-item{
      padding:0 12px;
      margin-bottom:12px;
      font-size:0;
   }
    .support-item:last-child{
      margin-bottom:0;
    }
.support .description{
  font-size:12px;
  line-height:16px;
  font-weight:200;
  margin-left:12px;
  color:rgb(2555,255,255);

}
.detail-content{
  width:80%;
  margin:0 auto;
  font-size:12px;
  font-weight:200;
  color:rgb(255,255,255);
  line-height:24px;
  padding:0 12px;
}
</style>
