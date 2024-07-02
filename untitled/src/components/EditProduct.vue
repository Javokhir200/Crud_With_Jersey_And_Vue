<template>
  <div class="form-container">
    <h2>Edit Product</h2>
    <form @submit.prevent="updateProduct">
      <div class="form-group">
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" v-model="productName" class="form-control-large"/>
      </div>
      <div class="form-group">
        <label for="productPrice">Price:</label>
        <input type="number" id="productPrice" v-model="productPrice" class="form-control-small"/>
        <span>USD</span>
      </div>
      <div class="form-group">
        <label for="productStatus">Status:</label>
        <select id="productStatus" v-model="productStatus" class="form-control-status">
          <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="productType">Type:</label>
        <select id="productType" v-model="productType" class="form-control-type">
          <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn-submit">Update Product</button>
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

export default {
  data() {
    return {
      productId: null,
      productName: '',
      productPrice: null,
      productStatus: null,
      productType: null,
      errorMessages: null,
      successMessages: null,
      statuses: [],
      types: [],
    };
  },
  methods: {
    async fetchStatuses() {
      try {
        const response = await axios.get('http://localhost:8080/product/status');
        this.statuses = response.data.data
      } catch (error) {
        await this.fetchStatuses()
      }
    },
    async fetchTypes() {
      try {
        const response = await axios.get('http://localhost:8080/product/type');
        this.types = response.data.data
      } catch (error) {
        await this.fetchTypes()
      }
    },
    async updateProduct() {
      try {
        const payload = {
          name: this.productName,
          price: parseFloat(this.productPrice),
          typeId: this.productType,
          statusId: this.productStatus,
        };
        const resp = await axios.put('http://localhost:8080/product/' + this.productId, payload);
        this.successMessages = resp.data.text
        this.errorMessages = null;
      } catch (error) {
        this.errorMessages = error.response.data
        this.successMessages = null;
      }
    },
    async fetchValues() {
      try {
        const response = await axios.get('http://localhost:8080/product/' + this.productId);
        const product = response.data.data;
        this.productName = product.name;
        this.productPrice = parseFloat(product.price);
        this.productType = product.typeId;
        this.productStatus = product.statusId;
      } catch (error) {
        this.errorMessages = error.response.data;
        if (this.errorMessages.text != null)
          this.errorMessages = this.errorMessages.text
        this.successMessages = null;
      }
    },
  },
  mounted() {
    this.productId = this.$route.query.productId;
    this.fetchStatuses();
    this.fetchTypes();
    this.fetchValues();
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
  width: calc(50% - 4px);
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
</style>