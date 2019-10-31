<template>
  <div class="flights" />
</template>

<script>
export default {
  mounted () {
    this.getAirTicketsList(this.$route.query)
  },
  methods: {
    getAirTicketsList (params) {
      this.$axios.get('/airs', { params })
        .then((rsp) => {
          console.log(rsp)
        })
    }
  }
}
</script>

<style>

</style>
