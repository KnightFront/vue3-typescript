<template>
  <div>
    <div class="header">
      <h4>Header</h4>
      <h4>Navbar</h4>
    </div>
    <div class="main">
      <h4>Banner轮播图内容</h4>
      <ul>
        <li>商品信息1</li>
        <li>商品信息2</li>
        <li>商品信息3</li>
        <li>商品信息4</li>
        <li>商品信息5</li>
      </ul>
    </div>
    <div class="footer">
      <h4>footer</h4>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'App',
    components: {}
  }
</script>

<style>
  .header,
  .main,
  .footer {
    border: 1px solid #999;
    margin-bottom: 4px;
  }
</style>