<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectedType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectedType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectedType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch">
    <span class="icon-check_circle" :class="{'on':showContent}"></span>
        <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const POSITIVE=0;
 const NEGATIVE=1;
 const ALL=2;
  export default{
  data(){
    return {
      showContent:false,
      selectedType:2
    }
  },
    props:{
      ratings:{
        type:Array,
        default(){ return [];}
      },
      selectType:{
        type:Number,
        default:ALL
      },
      onlyContent:{
        type:Boolean,
        default:false
      },
      desc:{
        type:Object,
        default(){
          return {
            all:'全部',
            positive:'满意',
            negative:'不满意'
          }
        }
      }
    },
    created(){console.log(this.selectType)},
    computed:{
      positives(){
        return this.ratings.filter((rating)=>{
          return rating.rateType===POSITIVE;
        })
      },
       negatives(){
              return this.ratings.filter((rating)=>{
                return rating.rateType===NEGATIVE;
              })
            }
    },
    methods:{
      select(type,event){
        if(!event._constructed){return;}
        this.selectedType=type;
        this.$emit('ratingSelect',type);
        console.log("select")
      },
      toggleContent(event){
          if(!event._constructed){return;}
          this.showContent=!this.showContent;
          console.log(this.showContent);
           this.$emit('ContentToggle',this.showContent);
      }
    }
  }
</script>
<style>
.switch{
  padding:12px 18px;
  line-height:24px;
  border-bottom:1px solid rgba(7,17,27,.1);
  color:rgb(147,153,159);
  font-size:0;
}
.switch .icon-check_circle{
  display:inline-block;
  vertical-align:top;
  font-size:24px;
  margin-right:4px;
}
.on.icon-check_circle{
  color:#00c850;
}
.switch .text{
  font-size:12px;
  line-height:24px;
}
.ratingSelect .rating-type{
  padding:18px 0;
  margin:0 18px;
  border-bottom:1px solid rgba(7,17,27,.1);
  font-size:0;
}
.block{
  display:inline-block;
  padding:8px 12px;
  border-radius:1px;
  margin-right:8px;
  font-size:12px;
   line-height:16px;
   color:rgb(77,85,93);
}
.block.active{
  color:#fff;
}
.count{
  margin-left:2px;
  font-size:8px;
}
 .positive{
 background:rgba(0,160,220,.2);
}
.positive.active{
  background:rgb(0,160,220);

}
.negative{
 background:rgba(77,85,93,.2);
}
.negative.active{
 background:rgb(77,85,93);
}
</style>
