<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
<!--
handleSelectionChange 方法作为 selection-change 事件的处理函数被绑定到 <el-table> 。
当表格中的选中项发生变化时，Element UI框架会自动触发 selection-change 事件，
并将当前所有被选中的行作为一个数组传递给 handleSelectionChange 方法
-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-top: 70px"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="零件名称"
        prop="name"
        width="120">
<!--        <template slot-scope="scope">{{ scope.row.date }}</template>-->
      </el-table-column>

<!--
在<el-table-column prop="price" label="零件单价" width="120">
标签中移除prop属性，因为我们将使用自定义模板插槽来处理这一列的显示逻辑。
使用<template>标签并使用slot-scope="scope"（在 Element UI 2.x 版本中使用）
属性来访问当前行的数据
-->
      <el-table-column
        label="零件单价"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.price }} 元
        </template>
      </el-table-column>

      <el-table-column
        prop="cartTotalQuantity"
        label="零件数量"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateCart(scope.row, '-')">-</el-button>
          <span>{{ scope.row.cartTotalQuantity }}</span>
          <el-button
            size="mini"
            @click="updateCart(scope.row, '+')">+</el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="小计"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.total }} 元
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
      <el-button @click="toggleSelection()" type="primary">全部取消选择</el-button>
    </div>

    <div class="wrapper">
      <div class="container">
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
<!--            <a href="/#/store">继续购买</a>-->
            <el-button type="success" plain @click="goStore">继续购买</el-button>
            共<span>{{tableData.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>

    <service-bar></service-bar>
  </div>
</template>
<script>
import OrderHeader from "./component_repository/OrderHeader";
import ServiceBar from "./component_repository/ServiceBar";
export default {
  name: "Cart",
  components: {
    OrderHeader,
    ServiceBar,
  },
  data(){
    return {
      list:[],//商品列表
      allChecked:false,//是否全选
      cartTotalPrice:0,//商品总金额
      checkedNum:0,//选中商品数量
      tableData: [],
      multipleSelection: []
    }
  },
  mounted(){
    this.getCartList();
  },
  methods:{
    //跳转到商店
    goStore(){
      this.$router.push('/store');
    },

    //处理删除
    handleDelete(index, row) {
      console.log(index, row);
      //向后端发送post请求。传入id，进行删除
      this.$axios.post('http://127.0.0.1:5000/api/delete_cart_info', {
        id: row.id
      }).then(res => {
        if (res.data.success) {
          //弹出提示删除成功
          this.$message.success('去除成功');
          //重新获取购物车列表
          this.getCartList();
        } else {
          //使用消息提示框提示错误信息
          this.$message.error('删除购物车失败：' + res.data.message);
        }
      });
    },

    //处理全部取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // 处理选中行变化
    handleSelectionChange(selectedRows) {
      this.multipleSelection = selectedRows;
      // 构建要发送到后端的数据数组
      const updateData = selectedRows.map(row => ({
        id: row.id,
        selected: 1 // 表示已选中
      }));

      // 对于未选中的行，我们需要通过比较来找出它们，然后设置其selected为0
      const allData = this.tableData;
      const unselectedData = allData.filter(item => !selectedRows.includes(item))
        .map(item => ({
          id: item.id,
          selected: 0 // 表示未选中
        }));

      // 最后将选中和未选中的数据合并
      const finalData = updateData.concat(unselectedData);
      //输出传递给后端的数据
      console.log('finalData:', finalData);
      // 向后端发送请求，更新选中状态
      this.$axios.post('http://127.0.0.1:5000/api/update_selected_status', finalData)
        .then(res => {
          // 可以在这里执行额外的动作，例如更新UI或处理响应数据
          console.log('Update Success:', res);
          // 更新tableData中的selected状态
          finalData.forEach(data => {
            const index = this.tableData.findIndex(item => item.id === data.id);
            if (index !== -1) {
              this.tableData[index].selected = data.selected;
            }
          });

          // 更新选中商品数量
          this.checkedNum = this.tableData.filter(item => item.selected === 1).length;
          // 更新选中商品总价格
          this.cartTotalPrice = this.tableData.reduce((totalPrice, item) => {
            return item.selected === 1 ? totalPrice + item.price * item.cartTotalQuantity : totalPrice;
          }, 0);
          //让商品总价格保留两位小数
          this.cartTotalPrice = this.cartTotalPrice.toFixed(2);
        })
        .catch(error => {
          console.error('Update Error:', error);
        });
    },
    // 获取购物车列表
    getCartList(){
      this.$axios.get('http://127.0.0.1:5000/api/get_cart_info').then((response)=>{
        if (response.data.success) {
          this.renderData(response.data);
        } else {
          alert('获取购物车数据失败：' + response.data.message);
        }
      })
    },
    // 公共赋值
    renderData(data){
      // 过滤出 active 为 true 的购物车项
      const activeItems = data.data.filter(item => item.active === true);

      this.tableData = activeItems;
      // 全选状态赋值，由于返回数据中未提供全选的信息，这里假设如果所有商品都被选中，则全选为true
      this.allChecked = this.tableData.every(item => item.selected === 1);
      // 计算总金额，假设total字段为单个商品的总金额
      this.cartTotalPrice = this.tableData.reduce((total, item) => {
        return total + (item.selected === 1 ? item.total : 0);
      }, 0);
      // 选中商品的数量
      // this.checkedNum = this.tableData.filter(item => item.selected === 1).length;
    },

    // 更新商品数量并发送到后端进行保存
    updateCart(item, type) {
      let quantity = item.cartTotalQuantity;
      if (type === '-') {
        if (quantity <= 1) {
          alert('商品至少保留一件');
          return;
        }
        quantity--;
      } else if (type === '+') {
        quantity++;
      }
      //测试数据当前的id
      console.log('当前的id是',item.id);
      // 通过axios发送post请求，更新服务器数据
      this.$axios.post(`http://127.0.0.1:5000/api/update_cart_info`, {
        cartTotalQuantity: quantity,
        id:item.id,
        // 此处加上其他需要更新的商品信息，例如selected
      }).then(response => {
        if (response.data.success) {
          //重新获取购物车列表
          this.getCartList();
        } else {
          //使用消息提示框提示错误信息
          this.$message.error('更新购物车失败：' + response.data.message);
        }
      });
    },

    // 更新列表中的商品信息
    updateItemList(productId, newItem) {
      const index = this.list.findIndex(item => item.id === productId);
      if (index !== -1) {
        // 更新商品信息
        this.$set(this.list, index, newItem);
        // 重新计算总价
        this.calculateTotalPrice();
      }
    },

    // 重新计算所有选中商品的的总价
    calculateTotalPrice() {
      this.cartTotalPrice = this.list.reduce((total, item) => {
        return total + (item.selected ? item.total : 0);
      }, 0);
    },

    // 删除购物车商品
    delProduct(item){
      this.axios.delete(`/carts/${item.productId}`).then((res)=>{
        this.$message.success('删除成功');
        this.renderData(res);
      });
    },

    // 控制全选功能
    toggleAll(){
      let url = this.allChecked?'/carts/unSelectAll':'/carts/selectAll';
      this.axios.put(url).then((res)=>{
        this.renderData(res);
      })
    },

    // 购物车下单
    // 购物车下单
    order() {
      // 注意这里假设每个item都有一个selected属性，且当商品被选中时该属性值为1
      let isCheck = this.tableData.every(item => item.selected !== 1);
      if(isCheck){
        this.$message.warning('请选择一件商品');
      } else {
        this.$router.push('/order/confirm');
      }
    }
  }
}
</script>
<style lang="scss">
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("../assets/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url("../assets/imgs/icon-close.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
