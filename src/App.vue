<template>
 <div id="app">
  <Header/>
   <div class="link">
        <router-link class="tab" to="/">Today</router-link> |
        <router-link class="tab" to="/history">History</router-link>
    </div>
    <router-view v-slot="{Component}">
      <transition>
        <!-- <keep-alive> -->
          <component :is="Component" :key="$route.name"/>
        <!-- </keep-alive> -->
      </transition>
    </router-view>
 </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style  lang="scss">
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
#app {
  width: 380px;
  height: 580px;
  margin: auto;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
 // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $colorBg;
  border-radius: 1rem;
  backdrop-filter: blur(1.5rem);
  border: 1px solid rgba(#fff,.2);
  box-shadow:
    -.25rem -.25rem .5rem rgba(#fff,.07),
    .25rem .25rem .5rem rgba(#000,.12),
    -.75rem -.75rem 1.75rem rgba(#fff,.07),
    .75rem .75rem 1.75rem rgba(#000,.12),
    inset 8rem 8rem 8rem rgba(#000,.05),
    inset -8rem -8rem 8rem rgba(#fff,.05)
  ;
  .link{
    background: $colorBg;
    color: #fff;
    display: flex;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    a{
      color: #fff;
      text-decoration: none;
      margin: 0px 10px;
        &.router-link-exact-active {
          font-size: 20px;
        }
        &:hover {
          color: rgba($color: #ffffff, $alpha: 0.6);
        }
    }
  }
}
</style>
