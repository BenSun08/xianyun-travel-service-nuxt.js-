<template>
  <div class="header">
    <div class="header-container">
      <div class="header-left">
        <nuxt-link to="/" class="xy-logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
        </nuxt-link>
        <div class="tab-bar">
          <nuxt-link to="/">
            首页
          </nuxt-link>
          <nuxt-link to="#/1">
            旅游攻略
          </nuxt-link>
          <nuxt-link to="#/2">
            酒店
          </nuxt-link>
          <nuxt-link to="#/3">
            国内机票
          </nuxt-link>
        </div>
      </div>
      <div class="header-right">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-bell" style="font-size: 18px" />
            消息
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link to="user/login-register">
          登录 / 注册
        </nuxt-link>
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
  padding: 0;
  margin: 0;
}
a{
  text-decoration: none;
  color: black;
}
.header{
    width: 100%;
    height: 60px;
    background-color: #ffffff;
  .header-container{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    .header-left{
      display: flex;
      >a{
        width: 180px;
        display: flex;
        align-items: center;
        img{
          width: 160px;
          height: 46px;
        }
      }
      .tab-bar{
        display: flex;
        a{
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          border-bottom: solid 5px #ffffff;
          &:hover{
            border-bottom: solid 5px #409eff;
            color: #409eff;
          }
          &:active{
            background-color: #409eff;
            color: #ffffff;
          }
        }
        .nuxt-link-exact-active{
            background-color: #409eff;
            color: #ffffff !important;
            border-bottom: solid 5px #409eff;
        }
      }
    }
    .header-right{
      >a{
        color: #666666;
        font-size: 14px;
        padding-left: 3px;
        &:hover{
          color: #409eff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
