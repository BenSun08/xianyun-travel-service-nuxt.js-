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
          <nuxt-link to="domestic-air-tickets">
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
        <a v-if="!loggedIn" href="/user/login-register">
          登录 / 注册
        </a>
        <el-dropdown v-else @command="logoutHandler">
          <span class="el-dropdown-link">
            <img :src="$axios.defaults.baseURL+userProfile.defaultAvatar.substring(1)" alt="" class="avatar">
              &nbsp;{{ userProfile.username }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    },
    userProfile () {
      return this.$store.state.userProfile
    }
  },
  mounted () {
    const userProfileStr = localStorage.getItem('xy-user-profile')
    if (userProfileStr) {
      const userProfile = JSON.parse(userProfileStr)
      this.$store.commit('saveUserProfile', userProfile)
    }
  },
  methods: {
    logoutHandler (command) {
      if (command === 'logout') {
        this.$store.commit('removeUserProfile')
        this.$router.push('/')
      }
    }
  }
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
    border-bottom: solid 1px #dddddd;
    outline: #f5f5f5;
    outline-width: 3px;
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
      display: flex;
      align-items: center;
      >a{
        color: #666666;
        font-size: 14px;
        padding-left: 12px;
        &:hover{
          color: #409eff;
          text-decoration: underline;
        }
      }
      span.el-dropdown-link{
        padding-left: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        img.avatar{
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: solid 2px #ffffff;
        }
        &:hover{
          img.avatar{
            border: solid 2px #409eff;
          }
        }
      }
    }
  }
}
</style>
