<template>
  <div class="people-input" @click="toggleBlock">
    <el-input
      ref="peopleInput"
      v-model="peopleNum"
      placeholder="人数未定"
      suffix-icon="el-icon-user"
      readonly
    />
    <transition
      name="fade"
      enter-active-class="animated fadeIn fastest"
      leave-active-class="animated fadeOut fastest"
    >
      <div v-show="showBlock" class="select-block">
        <div class="block-head block">
          <span class="block">每间</span>
          <div class="people-form block">
            <el-select v-model="adultNum" size="mini">
              <el-option
                v-for="adult in adultList"
                :key="adult"
                :label="adult+'成人'"
                :value="adult+'成人'"
              >
                {{ adult }}
              </el-option>
            </el-select>
            <el-select v-model="childrenNum" size="mini">
              <el-option
                v-for="children in childrenList"
                :key="children"
                :label="children+'儿童'"
                :value="children+'儿童'"
              >
                {{ children }}
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="block-foot block">
          <el-button type="primary" size="mini" @click="peopleNum=adultNum+childrenNum">
            确定
          </el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      peopleNum: '',
      adultNum: '2成人',
      childrenNum: '0儿童',
      adultList: ['1', '2', '3', '4', '5', '6', '7'],
      childrenList: ['0', '1', '2', '3', '4'],
      showBlock: false,
      clickOnBlock: false
    }
  },
  methods: {
    toggleBlock (event) {
      console.log('aa')
      const classList = event.target.classList
      if (classList.contains('el-input__inner') || classList.contains('el-input__icon')) {
        this.showBlock = !this.showBlock
      } else if (classList.contains('block')) {
        this.showBlock = true
      } else {
        this.showBlock = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.people-input{
  position: relative;
  .el-input{
    /deep/i.el-input__icon{
      font-size: 18px;
    }
  }
  .select-block{
    z-index: 999;
    position: absolute;
    left: 0;
    top: 52px;
    width: 325px;
    background-color: #ffffff;
    border: solid 1px #dddddd;
    padding: 6px 10px 6px;
    border-radius: 3px;
    .block-head{
      display: flex;
      justify-content: space-between;
      padding-bottom: 14px;
      border-bottom: solid 1px #dddddd;
      span{
        font-size: 14px;
        color: #606266;
      }
      .people-form{
        width: 198px;
        display: flex;
        justify-content: space-between;
        .el-select{
          width: 94px;
        }
      }
    }
    .block-foot{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding: 20px 0 4px 0;
    }
  }
}
</style>
