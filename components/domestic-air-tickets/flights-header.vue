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
          v-model="optionsVal[index]"
          :placeholder="optionsName[index]"
          size="mini"
          :data-type="option"
          @focus="currentSelect=optionsConvert[$event.target.placeholder]"
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
      <el-button type="primary" plain round size="mini" @click="cancelHandler">
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
      optionsKey: ['airport', 'flightTimes', 'company', 'size'],
      optionsVal: ['', '', '', ''],
      optionsConvert: {
        起飞机场: 'org_airport_name',
        起飞时间: 'dep_time',
        航空公司: 'airline_name',
        机型: 'plane_size'
      },
      sizeConvert: {
        大: 'L',
        中: 'M',
        小: 'S'
      },
      currentSelect: ''
    }
  },
  methods: {
    filterHandler (filterOption) {
      if (this.currentSelect === 'plane_size') {
        filterOption = this.sizeConvert[filterOption]
      }
      this.$emit('filter', {
        select: this.currentSelect,
        option: filterOption
      })
    },
    cancelHandler () {
      this.optionsVal = ['', '', '', '']
      this.$emit('cancel')
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
