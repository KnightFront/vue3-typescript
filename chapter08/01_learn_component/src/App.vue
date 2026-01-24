<template>
  <div>
    <button v-for="item in tabs" :key="item"
      @click="itemClick(item)"
    >
      {{ item }}
    </button>
    <!-- <template v-if="currentTab === 'home'">
        <Home/>
    </template>
    <template v-if="currentTab === 'about'">
        <About/>
    </template>
    <template v-if="currentTab === 'category'">
        <Category/>
    </template> -->
    <component :is="currentTab"></component>
  </div>
</template>

<script>
import Home from './page/Home.vue';
import About from './page/About.vue';
import Category from './page/Category.vue';
export default {
  name: 'App',
  components: {
    Home,
    About,
    Category
  },
  data () {
    return {
      tabs: ["home", "about", "category"],
      currentTab:"home"
    }
  },
  methods:{
    itemClick(item){
      this.currentTab = item;
    }
  }
}
</script>

<style>
.header, .main, .footer{
  border: 1px solid #999;
  margin-bottom: 4px;
}
</style>
