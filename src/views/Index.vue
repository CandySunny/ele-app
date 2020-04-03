<template>
  <div class="index">
      <TabBar
        :data="tabData"
      />
      <router-view />
  </div>
</template>

<script>
import TabBar from '../components/TabBar';

export default {
  name: "index",
  components: {
    TabBar
  },
  data() {
    return {
      tabData: [
        {title: '主页', icon: 'home', path: '/home'},
        {title: '订单', icon: 'file-text-o', path: '/order'},
        {title: '我的', icon: 'user', path: '/me'}
      ]
    }
  }
};
</script>
