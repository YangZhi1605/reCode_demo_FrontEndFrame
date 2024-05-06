<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>

    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="position: absolute; width: 0px; height: 0px; overflow: hidden;"
    >
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path
            d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
            class="path1"
          />
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path
            d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
            class="path1"
          />
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path
            d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
            class="path1"
          />
          <path
            d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path2"
          />
          <path
            d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path3"
          />
          <path
            d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path4"
          />
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <el-row class="item-address">
            <el-col :span="24">
              <h2 class="addr-title">收货地址</h2>
              <el-row class="addr-list clearfix">
                <el-col
                  :span="6"
                  v-for="(item,index) in list"
                  :key="index"
                  @click="checkIndex=index"
                  :class="{'checked':index == checkIndex}"
                >
                  <div class="addr-info">
                    <!-- 添加选中框角标 -->
                    <el-checkbox
                      v-model="item.isUse"
                      @change="handleAddressChangeCheckBox(index)"
                      class="addr-checkbox"
                    ></el-checkbox>

                    <h2>{{item.receiverName}}</h2>
                    <div class="phone">{{item.receiverMobile}}</div>
                    <div class="street">{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
                    <div class="action">
                      <el-button type="text" @click.stop="delAddress(item)">
                        <i class="el-icon-delete"></i>
                      </el-button>
                      <el-button type="text" @click.stop="editAddressModal(item)">
                        <i class="el-icon-edit"></i>
                      </el-button>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6"  class="addr-add">
                  <el-button icon="el-icon-circle-plus-outline" @click="addNewAdressModalShow" plain></el-button>
                  <div>添加新地址</div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 商品信息展示 -->
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item, index) in cartList" :key="index">
                <div class="good-name">
                  <!-- 注意：此处为示例，您需要依据实际字段修改 -->
<!--                  <img v-if="item.productImage" :src="item.productImage" alt="" />-->
                  <span>{{ item.name }}</span>
                </div>
                <div class="good-price">{{ item.price }}元 x {{ item.cartTotalQuantity }}</div>
                <div class="good-total">{{ item.total }}元</div>
              </li>
            </ul>
          </div>
<!--混子部分-->
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>

          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{ cartTotalPrice.toFixed(2) }}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{ cartTotalPrice.toFixed(2) }}元</span>
            </div>
          </div>
<!--          按钮组-->
          <div class="btn-group">
<!--            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>-->
            <el-button type="primary" plain @click="goBuy">回购物车</el-button>
            <el-button type="danger" @click="orderSubmit">确认购买</el-button>
<!--            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">确认购买</a>-->
          </div>

        </div>
      </div>
    </div>

<!--    编辑窗口-->
    <el-dialog :title="title_edit" :visible.sync="showEditModal" width="50%">
      <el-form :model="checkedItem" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="checkedItem.receiverName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="checkedItem.receiverMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="省市区">
<!--          addressOptions 是一个包含所有省份和城市的数组。每个省份对象都有一个 value（用于v-model），label（用于显示），以及 children 数组包含其下属城市。-->
<!--          addressValue 是一个空数组，将会保存用户在<el-cascader>组件中选择的省份和城市的value。例如，如果用户选择了河北省石家庄市，addressValue将会是['河北', '石家庄']-->
          <el-cascader
            :options="addressOptions"
            v-model="addressValue"
            @change="handleAddressChange"
            change-on-select
            placeholder="请选择"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            type="textarea"
            v-model="checkedItem.receiverAddress"
            placeholder="请输入详细地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditModal=false">取消</el-button>
        <el-button type="primary" @click="saveEditAdress">保存</el-button>
      </template>
    </el-dialog>

<!--    添加窗口-->
    <el-dialog :title="title_add" :visible.sync="showAddModal" width="50%">
      <el-form :model="addAdress" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="addAdress.receiverName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addAdress.receiverMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="省市区">
<!--          addressOptions 是一个包含所有省份和城市的数组。每个省份对象都有一个 value（用于v-model），label（用于显示），以及 children 数组包含其下属城市。-->
<!--          addressValue 是一个空数组，将会保存用户在<el-cascader>组件中选择的省份和城市的value。例如，如果用户选择了河北省石家庄市，addressValue将会是['河北', '石家庄']-->
          <el-cascader
            :options="addressOptions"
            v-model="addressValue"
            @change="handleAddressChange"
            change-on-select
            placeholder="请选择"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            type="textarea"
            v-model="addAdress.receiverAddress"
            placeholder="请输入详细地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddModal=false">取消</el-button>
        <el-button type="primary" @click="saveAddAdress">保存</el-button>
      </template>
    </el-dialog>

  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
import OrderHeader from "../component_repository/OrderHeader.vue";
import Modal from "../component_repository/Modal.vue";
export default {
  name: 'orderConfirm',
  data() {
    return {
      list: [], //收货地址列表
      cartList: [], //购物车中需要结算的商品列表
      cartTotalPrice: 0, //商品总金额
      count: 0, //商品结算数量
      checkedItem: {}, //选中的商品对象
      userAction: "", //用户行为 0：新增 1：编辑 2：删除
      showDelModal: false, //是否显示删除弹框
      showEditModal: false, //是否显示编辑弹框
      showAddModal: false, //是否显示新增弹框
      checkIndex: 0 ,//当前收货地址选中索引
      title_edit:'修改',
      addressOptions:{},
      addressValue: [],
      addAdress:{},//新增地址
      title_add:'添加',
      userId:'',
    };
  },
  components: {
    OrderHeader,
    Modal
  },
  computed:{
    //计算当前登录用户的id,赋值给userId
    getUserId(){
      this.userId = JSON.parse(localStorage.getItem('user')).userId;
    }

  },
  mounted() {
    this.getAddressList();
    this.getCartList();
    // this.addressOptions = require('@/static/region.json');
    this.getAddressOptions();
    //在初始化时候就调用getUserId方法，获取当前登录用户的id
    this.getUserId();

  },
  methods: {
    //回到购物车
    goBuy(){
      this.$router.push('/cart');
    },

    //处理收货地址的选择状态
    handleAddressChangeCheckBox(index){
      // 获取选中地址的id
      let id = this.list[index].id;
      // 获取选中地址的状态并转换为整型，因为数据库中是Int类型
      const isUse = this.list[index].isUse ? 1 : 0;
      console.log('当前的选中状态为：',isUse);
      console.log('当前的选中id为：',id);
      // 在这里发送post请求给后端，通知后端更新地址的使用状态
      this.$axios.post('http://127.0.0.1:5000/api/update_isUse',{
        id: id,
        isUse: isUse
      }).then(response => {
        if(response.data.success){
          this.$message({
            message: '选中地址成功',
            type: 'success'
          });
          // 保存成功后重新获取地址列表
          this.getAddressList();
        }else{
          this.$message.error(response.data.message);
        }
      }).catch(error => {
        console.error('选中地址信息失败:', error);
        this.$message.error('选中地址信息失败');
      });
    },

    // 在省市区选择时更新 addressValue 数组 —— 确保在<el-cascader>选择发生变化时能正确更新addressValue
    handleAddressChange(value) {
      this.addressValue = value;
    },



    // 获取收货地址列表
    getAddressList() {
      this.$axios.get("http://127.0.0.1:5000/api/get_address_info").then(res => {
        this.list = res.data.data;
        console.log('收货地址列表', this.list);
        //将isUse字段更改为布尔类型，0是false,1是true，用于复选框的选中状态
        this.list.forEach(item => {
          item.isUse = item.isUse === 1;
        });

      });
    },

    getAddressOptions() {
      this.$axios.get("http://127.0.0.1:5000/api/get_chinese_regions")
        .then(res => {
          // 将后台返回的数据转换成 Cascader 可以识别的格式
          this.addressOptions = this.transformDataForCascader(res.data);
          console.log('省市区数据:', this.addressOptions);
        });
    },
    /*
        ```
      [
      {
        "province": "北京市",
        "city": "北京市",
        "county": "北京市",
        "longitude": "116.4",
        "latitude": "39.9",
        "zipCode": "100000"
      },
      {
        "province": "北京市",
        "city": "北京市",
        "county": "东城区",
        "longitude": "116.42",
        "latitude": "39.93",
        "zipCode": "100010"
      },
      {
        "province": "北京市",
        "city": "北京市",
        "county": "西城区",
        "longitude": "116.37",
        "latitude": "39.92",
        "zipCode": "100032"
      },
      {
        "province": "北京市",
        "city": "北京市",
        "county": "崇文区",
        "longitude": "116.43",
        "latitude": "39.88",
        "zipCode": "100000"
      },
      {
        "province": "北京市",
        "city": "北京市",
        "county": "宣武区",
        "longitude": "116.35",
        "latitude": "39.87",
        "zipCode": "100000"
      },
      ]
      ```
    * */
    /*
    这里的transformDataForCascader函数的目的是将JSON数据格式化成Cascader组件需要的数据结构。
    在这个数据结构中，同一个省下的所有市会被组织到一起，同一个市下的所有区也会被组织到一起。
    请注意，这个逻辑假设province和city字段组合是唯一的，
    如果在完整数据集中存在相同的省份-城市组合与不同的区对应，
    那这个转换逻辑依然适用。如果存在重复的县区名称但属于不同的城市，
    这里简单的使用county字段作为value值可能不足以区分它们。你可能需要根据你的实际情况，决定如何分配唯一的value值。
    * */

    // 转换数据的方法
    transformDataForCascader(data) {
      // 使用映射表来存储省份和城市的对应关系，便于查询和更新数据
      let provincesMap = {};
      data.forEach(item => {
        // 如果省份不存在，则创建省份及其城市
        if (!provincesMap[item.province]) {
          provincesMap[item.province] = {
            value: item.province,
            label: item.province,
            children: []
          };
        }

        // 查找或者创建城市
        let city = provincesMap[item.province].children.find(c => c.value === item.city);
        if (!city) {
          city = {
            value: item.city,
            label: item.city,
            children: []
          };
          provincesMap[item.province].children.push(city);
        }

        // 由于是县区级别，直接添加到城市的 children 即可
        city.children.push({
          value: item.county,
          label: item.county
        });
      });

      // 转换映射表为数组格式，以供 Cascader 组件使用
      return Object.values(provincesMap);
    },

    // // 打开新增地址弹框
    // openAddressModal() {
    //   // this.userAction = 0;
    //   // this.checkedItem = {};
    //
    // },
    //
    //打开新增地址弹框
    addNewAdressModalShow(){
      this.showAddModal = true;
    },
    saveAddAdress(){
      const AddadressData = {
        receiverName: this.addAdress.receiverName,
        receiverMobile: this.addAdress.receiverMobile,
        receiverProvince: this.addressValue[0],
        receiverCity: this.addressValue[1],
        receiverDistrict: this.addressValue[2],
        receiverAddress: this.addAdress.receiverAddress,
        isUse: 0
      };
      console.log('输出给后端的数据',AddadressData);
      //向后端发送post请求，将需要添加的数据传递过去
      this.$axios.post('http://127.0.0.1:5000/api/add_address_info',AddadressData).then(response => {
        if(response.data.success){
          this.showAddModal = false;
          this.$message({
            message: '地址信息保存成功',
            type: 'success'
          });
          // 保存成功后重新获取地址列表
          this.getAddressList();
        }else{
          this.$message.error(response.data.message);
        }
      }).catch(error => {
        console.error('保存地址信息失败:', error);
        this.$message.error('保存地址信息失败');
      });

    },

    // 打开新增地址弹框
    editAddressModal(item) {
      this.userAction = 1;
      this.checkedItem = item;
      this.showEditModal = true;
    },

    // 删除地址
    delAddress(item) {
      //弹窗确认是否删除
      this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //向后端发送post请求，传入id进行删除
        this.$axios.post('http://127.0.0.1:5000/api/delete_address_info',{
          id: item.id
        }).then(response => {
          if(response.data.success){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAddressList();
          }else{
            this.$message.error(response.data.message);
          }
        }).catch(error => {
          console.error('删除地址信息失败:', error);
          this.$message.error('删除地址信息失败');
        });
    }, () => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 保存编辑的地址
    saveEditAdress() {
      if (this.addressValue.length === 3) {
        const addressData = {
          receiverName: this.checkedItem.receiverName,
          receiverMobile: this.checkedItem.receiverMobile,
          receiverProvince: this.addressValue[0],
          receiverCity: this.addressValue[1],
          receiverDistrict: this.addressValue[2],
          receiverAddress: this.checkedItem.receiverAddress,
          isUse: this.checkedItem.isUse
        };
        this.$axios.post('http://127.0.0.1:5000/api/update_address_info',
          {
            id: this.checkedItem.id,
            ...addressData
          }).
        then(response => {
          if (response.data.success) {
            this.showEditModal = false;
            this.$message({
              message: '地址信息保存成功',
              type: 'success'
            });
            // 保存成功后重新获取地址列表
            this.getAddressList();
          } else {
            this.$message.error(response.data.message);
          }
        })
          .catch(error => {
            console.error('保存地址信息失败:', error);
            this.$message.error('保存地址信息失败');
          });
      } else {
        this.$message.error('请选择完整的省市区信息');
      }
    },

    // 地址删除、编辑、新增功能
    submitAddress() {
      let { checkedItem, userAction } = this;
      let method,
        url,
        params = {};
      if (userAction == 0) {
        (method = "post"), (url = "/shippings");
      } else if (userAction == 1) {
        (method = "put"), (url = `/shippings/${checkedItem.id}`);
      } else {
        (method = "delete"), (url = `/shippings/${checkedItem.id}`);
      }
      if (userAction == 0 || userAction == 1) {
        let {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        } = checkedItem;
        let errMsg = "";
        if (!receiverName) {
          errMsg = "请输入收货人名称";
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = "请输入正确格式的手机号";
        } else if (!receiverProvince) {
          errMsg = "请选择省份";
        } else if (!receiverCity) {
          errMsg = "请选择对应的城市";
        } else if (!receiverAddress || !receiverDistrict) {
          errMsg = "请输入收货地址";
        }
        if (errMsg) {
          this.$message.error(errMsg);
          return;
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        };
      }
      this.axios[method](url, params).then(() => {
        this.closeModal();
        this.getAddressList();
        this.$message.success("操作成功");
      });
    },

    closeModal() {
      this.checkedItem = {};
      this.userAction = "";
      this.showDelModal = false;
      this.showEditModal = false;
    },

    // 获取购物车列表
    getCartList() {
      console.log('开始获取购物车信息');
      this.$axios.get("http://127.0.0.1:5000/api/get_cart_info").then(res => {
        if (res.data.success) {
          let list = res.data.data;
          // 仅保留选中（selected为1）的商品
          this.cartList = list.filter(item => item.selected === 1);
          // 初始化总金额和结算数量
          this.cartTotalPrice = 0;
          console.log('购物车列表', this.cartList);
          this.count = 0;
          // 遍历选中的商品，更新总金额和结算数量
          this.cartList.forEach(item => {
            this.cartTotalPrice += item.total;
            this.count += item.cartTotalQuantity;
          });
        } else {
          // 处理获取购物车信息失败的情况
          console.error(res.data.message || '获取购物车信息失败');
        }
      }).catch(error => {
        // 处理请求失败的情况
        console.error('请求购物车信息错误:', error);
      });
    },

    // 订单提交
    orderSubmit() {
      // 1. 判断是否有选中的收货地址且只能有一个收货地址
      const selectedAddresses = this.list.filter(item => item.isUse);
      if (selectedAddresses.length !== 1) {
        this.$message.error('请选择一个收货地址');
        return;
      }
      // 将当前选中的地址信息保存到一个变量中
      const selectedAddress = selectedAddresses[0];

      // 2. 判断是否有选中的商品
      if (this.cartList.length === 0) {
        this.$message.error('请选择商品');
        return;
      }

      // 3. 弹出随机生成的支付二维码
      this.showPaymentQRCode();
      // 读取用户信息来获取userId
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const userId = userInfo.userId;
      console.log('当前拿到的用户id为',userId);
      // 4. 将购物车中的商品信息和被选中的地址信息通过axios的post请求发送给后端
      this.$axios.post('http://127.0.0.1:5000/api/submit_order', {
        userInfo: { id: userId },
        addressInfo: selectedAddress,
        cartList: this.cartList,
        totalPrice: this.cartTotalPrice,
        itemCount: this.count
      }).then(response => {
        if(response.data.success){
          this.$message({
            message: '订单提交成功',
            type: 'success'
          });
          // 处理订单提交后的逻辑（如清空购物车等）
          //清空相应的购物车信息。
          this.$axios.post('http://127.0.0.1:5000/api/delete_cart_items',{
            cartList: this.cartList
          }).then(response => {
            if(response.data.success){
              this.$message({
                message: '购物车清空成功',
                type: 'success'
              });
              // 保存成功后重新获取购物车列表
              this.getCartList();
            }else{
              this.$message.error(response.data.message);
            }
          }).catch(error => {
            console.error('购物车清空失败:', error);
            this.$message.error('购物车清空失败');
          });

        }else{
          this.$message.error('订单提交失败：' + response.data.message);
        }
      }).catch(error => {
        console.error('提交订单失败:', error);
        this.$message.error('订单提交失败');
      });
    },

    // 假设的函数：显示支付二维码
    showPaymentQRCode() {
      // 这里应该与随机生成支付二维码的逻辑相关，或者获取支付二维码的URL
      // 此处只是模拟展示，实际操作需根据你的实际情况调整
      console.log("展示支付二维码");
    },
  }
}
</script>
<style lang="scss">
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 80px;
    padding-bottom: 84px;
    .order-box {
      background-color: #ffffff;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .item-address {
        padding-top: 38px;
        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 190px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              height: 50px;
              line-height: 50px;
              .icon {
                width: 20px;
                height: 20px;
                fill: #666666;
                vertical-align: middle;
                &:hover {
                  fill: #ff6700;
                }
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url("../../assets/imgs/icon-add.png") #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px  #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px  #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            padding-right: 44px;
            color: #ff6600;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item-val {
          color: #ff6700;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 100px;
        }
        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
  .edit-wrap {
    font-size: 14px;
    .item {
      margin-bottom: 15px;
      .input {
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        & + .input {
          margin-left: 14px;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        margin-right: 15px;
      }
      textarea {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
      }
    }
  }
}
</style>
