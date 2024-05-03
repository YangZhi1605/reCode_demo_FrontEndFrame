<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="#">发动机 气缸体</a>
              <div class="children">
                <ul v-for="(item, id) in menuList" :key="id">
                  <li v-for="(sub, i) in item" v-bind:key="i">
                    <a v-bind:href="sub ? '/#/product/' + sub.id : ''">
                      <img v-bind:src="sub? sub.img : '/imgs/item-box-1.png'" alt />
                      {{sub ? sub.name : '小米九'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="menu-item">
              <a href="#">离合器 磁性材料</a>
            </li>
            <li class="menu-item">
              <a href="#">压缩机 刹车盘</a>
            </li>
            <li class="menu-item">
              <a href="#">转向机 球头销</a>
            </li>
            <li class="menu-item">
              <a href="#">平衡块 钢板</a>
            </li>
            <li class="menu-item">
              <a href="#">火花塞 蓄电池</a>
            </li>
            <li class="menu-item">
              <a href="#">灯具 前照灯</a>
            </li>
          </ul>
        </div>
<!--        swiper是自动旋转的-->
<!--        我先把图片调整好-->
        <swiper v-bind:options="swiperOption">
          <swiper-slide v-for="(item, index) in slideList" v-bind:key="index">
<!--            这里对每个图片有请求的控制。它都没有写完，我暂时也不写-->
            <a :href="'/#/store/' + item.id">
              <img v-bind:src="item.img" />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

<!--      下面是其他的东西了-->
<!--      零件信息列表-->
      <div class="details-box">
        <router-link v-for="(item, id) in detailList" :key="id" :to="{ name: 'ToTest', params: { id: item.id }}" @click.native="logRoute(item.id)">
          <img v-lazy="item.img" alt />
        </router-link>
      </div>

<!--      分隔图banner-->
      <div class="banner">
        <a href="/#/product/30">
<!--          <img v-lazy="'../../assets/imgs/banner-1.png'" alt />-->
          <el-image :src="banner"></el-image>
        </a>
      </div>
<!--未处理-->
      <div class="product-box">
        <div class="container">
          <h2>待定</h2>
          <div class="wrapper">
            <div class="banner-left">
              <a href="/#/product/35">
                <img v-lazy="'/imgs/mix-alpha.jpg'" alt />
              </a>
            </div>
            <div class="list-box">
              <div class="list" v-for="(arr, i) in phoneList" :key="i">
                <div class="item" v-for="(item, j) in arr" :key="j">
                  <span v-bind:class="{'new-pro ' : j%2==0}">新品</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt />
                  </div>
                  <div class="item-info">
                    <h3>{{item.name}}</h3>
                    <p>{{item.subtitle}}</p>
                    <p class="price"  @click="addCart(item.id)">{{item.price}}元</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      v-bind:showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal=false"
    >
      <template v-slot:body>
        <p>商品添加成功!</p>
      </template>
    </modal>
  </div>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
import ServiceBar from "../component_repository/ServiceBar.vue";
import Modal from "../component_repository/Modal.vue";
//导入swiper需要的图片
import swiper_slide1 from '../../assets/imgs/slider/slide-1.jpg'
import swiper_slide2 from '../../assets/imgs/slider/slide-2.jpg'
import swiper_slide3 from '../../assets/imgs/slider/slide-3.jpg'
import swiper_slide4 from '../../assets/imgs/slider/slide-4.jpg'
import swiper_slide5 from '../../assets/imgs/slider/slide-5.jpg'
import swiper_slide_new1 from '../../assets/imgs/slider/1-try_out.jpg'
import swiper_slide_new2 from '../../assets/imgs/slider/3-try_out.jpg'
import swiper_slide_new3 from '../../assets/imgs/slider/4-try_out.jpg'
import swiper_slide_new4 from '../../assets/imgs/slider/5-try_out.jpg'
import swiper_slide_new5 from '../../assets/imgs/slider/6-try_out.jpg'



// 导入下面零件页面的图片
import ads1 from '../../assets/imgs/ads/Carpart1_out.jpg'
import ads2 from '../../assets/imgs/ads/Carpart2_out.jpg'
import ads3 from '../../assets/imgs/ads/Carpart3_out.jpg'
import ads4 from '../../assets/imgs/ads/Carpart4_out.jpg'
import banner from '../../assets/imgs/分隔图1_out.jpg'
import ToTest from "./ToTest.vue";

export default {
  name: 'IndexStore',
  // import 引入的组件需要注入到对象中才能使用
  components: {
    ServiceBar,
    Modal,
    ToTest
  },
  props: {},
  data() {
    return {
      swiperOption: {
        autoplay: true, //这个属性控制是否自动旋转
        loop: true,
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      //swiper旋转中的展示的内容
      slideList: [
        {
          id: "42",
          img: swiper_slide_new1
        },
        {
          id: "45",
          img: swiper_slide_new2
        },
        {
          id: "46",
          img: swiper_slide_new3
        },
        {
          id: "",
          img:swiper_slide_new4
        },
        {
          id: "",
          img: swiper_slide_new5
        }
      ],
      // 暂时不知道是啥
      menuList: [
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米cc9"
          },
          {
            id: 31,
            img: "/imgs/item-box-1.png",
            name: "小米cc9"
          },
          {
            id: 32,
            img: "/imgs/item-box-1.png",
            name: "小米cc9"
          },
          {
            id: 33,
            img: "/imgs/item-box-1.png",
            name: "小米cc9"
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      // 这里得变成我的零件信息列表
      detailList: [
        {
          id: 33,
          img: ads1
        },
        {
          id: 48,
          img: ads2
        },
        {
          id: 45,
          img: ads3
        },
        {
          id: 47,
          img: ads4
        },
      ],
      phoneList: [
        // [1, 1, 1, 1],
        // [1, 1, 1, 1]
      ],
      showModal:false,
      banner:banner,//
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //发送了get请求
    init() {
      // this.$axios
      //   .get("/products", {
      //     params: {
      //       categoryId: 100012,
      //       pageSize: 14
      //     }
      //   })
      //   .then(res => {
      //     res.list = res.list.slice(6, 14);
      //     this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
      //   });
    },

    //发送了post请求
    addCart(){
      // this.$axios.post('/carts',{
      //   productId:id,
      //   selected: true
      // }).then((res)=>{
      //   this.showModal = true;
      //   this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
      // });
    },
    //跳转到购物车
    goToCart(){
      this.$router.push('/cart');
    },
    logRoute(id) {
      console.log('Routing to product with id:', id);
    },

  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
}
</script>


<style lang="scss">
//@import "../assets/scss/config.scss";
@import "../../../src/assets/scss/config.scss";
@import "../../../src/assets/scss/mixin.scss";
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            position: relative;
            display: block;
            font-size: 16px;
            color: #ffffff;
            padding-left: 30px;
            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: " ";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .details-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: $fontJ;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  content: " ";
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
