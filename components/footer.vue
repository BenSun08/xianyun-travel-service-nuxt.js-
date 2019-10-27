<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="top-left">
          <div class="text-container">
            <div class="introduction">
              <h4>闲云旅游网</h4>
              <p>
                上亿旅行者共同打造的“旅游神器”<br>
                <span>60,000</span>多个全球旅游目的地<br>
                <span>600,000</span>个细分目的地新玩法<br>
                <span>760,000,000</span>次攻略下载<br>
                <span>38,000</span>家旅游产品供应商
              </p>
            </div>
          </div>
          <div class="text-container">
            <div class="about-us">
              <h4>关于我们</h4>
              <p>
                隐私政策 商标声明<br>
                服务协议 游记协议<br>
                商城平台服务协议<br>
                网络信息侵权通知指引<br>
                闲云旅游旅游网服务监督员<br>
                网站地图加入闲云旅游
              </p>
            </div>
          </div>
          <div class="text-container">
            <div class="travel-service">
              <h4>旅行服务</h4>
              <p>
                旅游攻略 酒店预订<br>
                旅游特价 国际租车<br>
                旅游问答 旅游保险<br>
                旅游指南 订火车票<br>
                旅游资讯 APP下载
              </p>
            </div>
          </div>
        </div>
        <div class="img-container">
          <div class="QR-code">
            <img src="http://157.122.54.189:9093/images/1556522965.png" alt="">
            <p>关注我们</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>京ICP备08001421号 京公网安备110108007702 Copyright &copy; 2016-2019博学谷 All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
*{
  box-sizing: border-box;
}
.footer{
  width: 100%;
  height: 330px;
  background-color: #333333;
  .footer-container{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    .footer-top{
      display: flex;
      justify-content: space-between;
      height: 212px;
      border-bottom: solid 1px #666666;
      .top-left{
        display: flex;
        .text-container{
          height: 100%;
          padding: 20px 20px 0 40px;
          >div{
            flex: 1;
            color: #cccccc;
            font-size: 12px;
            line-height: 20px;
            h4{
              font-weight: normal;
              font-size: 18px;
              line-height: 38px;
            }
            span{
              color: #ffa500;
            }
          }
        }
      }
      .img-container{
        padding: 30px 100px;
        >div{
          img{
            width: 140px;
            height: 140px;
          }
          p{
            color: #cccccc;
            font-size: 12px;
            text-align: center;
          }
        }
      }
    }
    .footer-bottom{
      height: 118px;
      font-size: 12px;
      color: #cccccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
