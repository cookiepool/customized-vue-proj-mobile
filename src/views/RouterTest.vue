<template>
  <div class="all-wraper">
    <HeadCommon :title="'路由测试'" />

    <p class="text">路由测试</p>  
  </div>  
</template>

<script>
import HeadCommon from '../components/header/HeadCommon';

export default {
  name: 'RouterTest',
  data() {
    return {

    }
  },
  components: {
    HeadCommon
  }
}
</script>

<style lang="scss">

</style>