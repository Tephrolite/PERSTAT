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
          <v-btn color="success" @click="saveChanges">Save Changes</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:body="{ items }">
        <tr v-for="(item, index) in list_of_members" :key="item.dodid">
            <td>
                <v-text-field disabled v-model="item.dodid" dense hide-details></v-text-field>
            </td>
          <td>
            <v-text-field v-model="item.first_name" dense hide-details></v-text-field>
          </td>
          <td>
            <v-text-field v-model="item.last_name" dense hide-details></v-text-field>
          </td>
          <td>
            <v-text-field v-model="item.rank" dense hide-details></v-text-field>
          </td>
          <td>
            <v-text-field v-model="item.gender" dense hide-details></v-text-field>
          </td>
          <td>
            <v-text-field v-model="item.unit" dense hide-details></v-text-field>
          </td>
          <td>
            <v-text-field v-model="item.status" dense hide-details></v-text-field>
          </td>
          <td>
            <v-text-field v-model="item.sec_clearance" dense hide-details></v-text-field>
          </td>
          <td>
            <v-text-field v-model="item.adjudication_date" dense hide-details></v-text-field>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define the headers for the data table
const headers = ref([
  { title: 'DOD ID', value: 'dodid', sortable: true },
  { title: 'First Name', value: 'first_name', sortable: true },
  { title: 'Last Name', value: 'last_name', sortable: true },
  { title: 'Rank', value: 'rank', sortable: true },
  { title: 'Gender', value: 'gender', sortable: true },
  { title: 'Unit', value: 'unit', sortable: true },
  { title: 'Status', value: 'status', sortable: true },
  { title: 'Security Clearance', value: 'sec_clearance', sortable: true },
  { title: 'Adjudication Date', value: 'adjudication_date', sortable: true },
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

// Function to save changes
const saveChanges = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/roster', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list_of_members.value), // Send the updated data
    });

    if (!response.ok) {
      throw new Error('Failed to save changes');
    }

    console.log('Changes saved successfully');
  } catch (error) {
    console.error('Error saving changes:', error);
  }
};
</script>

<style>
/* Add any custom styles for the data table here */
</style>