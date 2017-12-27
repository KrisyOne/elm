<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
           <li class="block">
             <h2>商家配送</h2>
             <div class="content">
               <span class="stress">{{seller.deliveryPrice}}</span>元
             </div>
           </li>
            <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFav">
            <span class="icon-favorite" :class="{'active':favorite}"></span>
            <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split ></split>
      <div class="bulletin">
        <h1 class="title">活动与公告</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
         <ul class="supports" v-if="seller.supports">
                     <li v-for="(item,index) in seller.supports" class="support-item">
                                 <span class="icon" :class="classMap[item.type]"></span>
                                 <span class="description">{{item.description}}</span>
                     </li>
         </ul>
      </div>
      <split ></split>
      <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
                 <li class="pic-item" v-for="pic in seller.pics">
                      <img :src="pic" width="120" height="90"/>
                 </li>
            </ul>
          </div>
      </div>
      <split></split>
      <div class="info">
          <h1 class="title">商家信息</h1>
          <ul>
              <li class="info-item" v-for="info in seller.infos">{{info}}</li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import star from '../star/star';
import split from '../split/split';
  export default{
  components:{star,split},
  props:{
    seller:{
      type:Object
    }
  },
    data(){
      return{
        favorite:false
      }
    },
    computed:{
      favoriteText(){
        return this.favorite?'已收藏':'收藏'
      }
    },
    created() {
        this.classMap=['decrease','discount','special','invoice','guarantee'];
      },
      methods:{
        toggleFav(event){
           if(!event._constructed){
                    return;
                  }
           this.favorite=!this.favorite;
        }
      },
   mounted(){
      console.log(this.seller)
      this.scroll=new BScroll(this.$refs.seller,{click:true,scrollY:true})
       if(this.seller.pics){
                let picWidth=120;
                let margin=6;
                let width=(picWidth+margin)*this.seller.pics.length-margin;
                this.$refs.picList.style.width=width+'px';
              this.$nextTick(()=>{
                  this.picScroll=new BScroll(this.$refs.picWrapper,{
                    scrollX:true,
                    startX:0,
                    bounce:true
                  })
                })
              }
    }
  }
</script>
<style scoped>
.seller{
    position:absolute;
    top:174px;
    left:0;
    bottom:0;
    width:100%;
    overflow:hidden;
}
.overview{
  padding:18px;
  position:relative;
}
.favorite{
  position:absolute;
  top:18px;
  right:11px;
  text-align:center;
  width:50px;
}
.icon-favorite{
  display:block;
  margin-bottom:4px;
  color:#d4d6d9;
  line-height:24px;
  font-size:24px;
}
.favorite .text{
  line-height:10px;
  color:rgb(77,25,93);
  margin:0;
}
.active{
  color:rgb(240,20,20);
}
.title{
  font-size:14px;
  line-height:14px;
  margin-bottom:8px;
  color:rgb(7,17,27);
}
.desc{
  padding-bottom:18px;

  font-size:0;
  border-bottom:1px solid rgba(7,17,27,.1);
}
.star{
  display:inline-block;
  vertical-align:top;
  margin-right:8px;
}
.text{
   display:inline-block;
    vertical-align:middle;
   margin-right:12px;
   font-size:10px;
   color:rgb(77,85,93);
   line-height:18px;
}
.remark{
  display:flex;
  padding-top:18px;
}
.remark .block{
  flex:1;
  text-align:center;
  border-right:1px solid rgba(7,17,27,.1);
  padding:8px 0;
}
.remark .block:last-child{
  border:none;
}
h2{
  font-size:10px;
  margin-bottom:4px;
  line-height:10px;
  color:rgb(147,153,159);
}
.content{
  line-height:24px;
  font-size:10px;
  color:rgb(147,153,159);
  margin:0;
}
.stress{
  font-size:24px;
  color:rgb(7,17,27);
}
.bulletin{
  padding:18px 18px 0 18px;
}
.bulletin .title{
    font-size:14px;
    line-height:14px;
    margin-bottom:8px;
    color:rgb(7,17,27);
}
.content-wrapper{
  padding:0 12px 16px 12px;
  border-bottom:1px solid rgba(7,17,27,.1);
}
.content-wrapper .content{
  line-height:24px;
  font-size:12px;
  color:rgb(240,20,20);
}
.supports .support-item{
  padding:16px 12px;
   border-bottom:1px solid rgba(7,17,27,.1);
   font-size:0;
}
.supports .support-item:last-child{
  border:none;
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
   background-image:url('decrease_4@3x.png');
 }
 .discount{
   background-image:url('discount_4@3x.png');
 }
 .invoice{
   background-image:url('invoice_4@3x.png');
 }
  .guarantee{
    background-image:url('guarantee_4@3x.png');
  }
   .special{
     background-image:url('special_4@3x.png');
   }
.supports .text{
   line-height:16px;
   font-size:12px;
   }
.pics{
  padding:18px;
}
.pics .title{
    font-size:14px;
    line-height:14px;
    margin-bottom:12px;
    color:rgb(7,17,27);
}
.pic-wrapper{
  width:100%;
  overflow:hidden;
  white-space:nowrap;
}
.pic-list{
  font-size:0;
}
.pic-item{
  display:inline-block;
  margin-right:6px;
  width:120px;
  height:90px;
}
.pic-item:last-child{
  margin:0;
}
.info{padding:18px 18px 0 18px;color:rgb(7,17,27);}
.info .title{
  padding-bottom:12px;
  border-bottom:1px solid rgba(7,17,27,.1);
  line-height:14px;
  font-size:14px;
}
.info-item{
  padding:16px 12px;
  font-size:12px;
   border-bottom:1px solid rgba(7,17,27,.1);
   line-height:16px;
}
.info-item:last-child{border:none;}
</style>
