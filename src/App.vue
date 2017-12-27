<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
        <ul>
          <router-link v-for='item in tabList' :to={path:item.path} tag="li" active-class="active" >{{item.name}}</router-link>
        </ul>
    </div>
    <div class="containner">
       <keep-alive>
             <router-view :seller="seller" keep-alive></router-view>
           </keep-alive>
    </div>
  </div>
</template>

<script>
import  Header from './components/header/header'
import {urlParse} from './common/js/util';
export default {
  components:{
    VHeader:Header
  },data() {
    return{
      seller:{
       // id:queryParam
      },
      tabList:[{
        name:'商品',
        path:'/goods'
      },{
        name:'商家',
        path:'/seller'
      },{
        name:'评价',
        path:'/ratings'
      }]
    }
  },
  created(){
    this.$http.get('/api/seller').then(function(res){
      this.seller=res.body.data;
    })
  }
/*  methods:{
    queryParam(){
              let queryParamd=urlParse();
               console.log(queryParamd);
              return queryParam.id;
            }
  }*/
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-weight:200;
  line-height:1;
}

.tab ul{
  display:flex;
  justify-content:space-around;
  height:40px;
  line-height:40px;
}
.tab{position: relative;border-bottom: none !important;}
.tab:after{
       content: " ";
       position: absolute;
       left: 0;
       bottom: 0;
       width: 100%;
       height: 1px;
       background-color: #D5D5D6;
       -webkit-transform-origin: 0 0;
       -ms-transform-origin: 0 0;
       transform-origin: 0 0;
       -webkit-transform: scaleY(0.5);
       -ms-transform: scaleY(0.5);
}
.tab ul li{
  font-size:20px;
  line-height:40px;
  }

.tab ul li.active{
  color:rgb(240,20,20)
}
</style>
