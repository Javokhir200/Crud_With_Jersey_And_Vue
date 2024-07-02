<template>
  <div>
    <div class="memo">
      <h1>Products Table</h1>
      <h1><a href="http://localhost:5173/add">➕</a></h1>
    </div>
    <div>
      <table class="products-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Status</th>
          <th>Type</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}$</td>
          <td>{{ product.status }}</td>
          <td>{{ product.type }}</td>
          <td>
            <a href="#" @click.prevent="confirm(product.id)">🗑</a>
          </td>
          <td>
            <a :href="'http://localhost:5173/edit?productId=' + product.id">🖍</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="isConfirmed" class="confirm-container">
    <h1>Are you sure you want to delete this product?</h1>
    <div class="links">
      <button @click="deleteProductById" class="confirm-btn">Yes</button>
      <button @click="cancel" class="cancel-btn">No</button>
    </div>
  </div>
  <div v-if="errorMessage || successMessage" class="confirm-container">
    <h3 v-if="errorMessage" class="error-message">{{ errorMessage }}</h3>
    <h3 v-if="successMessage" class="success-message">{{ successMessage }}</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      isConfirmed: false,
      deletedId: null,
      errorMessage: null,
      successMessage: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/product');
        this.products = response.data.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    confirm(id) {
      this.isConfirmed = true;
      this.deletedId = id;
    },
    cancel() {
      this.isConfirmed = false;
      this.errorMessage = null;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async deleteProductById() {
      try {
        const resp = await axios.delete(`http://localhost:8080/product/${this.deletedId}`);
        this.isConfirmed = false;
        this.errorMessage = null;
        this.successMessage = resp.data.text;
        await this.fetchData();
        await this.sleep(1500);
      } catch (error) {
        this.errorMessage = 'Cannot delete this product due to existing relationships.';
        this.successMessage = null;
        await this.sleep(1500);
      } finally {
        window.location.reload();
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.products-table th,
.products-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.memo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

h1 {
  text-decoration: none;
  font-size: 1.5rem;
  padding: 20px;
}
h2 {
  text-align: left;
  padding: 10px;
}
.links {
  display: flex;
  justify-content: right;
  margin-right: 7px;
}

a {
  text-decoration: none;
  font-size: 2rem;
  color: black;
}

a:hover {
  font-weight: bold;
}

.products-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.products-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.products-table tr:hover {
  background-color: #f1f1f1;
}

.confirm-container {
  position: fixed;
  top: 5%;
  left: 30%;
  right: 30%;
  transition: 0.5s ease;
  background-color: white;
  box-shadow: 0 0 10px #606060;
  border: solid 1px #606060;
  flex-direction: column;
  height: 20%;
  text-align: center;
  border-radius: 15px;
}

.confirm-btn,
.cancel-btn {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.confirm-btn {
  background-color: #4caf50;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.confirm-btn:hover,
.cancel-btn:hover {
  opacity: 0.9;
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
