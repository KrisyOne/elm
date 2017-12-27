<template>
<div>
    <div class="shopCart" >
      <div class="content-detail"@click="toggle">
        <div class="content-left">
          <div class="logo-wrapper" >
            <div class="logo" :class="{'highLog':totalCount>0}">
              <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}" >{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass"> {{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
          <div v-for="ball in balls" v-show="ball.show" class="ball" transition="drop">
            <div class="inner inner-hook">

            </div>
          </div>
      </div>
      <transition name="lift">
      <div class="cart-wrapper" v-show="listShow"  >
          <div class="list-header">
              <h2 class="list-title" >购物车</h2>
              <span class="clear" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="cartScroll">
             <ul>
                <li class="list" v-for="food in selectFoods" >
                     <span class="menu">{{food.name}}</span>
                     <div class="list-detail">
                        <span class="list-price">￥{{food.count*food.price}}</span>
                     </div>
                      <div class="list-control">
                            <cart-control :food="food"></cart-control>
                      </div>
                </li>
             </ul>
          </div>
      </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hide"></div>
    </transition>
</div>
</template>
<script>
import cartControl from '../cartcontroll/cartcontroll';
import BScroll from 'better-scroll';
export default{
components:{
  cartControl
},
data(){
  return{
    isShow:false,
    fold:true,
    balls:[{
      show:false
    },{
            show:false
          },{
                  show:false
                },{
                        show:false
                      },{
                              show:false
                            }
    ],
    dropBall:[]
  }
},

   props:{
   selectFoods:{
    type:Array,
    default(){
      return [];
    }
   },
      deliveryPrice:{
        type:Number,
        default:0
      },
      minPrice:{
         type:Number,
         default:0
      }
    },
    computed:{
    listShow(){
      if(!this.totalCount){
        this.fold=true;
        return false;
      }
      let isShow=!this.fold;
      if(isShow){
        this.$nextTick(()=>{
        if(!this.cartScroll){
            this.cartScroll=new BScroll(this.$refs.cartScroll,{click:true});
            }else{
              this.cartScroll.refresh();
            }
          })
      }
      return isShow;

    },
      totalPrice(){
        let total=0;
        this.selectFoods.forEach((food)=>{
          total+=food.price*food.count
        })
        return total;
      },totalCount(){
                let count=0;
                this.selectFoods.forEach((food)=>{
                  count+=food.count
                })
                return count;
              },
     payDesc(){
        if(this.totalPrice===0){
          return `￥${this.minPrice}元起送`;
        }else if(this.totalPrice<this.minPrice){
          let diff=this.minPrice-this.totalPrice;
          return `还差￥${diff}元起送`;
        }else{
          return '去结算'
        }
     },
     payClass(){
      if(this.totalPrice<this.minPrice){return 'not-enough';}else return 'enough'
     }
    },
    methods:{
      drop(el){
        console.log(el);
        for(let i=0;i<this.balls.length;i++){
          let ball=this.balls[i];
          if(!ball.show){
            ball.show=true;
            ball.el=el;
            this.dropBall.push(ball);
            return;
          }
        }
      },
      toggle(){
        if(!this.totalCount){
          return;
        }
        this.fold=!this.fold;
        console.log(this.totalCount,'s')
      },
  empty(){
    this.selectFoods.forEach((food)=>{
      food.count=0;
    })
  },pay(){
    if(this.totalPrice<this.minPrice){
      return;
    }
    window.alert(`支付${this.totalPrice}元`);
  },hide(){this.fold=true;},
      transitions:{
        drop:{
          beforeEnter(el){
            let count=this.balls.length;
            while(count--){
              let ball=this.balls[count];
              if(ball.show){
                let rect =ball.el.getBoundingClientRect();
                let x=rect.left-32;
                let y=-(window.innerHeight-rect.top-22);
                el.style.display='';
                el.style.webKitTransform=`translate3d(0,${y}px,0)`;
                               el.style.transform=`translate3d(0,${y}px,0)`;
                            let inner=el.getElementsByClassName('inner-hook')[0];
                            inner.style.webKitTransform=`translate3d(${x}px,0,0)`;
                            inner.style.transform=`translate3d(${x}px,0,0)`;
                            console.log('d');
              }
            }
          },
          enter(el){
            let rf=el.offsetHeight;
            this.$nextTick(()=>{
               el.style.webKitTransform='translate3d(0,0,0)';
               el.style.transform='translate3d(0,0,0)';
               let inner=el.getElementsByClassName('inner-hook')[0];
                        inner.style.webKitTransform='translate3d(0,0,0)';
                        inner.style.transform='translate3d(0,0,0)';
                        console.log('ds');
            })
          },
          afterEnter(el){
            let ball=this.dropBall.shift();
            if(ball){
              ball.show=false;
              el.style.display="none";
              console.log('sd');
            }
          }
        }
      }
    }
}
</script>
<style scoped>
.list-mask{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:34;
  filter:blur(10px);
    background:rgba(7,17,27,.6);
}
.fade-transition{
    background:rgba(7,17,27,.6);
    opacity:1;
}
.fade-enter,.fade-leave{
 background:rgba(7,17,27,0);
     opacity:0;
}
.lift-transition{
  transition:all .4s;
  transform:translate3d(0,-100%,0)
}
.lift-enter,.lift-leave{
  transition:all .4s;
    transform:translate3d(0,0,0)
}
.cart-wrapper{
  position:absolute;
  top:-194px;
  width:100%;
  max-height:305px;
  z-index:-8;

}
.list-header{
  background:#f3f5f7;
    height:40px;
    width:100%;
    border-bottom:1px solid rgba(7,17,27,.1);
}
.list-header .list-title{
  font-size:14px;
  font-weight:200;
  color:rgb(7,17,27);
  line-height:40px;
  float:left;
  margin-left:18px;
}
.clear{
  float:right;
  font-size:12px;
  color:rgb(0,160,220);
  line-height:40px;
   margin-right:18px;
}
.list-content{
  background:#fff;
  max-height:155px;
 overflow:hidden;
 float:clear;
 clear:both;

}
.list{
  height:48px;
  line-height:48px;
  position:relative;
    padding:0 36px;
      border-bottom:1px solid rgba(7,17,27,.1);
}
.menu{
  line-height:24px;
  font-size:14px;
  color:rgb(7,17,27);
}
.list-detail{
  position:absolute;
  right:60px;
  top:0;
  margin-right:18px;
  padding:0 24px;
}
.list-price{
  font-size:14px;
  color:rgb(240,20,20);
  line-height:24px;
  margin:0 24px 0 36px;
}
.list-control{
  display:inline-block;
  line-height:48px;
  height:48px;
  position:absolute;
  top:5px;
  right:36px;
}
  .shopCart{
    position:fixed;
    left:0;
    bottom:0;
    z-index:50;
    width:100%;
    height:48px;
    background:rgba(0,0,0,.2);
  }
  .content-detail{
    display:flex;
    background:#141d27;
    font-size:0;
  }
  .content-left{
    flex:1;
  }
  .content-right{
    flex:0 0 105px;
    width:105px;
  }
  .logo-wrapper{
    display:inline-block;
    position:relative;
    top:-10px;
    margin:0 12px;
    padding:6px;
    width:56px;
    height:56px;
    box-sizing:border-box;
    vertical-align:top;
    border-radius:50%;
     background:#141d27;
  }
  .num{
    position:absolute;
    top:0;
    right:0;
    width:24px;
    height:16px;
    line-height:16px;
    text-align:center;
    border-radius:16px;
    font-size:9px;
    font-weight:700;
    color:#fff;
    background:rgb(240,20,20);
    box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
  }
  .logo{
    width:100%;
    height:100%;
     border-radius:50%;
    background:#2b343c;  text-align:center;
  }
 .highLog{
    background:rgb(0,160,220);
  }
.icon-shopping_cart{
  font-size:24px;
  color:#80858a;
  line-height:44px;
}
 .highlight{color:#fff;}
  .price{display:inline-block;
      font-size:16px;
      color:#80858a;
      line-height:24px;
      font-weight:700;
      margin-top:12px;
      box-sizing:border-box;
      padding-right:12px;
      border-right:1px solid rgba(255,255,255,.1);
  }
  .desc{display:inline-block;
    line-height:24px;
    margin:12px 0 0 12px;
    font-size:10px;
    color:rgba(255,255,255,.4);
  }
  .content-right{
    width:105px;

  }
  .pay{
     font-size:12px;
      font-weight:700;
        font-size:12px;
        height:48px;
        line-height:48px;
       color:rgba(255,255,255,.4);
       text-align:center;

  }
  .ball{
    position:fixed;
    left:32px;
    bottom:22px;
    z-index:200;
  }
  .drop-transition{transition:all .4s cubic-bezier(.49,-0.29,.75,.41);}
  .inner{width:16px;height:16px;border-radius:50%;background:rgb(0,160,220);transition:all .4s;}
  .not-enough{background:#2b333b;}
  .enough{background:#00b43c;color:#fff;}
</style>
