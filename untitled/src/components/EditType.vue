<template>
  <div class="form-container">
    <h2>Edit Type</h2>
    <form @submit.prevent="updateType">
      <div class="form-group">
        <label for="typeName">Type Name:</label>
        <input required type="text" id="typeName" placeholder="Enter the new name" name="typeName"
               class="form-control-large" v-model="typeName">
      </div>
      <div class="form-group">
        <button type="submit" class="btn-submit">Update Type</button>
      </div>
      <ul>
        <li v-if="errorMessages" class="error-messages">{{ errorMessages }}</li>
        <li v-if="successMessages" class="success-messages">{{ successMessages }}<br><a
            href="http://localhost:5173/type">Back to table</a></li>
      </ul>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      typeId: null,
      typeName: null,
      errorMessages: null,
      successMessages: null
    };
  },
  methods: {
    async updateType() {
      try {
        const payload = {
          name: this.typeName,
        };
        const resp = await axios.put(`http://localhost:8080/product/type/${this.typeId}`, payload);
        this.successMessages = resp.data.text
        this.errorMessages = null;
      } catch (error) {
        this.errorMessages = error.response.data;
        if (this.errorMessages.text != null)
          this.errorMessages = this.errorMessages.text
        this.successMessages = null;
      }
    },
    async fetchValues(){
      try {
        const response = await axios.get('http://localhost:8080/product/type/' + this.typeId);
        const type = response.data.data;
        this.typeName = type.name;
      } catch (error) {
        this.errorMessages = error.response.data;
        if (this.errorMessages.text != null)
          this.errorMessages = this.errorMessages.text
        this.successMessages = null;
      }
    }
  },
  mounted() {
    this.typeId = this.$route.query.typeId;
    this.fetchValues()
  }
}
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

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
