<template>
  <v-container fluid>
    <!-- Data Table Section -->
    <v-data-table
      :headers="headers"
      :items="list_of_members"
      class="elevation-1"
      item-value="dodid"
      dense
      :loading="isLoading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Master Roster</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="refreshData">Refresh Data</v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define the headers for the data table
const headers = ref([
  { title: 'DOD ID', value: 'dodid' },
  { title: 'First Name', value: 'first_name' },
  { title: 'Last Name', value: 'last_name' },
  { title: 'Rank', value: 'rank' },
  { title: 'Gender', value: 'gender' },
  { title: 'Unit', value: 'unit' },
  { title: 'Status', value: 'status' },
  { title: 'Security Clearance', value: 'sec_clearance' },
  { title: 'Adjudication Date', value: 'adjudication_date' },
]);

// Sample data for the table
const list_of_members = ref();
const isLoading = ref(false);

// Function to fetch data from the backend
const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:3000/api/roster'); // Replace with your API URL
    const data = await response.json();
    list_of_members.value = data; // Populate list_of_members with the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchData();
});

// Function to refresh data
const refreshData = () => {
  console.log('Refreshing data...');
  fetchData(); // Re-fetch data
};
</script>

<style>
/* Add any custom styles for the data table here */
</style>