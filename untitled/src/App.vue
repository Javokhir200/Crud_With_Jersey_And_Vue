<script setup>
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <header>
    <div class="container">
      <h1 class="sps">Bazaar</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/type">Type</RouterLink>
        <RouterLink to="/status">Status</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView/>
</template>

<style scoped>
header {
  background: rgba(54, 54, 54, 0.99);
}

nav {
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  justify-content: center;
  text-align: center;
}

a {
  padding: 20px;
  text-decoration: none;
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
}

a:hover {
  color: aqua;
}

.sps {
  font-size: 2rem;
  color: white;
  margin-left: 1rem;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

h1 {
  margin-bottom: 20px;
}
</style>
