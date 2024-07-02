<template>
  <div>
    <div class="form-container">
      <h2>Add Product</h2>
      <form @submit.prevent="createProduct">
        <div class="form-group">
          <label for="productName">Product Name:</label>
          <input type="text" id="productName" class="form-control-large" v-model="productName"/>
        </div>
        <div class="form-group">
          <label for="productPrice">Price:</label>
          <input type="number" id="productPrice" class="form-control-small" v-model="productPrice"/>
          <span>USD</span>
        </div>
        <div class="form-group">
          <label for="productStatus">Status:</label>
          <select id="productStatus" class="form-control-status" v-model="productStatus">
            <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="productType">Type:</label>
          <select id="productType" class="form-control-type" v-model="productType">
            <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn-submit">Add Product</button>
        </div>
      </form>
    </div>
  </div>
  <div class="confirm-container" v-if="isConfirmed">
      <h3 v-if="errorMessages != null" class="error-message">{{ errorMessages }}</h3>
      <h3 v-if="successMessages != null" class="success-message">{{ successMessages }}</h3>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index.js'
export default {
  data() {
    return {
      productName: '',
      productPrice: null,
      productStatus: null,
      productType: null,
      errorMessages: null,
      successMessages: null,
      isConfirmed: false,
      statuses: [],
      types: [],
    };
  },
  methods: {
    async fetchStatuses() {
      try {
        const response = await axios.get('http://localhost:8080/product/status');
        this.statuses = response.data.data;
      } catch (error) {
        await this.fetchStatuses()
      }
    },
    async fetchTypes() {
      try {
        const response = await axios.get('http://localhost:8080/product/type');
        this.types = response.data.data;
      } catch (error) {
        await this.fetchTypes()
      }
    },
    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async createProduct() {
      try {
        const payload = {
          name: this.productName,
          price: parseFloat(this.productPrice),
          typeId: this.productType,
          statusId: this.productStatus,
        };
        const response = await axios.post('http://localhost:8080/product', payload);
        this.successMessages = response.data.text
        this.errorMessages = null;
        this.isConfirmed = true;
        await this.sleep(1500)
        await router.push("/")
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
    },
  },
  mounted() {
    this.fetchTypes();
    this.fetchStatuses();
  },
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
.confirm-container {
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

.form-group .form-control-small {
  width: calc(50% - 4px);
  display: inline-block;
  margin-right: 8px;
}

.form-group .form-control-large {
  width: calc(100% - 4px);
  display: inline-block;
}

.form-group .form-control-status {
  width: 300px;
  display: inline-block;
  margin-right: 8px;
}

.form-group .form-control-type {
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

.error-message {
  color: red;
  list-style: none;
  padding-left: 0;
}

.success-message {
  color: green;
  list-style: none;
  padding-left: 0;
}
</style>
