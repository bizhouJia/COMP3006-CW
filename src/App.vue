<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
body,html {
  width: 100%;
  height: 100%;
  background: #F1F2F7;
}
#app {
  width: 100%;
  height: 100%;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
