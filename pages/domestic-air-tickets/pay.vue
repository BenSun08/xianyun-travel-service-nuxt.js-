<template>
  <div class="pay">
    <div class="pay-container">
      <div class="pay-price">
        <span>支付总金额&nbsp;&nbsp;</span>
        <span class="price">&yen;1440.00</span>
      </div>
      <div class="pay-code">
        <div class="code-head">
          微信支付
        </div>
        <div class="code-body">
          <div class="qrcode">
            <canvas>
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
export default {
  mounted () {

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
            width: 200px;
            height: 200px;
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
