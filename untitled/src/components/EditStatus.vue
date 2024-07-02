<template>
  <div class="form-container">
    <h2>Edit Status</h2>
    <form @submit.prevent="updateStatus">
      <div class="form-group">
        <label for="statusName">Status Name:</label>
        <input required type="text" id="statusName" placeholder="Enter the new name" name="statusName"
               class="form-control-large" v-model="statusName">
      </div>
      <div class="form-group">
        <button type="submit" class="btn-submit">Update Status</button>
      </div>
      <ul>
        <li v-if="errorMessages != null" class="error-messages">{{ errorMessages }}</li>
        <li v-if="successMessages != null" class="success-messages">{{ successMessages }}<br><router-link :to="{ path: '/status' }">Back to table</router-link></li>
      </ul>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      statusId: null,
      statusName: '',
      errorMessages: null,
      successMessages: null
    };
  },
  methods: {
    async updateStatus() {
      try {
        const payload = {
          name: this.statusName,
        };
        const resp = await axios.put(`http://localhost:8080/product/status/${this.statusId}`, payload);
        this.successMessages = resp.data.text;
        this.errorMessages = null;
      } catch (error) {
        if (error.response.data.text != null)
          this.errorMessages = error.response.data.text
        this.successMessages = null;
      }
    },
    async fetchValues() {
      try {
        const response = await axios.get(`http://localhost:8080/product/status/${this.statusId}`);
        const status = response.data.data;
        this.statusName = status.name;
      } catch (error) {
        this.errorMessages = error.response.data.text || 'Failed to fetch status details.';
        this.successMessages = null;
      }
    }
  },
  mounted() {
    this.statusId = this.$route.query.statusId;
    this.fetchValues();
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

.btn-submit {
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

.btn-submit:hover {
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
