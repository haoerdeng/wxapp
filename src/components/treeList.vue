<template>
  <div>
    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      bind:click-nav="onClickNav"
      bind:click-item="onClickItem"
    >
    </van-tree-select>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        item:[
          {
            text:"推荐分类",
            children: ["大分类1", "大分类2"]
          },{
            // 导航名称
            text: "大分类1",
            // 该导航下所有的可选项
            children: [{text:"小1"},{text:"小2"}]
          }, {
            text: "大分类2",
            children: [{text:"小1"},{text:"小2"}]
          }, {
            text:"大分类3",
            children: [{text:"小1"},{text:"小2"}]
          }
        ],
        mainActiveIndex: 0,
        activeId: 1
      }

    },
    props: {
      treeList: {
        type: Array
      }
    },
    onClickNav({ detail }) {
      this.setData({
        mainActiveIndex: detail.index || 0
      });
    },

    onClickItem({ detail }) {
      this.setData({
        activeId: detail.id
      });
    }
  };
</script>

<style scoped>

</style>
