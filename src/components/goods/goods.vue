<template>
  <div class="goods" v-on:cart.add="_drop(target)">
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul class="goodsList">
          <li class="menu-item"   v-for="(item,index) in goods"  @click="selectMenu(index,$event)">
            <span class="text">
              <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
    </li>
      </ul>
    </div>
    <div class="shop-wrap" ref="shopWrap">
        <ul>
            <li v-for="(item,index) in goods" class="food-list hook">
              <h1 class="food-title" :class="{'current':currentIndex===index}">{{item.name}}</h1>
              <ul>
                  <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item ">
                    <div class="iconic">
                      <img :src="food.icon" width="57"/>
                    </div>
                      <div class="food">
                                           <h2 class="name">{{food.name}}</h2>
                                           <p class="desc">{{food.description}}</p>
                                           <div class="extra">
                                              <span class="count">月售{{food.sellCount}}份</span>
                                              <span>好评率{{food.rating}}</span>
                                           </div>
                                           <div class="price">
                                              <span class="now">￥{{food.price}}</span>
                                              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                           </div>
                                           <div class="control-wrapper">
                                              <cart-control @add-cart="_drop" :food="food"></cart-control>
                                           </div>
                        </div>
                  </li>
              </ul>
            </li>
        </ul>
    </div>
    <shopCart ref="shopCart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopCart from '../shopcart/shopcart';
import cartControl from '../cartcontroll/cartcontroll';
import food from '../food/food';
export default {
components:{
  shopCart,cartControl,food
},events:{
  'cart.add':function(target){
      this._drop(target);
      console.log(target);
  }
},
 props:{
    seller:{
      type:Object
    }
  },
  data () {
    return {
    selectedFood:{},
    goods:[],
      listHeight:[],
      scrollY:0
    }
  },
  created(){
   this.classMap=['decrease','discount','special','invoice','guarantee'];
    this.$http.get('/api/goods').then((res)=>{
      this.goods=res.body.data;
      this.$nextTick(()=>{
        this._initScroll();
        this._calculateHeight();
      })
    })
  },
  computed:{
    currentIndex(){
      for(let i=0;i<this.listHeight.length;i++){
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2||(this.scrollY>=height1&& this.scrollY<=height2))
        return i;
      }
      return 0;
    },
    selectFoods(){
      let foods=[];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food);
          }
        })
      });
      return foods;
    }
  },
  methods :{
  selectFood(food,event){
    if(!event._constructed){
      return;
    }
    this.selectedFood=food;
    this.$refs.food.show();
  },
  selectMenu(index,event){
    if(!event._constructed){
      return;
    }
    let foodList=this.$refs.shopWrap.getElementsByClassName('hook');
    let el=foodList[index];
    this.foodsScroll.scrollToElement(el,300);
  },
  _drop(target){
   this.$refs.shopCart.drop(target);
    console.log(target);
  },
    _initScroll(){
      this.menuScroll=new BScroll(this.$refs.goodsWrapper,{click:true});
      this.foodsScroll=new BScroll(this.$refs.shopWrap,{
        click:true,
        probeType:3
      });
      this.foodsScroll.on('scroll',(pos) => {
        this.scrollY=Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight(){
      let foodList = this.$refs.shopWrap.getElementsByClassName('hook');
        let height=0;
        this.listHeight.push(height);
      for(let i=0;i<foodList.length;i++){
        let item=foodList[i];
        height+=item.clientHeight;
        this.listHeight.push(height);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.router-link-active{color:#F01414;}
.goods{
  overflow:hidden;
  display:flex;
  width:100%;
  position:absolute;
  bottom:46px;
  top:199px;
}
.decrease{
   background-image:url('decrease_3@2x.png');
 }
 .discount{
   background-image:url('discount_3@2x.png');
 }
 .invoice{
   background-image:url('invoice_3@2x.png');
 }
  .guarantee{
    background-image:url('guarantee_3@2x.png');
  }
   .special{
     background-image:url('special_3@2x.png');
   }
.goods-wrapper{
  flex:0 0 80px;
  width:80px;
  background:#f3f5f7;
}
.goods .shop-wrap{
  flex:1;
}
.menu-item{
  display:table;
  text-align:center;
  margin:0 auto;
  height:54px;
  width:80px;
  line-height:14px;
}
.icon{
   display:inline-block;
     vertical-align:top;
    width:12px;
    height:12px;
    background-size:12px 12px;
}
.text{
  display:table-cell;
  width:56px;
  font-size:12px;
   vertical-align:middle;}
.text,.food-item{position: relative;border-bottom: none !important;}
.text:after,.food-item:after{
       content: " ";
       position: absolute;
       left: 0;
       bottom: 0;
       width: 100%;
       height: 1px;
       background-color: rgba(7,17,27,.1);
       -webkit-transform-origin: 0 0;
       -ms-transform-origin: 0 0;
       transform-origin: 0 0;
       -webkit-transform: scaleY(0.5);
       -ms-transform: scaleY(0.5);
}
.food-title{
  padding-left:14px;
  height:26px;
  line-height:26px;
  border-left:2px solid #d9dde1;
  font-size:12px;
  color:rgb(147,153,159);
  background:#f3f5f7;
}
.food-item{
  display:flex;
  margin:18px;
  padding-bottom:18px;
}
.food-item:last-child{
  border:none;
}
.iconic{
  margin-right:10px;
  flex:0 0 57px;
}
.food{
  flex:1;
}
.name{
  font-size:14px;
  color:rgb(7,17,27);
  line-height:14px;
  margin:2px 0 8px 0;
}
.desc{
  font-size:10px;
  line-height:10px;
  color:rgb(147,153,158);
  margin-bottom:8px;
}
.extra{
  line-height:10px;
  font-size:10px;
  color:rgb(147,153,158);
}
.count{margin-right:12px;}
.price{
  font-weight:700;
  line-height:24px;

}
.now{
  margin-right:8px;
  font-size:14px;
  color:rgb(240,20,20);
}
.old{
  text-decoration:line-through;
  font-size:10px;
    color:rgb(147,153,158);
}
.current{
  position:relative;
  z-index:10;
  margin-top:-1px;
  background-color:#fff;
  font-weight:700;
}
.text{
  border:none;
}
.control-wrapper{
  position:absolute;
  right:0;
  bottom:12px;
}
</style>
