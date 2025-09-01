<script setup>
import { ref, onMounted} from "vue";
    const name = ref('Sasha');
    const status = ref('active');
    const tasks = ref(['Task 1', 'Task 2', 'Task 3']);
    const newTask = ref('');

    const toggleStatus = () => {
      if (status.value === 'active') {
        status.value = 'pending';
      } else if (status.value === 'pending') {
        status.value = 'inactive';
      } else {
        status.value = 'active';
      }
    }
  const addTask = () => {
    if (newTask.value.trim() !== '') {
      tasks.value.push(newTask.value);
      newTask.value ='';
    }
  };

  onMounted(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json();
      task.value = data.map((task) => task.title);
    } catch (error) {
      console.log('Error fetching tasks');
    }
  });
   const deleteTask = (index) => {
      tasks.value.splice(index, 1);

    };
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User is active </p>
  <p v-else-if="status === 'pending'"> User is pending</p>
  <p v-else>User is inactive </p>

  <form @submit.prevent='addTask'>
    <label for="newTask"> Ass Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask" />
    <button type="submit">Submit</button>
  </form>

  <h2>Tasks:</h2>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>
        {{ task }}
      </span>
      <button @click="deleteTask(index)">x</button>
      </li>
  </ul>

  <button @click="toggleStatus"> Change Status</button>
</template>

