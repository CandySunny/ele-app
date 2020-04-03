<template>
  <div class="tab-bar">
      <router-link
        class="tab-item"
        v-for="(item, index) in data"
        :to="item.path"
        :key="index"
        active-class="is-selected"
      >
          <div class="tab-item-icon"><i :class="'fa fa-' + item.icon"></i></div>
          <div class="tab-item-label">{{item.title}}</div>
      </router-link>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  props: {
      data: Array
  }
};
</script>

<style lang="stylus">
    .tab-bar{
        position: fixed;
        bottom: 0;
        display: flex;
        width: 100%;
        height: 45px;
        text-align: center;
        background-color: #fafafa;
    }
    .tab-bar .tab-item{
        display: block;
        padding: 3px 0;
        flex: 1;
        color: #999;
    }
    .tab-bar .tab-item-icon{
        margin-bottom: 5px;
    }
    .tab-bar .tab-item-icon i{
        font-size: 16px;
    }
    .tab-bar .tab-item-label{
        color: inherit;
        font-size: 12px;
        line-height: 1;
    }
    .tab-bar .is-selected{
        color: #009eef;
    }
</style>
