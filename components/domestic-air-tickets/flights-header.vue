<template>
  <div class="flights-header">
    <div class="flights-head">
      <div class="flights-info">
        单程：{{ info.departCity }}&nbsp;-&nbsp;{{ info.destCity }}&nbsp;/&nbsp;{{ info.departDate }}
      </div>
      <div class="flights-options">
        <el-select
          v-for="(option,index) in optionsKey"
          :key="option"
          v-model="filter[option]"
          clearable
          :placeholder="optionsName[index]"
          size="mini"
          :data-type="option"
          @change="filterHandler"
        >
          <el-option
            v-for="(item,innerIndex) in options[option]"
            :key="innerIndex"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
    </div>
    <div class="flights-filter">
      筛选：
      <el-button type="primary" plain round size="mini">
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    filter: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      optionsName: ['起飞机场', '起飞时间', '航空公司', '机型'],
      optionsKey: ['airport', 'flightTimes', 'company', 'size']
    }
  },
  methods: {
    filterHandler (filterOption) {
      this.$emit('filter', filterOption)
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.flights-header{
  .flights-head{
    display: flex;
    justify-content: space-between;
    .flights-info{
      font-size: 14px;
      display: flex;
      align-items: center;
    }
    .flights-options{
      .el-select{
        width: 114px;
        margin-left: 10px;
      }
    }
  }
  .flights-filter{
    font-size: 14px;
    margin: 10px 0 20px;
  }
}
</style>
