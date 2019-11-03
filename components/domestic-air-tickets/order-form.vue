<template>
  <div class="order-form">
    <div class="passenger">
      <h3>乘机人</h3>
      <el-form ref="orderForm" :model="orderForm" label-position="top" class="passenger">
        <div
          v-for="(passenger, index) in orderForm.users"
          :key="index"
          class="passenger-info"
        >
          <el-form-item
            prop="passenger"
            label="乘机人类型"
          >
            <el-input v-model="passenger.username" placeholder="姓名">
              <el-select slot="prepend" v-model="type" placeholder="成人">
                <el-option label="成人" value="成人" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item
            label="证件类型"
            prop="identification"
          >
            <el-input v-model="passenger.id" placeholder="证件号码">
              <el-select slot="prepend" v-model="passenger.idType" placeholder="证件类型">
                <el-option label="身份证" value="1" />
                <el-option label="护照" value="2" />
              </el-select>
            </el-input>
          </el-form-item>
          <div
            v-if="index>0"
            class="delete-passenger"
            @click="orderForm.users.splice(index,1);
              $emit('users-num-change', orderForm.users.length)"
          >
            -
          </div>
        </div>
        <el-form-item class="add-passenger">
          <el-button
            type="primary"
            @click="orderForm.users.push({username:'',id:''});
              $emit('users-num-change', orderForm.users.length)"
          >
            添加乘机人
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="insurance">
      <h3>保险</h3>
      <el-checkbox-group v-model="orderForm.insurances" @change="orderForm.insurances=[...$event]">
        <el-checkbox v-for="insurance in insurances" :key="insurance.id" :label="insurance.id" border>
          {{ insurance.type }}: ￥{{ insurance.price }}/份x1 最高赔付{{ insurance.compensation }}元
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="contact">
      <h3>联系人</h3>
      <div class="form-container">
        <el-form v-model="contactForm" label-position="right" label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactForm.contactName" />
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="contactForm.contactPhone">
              <el-button slot="append" @click="sendValidCode">
                发送验证码
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="contactForm.captcha" />
          </el-form-item>
        </el-form>
      </div>
      <div class="order-submit">
        <el-button type="warning" size="large" @click="submitOrder">
          提交订单
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'insurances': {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      type: '成人',
      idType: '身份证',
      orderForm: {
        users: [
          {
            username: 'Ben',
            id: '123',
            idType: '1'
          },
          {
            username: 'Tony',
            id: '456',
            idType: '1'
          }
        ],
        insurances: []
      },
      contactForm: {
        contactName: 'Tony',
        contactPhone: '18300000000',
        captcha: '000000',
        invoice: true
      }
    }
  },
  methods: {
    submitOrder () {
      const data = {
        ...this.orderForm,
        ...this.contactForm,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      }
      this.$axios.post('/airorders', data)
        .then((rsp) => {
          this.$message.success(rsp.data.message)
          setTimeout(() => {
            this.$router.push({
              path: '/domestic-air-tickets/pay',
              query: { id: rsp.data.data.id }
            })
          }, 1000)
        })
    },
    sendValidCode () {
      this.$axios.post('/captchas', { tel: this.contactForm.contactPhone })
        .then((rsp) => {
        })
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.order-form{
  width: 100%;
  border-bottom: dashed 1px #dddddd;
  padding-bottom: 46px;
  margin-bottom: 40px;
  .passenger{
    border-bottom: dashed 1px #dddddd;
    h3{
      font-size: 20px;
      font-weight: normal;
      margin-bottom: 20px;
    }
    .el-form{
      .passenger-info{
        position: relative;
        padding-bottom: 20px;
        border-bottom: dashed 1px #eeeeee;
        .el-form-item{
          margin-bottom: 0;
          /deep/.el-form-item__label{
            padding-bottom: 4px;
          }
          .el-select{
            width: 132px;
          }
          /deep/.el-input-group__prepend{
            background-color: #ffffff;
          }
        }
        .delete-passenger{
          position: absolute;
          top: 50%;
          right: -30px;
          width: 16px;
          height: 16px;
          background-color: #dddddd;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
      .add-passenger{
        padding: 20px 0;
        margin-bottom: 0;
      }
    }
  }
  .insurance{
    padding-bottom: 20px;
    border-bottom: dashed 1px #dddddd;
    h3{
      font-size: 22px;
      font-weight: normal;
      padding: 20px 0;
    }
    .el-checkbox-group{
      display: flex;
      flex-direction: column;
      .el-checkbox{
        width: fit-content;
        margin: 0 0 20px 0;
      }
    }
  }
  .contact{
    h3{
      font-size: 22px;
      font-weight: normal;
      padding: 20px 0;
    }
    .form-container{
      width: 320px;
    }
    .order-submit{
      padding: 26px 0;
      display: flex;
      justify-content: center;
      .el-button{
        width: 250px;
        height: 50px;
      }
    }
  }
}
</style>
