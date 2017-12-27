<template>
     <div class="header">
        <div class="content-wrapper">
          <div class="avatar">
            <img width="64" height="64" :src="seller.avatar">
          </div>
          <div class="content">
               <div class="title">
                  <span class="brand"></span>
                  <span class="name">{{seller.name}}</span>
               </div>
               <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟到达
               </div>
               <div class="support" v-if="seller.supports">
                  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                  <span class="text">{{seller.supports[0].description}}</span>
               </div>
          </div>
          <div v-if="seller.supports" class="support-count">
            <span class="count" @click="DetailShow">{{seller.supports.length}} 个</span>
            <i class="icon-keyboard_arrow_right"> </i>
          </div>
          <div class="bg-img">
            <img :src="seller.avatar" width="100%" height="100%"></img>
          </div>
        </div>
        <div class="bulletin-wrapper" @click="DetailShow">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"> </i>
        </div>
        <transition name="fade">
            <div class="detail" v-show="isDetailShow" >
                         <v-detail  :seller="seller"  @on-close="isShow"></v-detail>
                    </div>
        </transition>
      </div>


</template>
<script>
import VDetail from './detail'

  export default{
  components:{
    VDetail
  },
  props:{
    seller:{
      type:Object
    }
  },
  created() {
    this.classMap=['decrease','discount','special','invoice','guarantee'];
  },
  methods:{
    DetailShow() {
        this.isDetailShow=true;
    },
    isShow(){
        this.isDetailShow=false;
      }
  },
    data(){
      return{
        isDetailShow:false
      }
    }
  }
</script>
<style>
.header{
  background-color:rgba(7,17,27,0.5);
  color:#fff;
  position:relative;
}
.content-wrapper{
  padding:24px 12px 18px 24px;
  font-size:0;
  position:relative;
}
.avatar{
  vertical-align:top;
  display:inline-block;
}
.avatar>img{
  border-radius:2px;
}
.content{
display:inline-block;
  font-size:14px;
  margin-left:16px;
}
.title{
  margin:2px 0 8px 0;
}
.brand{
  display:inline-block;
  width:30px;
  height:18px;
  background-image:url('brand@2x.png');
  background-size:30px 18px;
  vertical-align:top;
}
.name{
  font-size:16px;
  margin-left:6px;
  line-height:18px;
}
.description{
  font-size:12px;
  margin-bottom:10px;
  line-height:12px;
}
.support .icon{
  display:inline-block;
   vertical-align:middle;
  width:12px;
  height:12px;
  margin-right:4px;
  background-size:12px 12px;

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
.text{
  font-size:12px;
  line-height:12px;
}
.support-count{
  position:absolute;
  right:12px;
  bottom:14px;
  padding:0 8px;
  height:24px;
  line-height:24px;
  border-radius:14px;
  background:rgba(0,0,0,0.2);
  color:#fff;
  text-align:center;

}
.count{
  font-size:10px;
  vertical-align:top;
}
.icon-keyboard_arrow_right{
  font-size:10px;
  line-height:24px;
  margin-left:2px;
}
.bulletin-wrapper{
  height:28px;
  line-height:28px;
  padding:4px 11px 4px 12px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  position:relative;
  background-color:rgba(7,17,27,.2);
}
.bulletin-wrapper .icon-keyboard_arrow_right{
  position:absolute;
  top:10px;
  right:12px;
  font-size:10px;
}
.bulletin-title{
  display:inline-block;
  width:22px;
  vertical-align:top;
  height:12px;
  background-image:url('bulletin@2x.png');
  background-size:22px 12px;
  margin-top:8px;
}
.bulletin-text{
  font-size:10px;
  margin: 0 4px;
}
.bg-img{
width:100%;
height:100%;
  position:absolute;
  top:0;
  left:0;
  z-index:-1;
  filter:blur(10px);
}
.detail{
  position:fixed;
  top:0;
  left:0;
  z-index:200;
  height:100%;
  width:100%;
  background-color:rgba(7,17,27,.8);
  overflow:auto;
  backdrop-filter:blur(10px);

 }
 .fade-enter-active{
    transition:all .5s;
 }
.fade-leave-active{
  opacity:1;
  background:rgba(7,17,27,.8);
}
.fade-enter,.fade-leave-to{
  opacity:0;
  background:rgba(7,17,27,0);
}

</style>
