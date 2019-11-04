<template>
  <div class="hotels-filter">
    <div class="price-slider">
      <div class="price-range">
        <span>价格</span>
        <span>0-{{ price }}</span>
      </div>
      <el-slider
        v-model="price"
        :max="4000"
      />
    </div>
    <div v-for="filter in filterOptions" :key="filter.name" class="hotels-star hotels-select">
      <div class="select">
        <span>{{ filter.name }}</span>
      </div>
      <el-dropdown
        placement="bottom"
        @command="selectOption({
          cKey: filter.key,
          sKey: filter.slug,
          index: $event.index,
          value: $event.id,
          name: $event.name
          })"
      >
        <p
          class="el-dropdown-link"
          :class="{'click-this': filter.clickThis}"
          @click="clickSelect(filter.key)"
        >
          {{ filter.value }}<i class="el-icon-arrow-down el-icon--right" />
        </p>
        <el-dropdown-menu slot="dropdown" style="max-height: 250px; overflow: auto;">
          <el-dropdown-item
            v-for="(option,index) in filter.options"
            :key="option.name"
            :command="{ id: option.id, index: index, name: option.name}"
          >
            <i v-if="filter.optionsBool[index]" class="iconfont iconright-1" />
            <i v-else class="iconfont iconcircle" />
            <span style="display:inline-block;width:100px">{{ option.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      price: 4000,
      filterOptions: {
        levels: {
          name: '住宿星级',
          key: 'levels',
          slug: 'hotellevel',
          options: [],
          optionsBool: [],
          trueCount: 0,
          trueList: [],
          value: '不限',
          clickThis: false
        },
        types: {
          name: '住宿类型',
          key: 'types',
          slug: 'hoteltype',
          options: [],
          optionsBool: [],
          trueCount: 0,
          trueList: [],
          value: '不限',
          clickThis: false
        },
        assets: {
          name: '酒店设施',
          key: 'assets',
          slug: 'hotelasset',
          options: [],
          optionsBool: [],
          trueCount: 0,
          trueList: [],
          value: '不限',
          clickThis: false
        },
        brands: {
          name: '酒店品牌',
          key: 'brands',
          slug: 'hotelbrand',
          options: [],
          optionsBool: [],
          trueCount: 0,
          trueList: [],
          value: '不限',
          clickThis: false
        }
      }
    }
  },
  mounted () {
    this.$axios.get('/hotels/options')
      .then((rsp) => {
        for (const key in rsp.data.data) {
          this.filterOptions[key].options = [...rsp.data.data[key]]
          this.filterOptions[key].optionsBool = rsp.data.data[key].map((element) => {
            return false
          })
        }
        console.log(this.filterOptions)
      })
  },
  methods: {
    clickSelect (selectedKey) {
      for (const key in this.filterOptions) {
        if (key === selectedKey) {
          this.filterOptions[selectedKey].clickThis = true
        } else {
          this.filterOptions[key].clickThis = false
        }
      }
    },
    selectOption (command) {
      const { cKey, index, value, name } = command
      this.filterOptions[cKey].optionsBool[index] = !this.filterOptions[cKey].optionsBool[index]
      if (this.filterOptions[cKey].optionsBool[index]) {
        this.filterOptions[cKey].trueCount++
        this.filterOptions[cKey].trueList.push(value)
      } else {
        this.filterOptions[cKey].trueCount--
        const removeIndex = this.filterOptions[cKey].trueList.findIndex(element => element === value)
        this.filterOptions[cKey].trueList.splice(removeIndex, 1)
      }
      switch (this.filterOptions[cKey].trueCount) {
        case 0:
          this.filterOptions[cKey].value = '不限'
          break
        case 1:
          this.filterOptions[cKey].value = name
          break
        default:
          this.filterOptions[cKey].value = this.filterOptions[cKey].trueCount + '项'
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.click-this{
  border: solid 2px #a6c7ff;
}
.hotels-filter{
  width: 100%;
  border: solid 1px #dddddd;
  padding: 6px;
  margin-bottom: 26px;
  display: flex;
  .price-slider{
    width: 248px;
    padding: 2px 24px 4px 10px;
    .price-range{
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #666666;
      padding-bottom: 2px;
    }
  }
  .hotels-select{
    width: 188px;
    border-left: solid 1px #dddddd;
    padding: 4px 20px;
    .select{
      font-size: 14px;
      color: #666666;
      padding-bottom: 6px;
    }
    .el-dropdown{
      width: 100%;
      >p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: solid 2px #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
