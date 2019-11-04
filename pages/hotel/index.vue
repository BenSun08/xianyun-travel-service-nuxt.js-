<template>
  <div class="hotel">
    <div class="hotel-container">
      <hotels-header />
      <hotels-filter />
    </div>
  </div>
</template>

<script>
import hotelsHeader from '@/components/hotel/hotels-header.vue'
import hotelsFilter from '@/components/hotel/hotels-filter.vue'

export default {
  components: {
    hotelsHeader,
    hotelsFilter
  },
  mounted () {
    this.$axios.get('/hotels', {
      params: { city: this.$route.query.citId }
    })
      .then((rsp) => {
        // console.log(rsp)
      })
  }
}
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.hotel{
  .hotel-container{
    width: 1000px;
    margin: 0 auto;
  }
}
</style>
