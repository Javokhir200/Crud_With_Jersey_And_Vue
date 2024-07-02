<template>
  <div>
    <div class="memo">
      <h1>Types Table</h1>
      <h1><a href="http://localhost:5173/type/add">➕</a></h1>
    </div>
    <div>
      <table class="types-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="type in types" :key="type.id">
          <td>{{ type.id }}</td>
          <td>{{ type.name }}</td>
          <td>
            <a href="#" @click.prevent="confirm(type.id)">
              <span class="delete-icon">🗑</span>
            </a>
          </td>
          <td>
            <a :href="'http://localhost:5173/type/edit?typeId=' + type.id">
              <span class="edit-icon">🖍</span>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="isConfirmed" class="confirm-container">
    <h1>Are you sure you want to delete this type?</h1>
    <div class="links">
      <button @click="deleteById" class="confirm-btn">Yes</button>
      <button @click="cancel" class="cancel-btn">No</button>
    </div>
  </div>
  <div v-if="errorMessage !=null || successMessage != null" class="confirm-container">
    <h3 v-if="errorMessage" class="error-message">{{ errorMessage }}</h3>
    <h3 v-if="successMessage" class="success-message">{{ successMessage }}</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      types: [],
      isConfirmed: false,
      typeId: null,
      errorMessage: null,
      successMessage: null
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/product/type');
        this.types = response.data.data;
      } catch (error) {
        window.location.reload()
      }
    },
    confirm(id) {
      this.isConfirmed = true;
      this.typeId = id;
    },
    cancel() {
      this.isConfirmed = false;
      this.errorMessage = null;
    },
    async sleep(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async deleteById() {
      try {
        const resp = await axios.delete(`http://localhost:8080/product/type/${this.typeId}`);
        this.successMessage = resp.data.text
        this.errorMessage = null;
        await this.fetchData();
        await this.sleep(1500)
        window.location.reload()
      } catch (error) {
        this.errorMessage = 'Cannot delete this type due to existing relationships.';
        await this.sleep(1500)
        this.errorMessage = null;
        this.isConfirmed = false;
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.types-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.types-table th,
.types-table td {
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
  padding: 10px;
}

h2 {
  text-align: left;
  padding: 10px;
}

a {
  text-decoration: none;
  font-size: 2rem;
  color: black;
}

a:hover {
  font-weight: bold;
}

.delete-icon,
.edit-icon {
  cursor: pointer;
}

.links {
  display: flex;
  justify-content: right;
  margin-right: 7px;
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