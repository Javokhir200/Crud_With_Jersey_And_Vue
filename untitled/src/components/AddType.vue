<template>
  <div class="form-container">
    <h2>Add type</h2>
    <form @submit.prevent="created">
      <div class="form-group">
        <label for="typeName">Type Name:</label>
        <input type="text" id="typeName" name="typeName" required placeholder="Enter the type name"
               class="form-control-large" v-model="typeName">
      </div>
      <div class="form-group">
        <button class="btn-submit">Add type</button>
      </div>
    </form>
  </div>
  <div class="confirm-container" v-if="isConfirmed">
      <h3 v-if="errorMessages != null" class="error-messages">{{ errorMessages }}</h3>
      <h3 v-if="successMessages != null" class="success-messages">{{ successMessages }}</h3>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index.js'

export default {
  data() {
    return {
      name: null,
      errorMessages: null,
      successMessages: null,
      isConfirmed: false
    };
  },
  methods: {
    async created() {
      try {
        const payload = {
          name: this.typeName,
        };
        let resp = await axios.post("http://localhost:8080/product/type", payload);
        this.successMessages = resp.data.text
        this.errorMessages = null;
        this.isConfirmed = true
        await this.sleep(1500)
        await router.push("/type")
      } catch (error) {
        this.errorMessages = error.response.data;
        if (this.errorMessages.text != null)
          this.errorMessages = this.errorMessages.text
        this.isConfirmed = true
        await this.sleep(1500)
        this.successMessages = null;
      }finally {
        this.isConfirmed = false
      }
    },async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group select {
  cursor: pointer;
}

.form-group{
  width: calc(50% - 4px);
  display: inline-block;
  margin-right: 8px;
}

.form-group .form-control-large {
  width: calc(100% - 4px);
  display: inline-block;
}

.form-group {
  width: calc(50% - 4px);
  display: inline-block;
  margin-right: 8px;
}

.form-group {
  width: calc(100% - 4px);
  display: inline-block;
}

.form-group .btn-submit {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.form-group .btn-submit:hover {
  background-color: #45a049;
}

.error-messages {
  color: red;
  list-style: none;
  padding-left: 0;
}

.success-messages {
  color: green;
  list-style: none;
  padding-left: 0;
}
.form-container {
  max-width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
}
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group select {
  cursor: pointer;
}
.confirm-container{
  position: fixed;
  top: 5%;
  left: 40%;
  right: 40%;
  transition: 0.5s ease;
  background-color: white;
  box-shadow: 0 0 10px #606060;
  border: solid 1px #606060;
  flex-direction: column;
  height: 20%;
  text-align: center;
  border-radius: 15px;
}
.form-group{
  width: calc(50% - 4px);
  display: inline-block;
  margin-right: 8px;
}

.form-group .form-control-large {
  width: calc(100% - 4px);
  display: inline-block;
}

.form-group{
  width: 300px;
  display: inline-block;
  margin-right: 8px;
}

.form-group{
  width: calc(100% - 4px);
  display: inline-block;
}

.form-group .btn-submit {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.form-group .btn-submit:hover {
  background-color: #45a049;
}
</style>