<template>
  <div class="pay">
    <div class="pay-container">
      <div class="pay-price">
        <span>支付总金额&nbsp;&nbsp;</span>
        <span class="price">&yen;{{ price }}</span>
      </div>
      <div class="pay-code">
        <div class="code-head">
          微信支付
        </div>
        <div class="code-body">
          <div class="qrcode">
            <canvas ref="canvas">
              哈哈
            </canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qrcode from 'qrcode'
export default {
  data () {
    return {
      price: 0,
      payInfo: {},
      intervalId: ''
    }
  },
  mounted () {
    this.$axios.get(`/airorders/${this.$route.query.id}`)
      .then((rsp) => {
        this.price = rsp.data.price
        this.payInfo = { ...rsp.data.payInfo }
        qrcode.toCanvas(this.$refs.canvas, this.payInfo.code_url)
      })
    this.intervalId = setInterval(() => {
      this.checkPay()
    }, 5000)
  },
  methods: {
    checkPay () {
      this.$axios.post('/airorders/checkpay', {
        id: this.$route.query.id,
        nonce_str: this.payInfo.nonce_str,
        order_no: this.payInfo.order_no
      })
        .then((rsp) => {
          if (rsp.data.trade_state === 'CLOSED') {
            clearInterval(this.intervalId)
            this.$message.success('订单支付成功, 正在跳转至首页...')
            setTimeout(() => {
              this.$router.push('/')
            }, 1500)
          }
        })
    }
  }
}
</script>

<style lang="less" scpoed>
*{
  box-sizing: border-box;
}
img{
  display: block;
}
.pay{
  background-color: #f5f5f5;
  padding-bottom: 30px;
  .pay-container{
    width: 1000px;
    margin: 0 auto;
    .pay-price{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding: 34px 0 10px 0;
      .price{
        font-size: 28px;
        color: #ff4500;
      }
    }
    .pay-code{
      padding: 30px;
      border-top: solid 5px #ffa500;
      background-color: #ffffff;
      .code-head{
        font-size: 26px;
      }
      .code-body{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 80px;
        .qrcode{
          width: 232px;
          height: 310px;
          border: solid 1px #dddddd;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          canvas{
            width: 200px !important;
            height: 200px !important;
            margin-bottom: 6px;
          }
          p{
            padding: 5px 0;
          }
        }
      }
    }
  }
}
</style>
