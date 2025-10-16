<template>
  <div class="container mt-4">
    <h1 class="mb-4">Part Comparison</h1>
    <div v-if="part1 && part2" class="row">
      <div class="col-md-6">
        <h2>{{ part1.name }}</h2>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Brand</th>
              <td>{{ part1.brand }}</td>
            </tr>
            <tr>
              <th scope="row">Type</th>
              <td>{{ part1.type }}</td>
            </tr>
            <tr>
              <th scope="row">Price</th>
              <td>₱{{ part1.price }}</td>
            </tr>
            <tr v-for="(spec, key) in part1.specs" :key="key">
              <th scope="row">{{ key }}</th>
              <td>{{ spec }}</td>
            </tr>
            <tr v-if="part1.type === 'GPU' && part1.gpu_cores">
              <th scope="row">GPU Cores</th>
              <td>{{ part1.gpu_cores }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h2>{{ part2.name }}</h2>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Brand</th>
              <td>{{ part2.brand }}</td>
            </tr>
            <tr>
              <th scope="row">Type</th>
              <td>{{ part2.type }}</td>
            </tr>
            <tr>
              <th scope="row">Price</th>
              <td>₱{{ part2.price }}</td>
            </tr>
            <tr v-for="(spec, key) in part2.specs" :key="key">
              <th scope="row">{{ key }}</th>
              <td>{{ spec }}</td>
            </tr>
            <tr v-if="part2.type === 'GPU' && part2.gpu_cores">
              <th scope="row">GPU Cores</th>
              <td>{{ part2.gpu_cores }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-12 mt-4">
        <h3>Comparison Analysis</h3>
        <div v-if="comparisonResults.length > 0">
          <ul class="list-group">
            <li v-for="(result, index) in comparisonResults" :key="index" class="list-group-item">
              <span v-html="result"></span>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No specific comparison criteria available for these part types or specs.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading comparison...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const part1 = ref(null);
const part2 = ref(null);
const comparisonResults = ref([]);

const API_URL = "http://localhost:5000/api";

const fetchPart = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/parts/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching part ${id}:`, err);
    return null;
  }
};

const compareParts = (p1, p2) => {
  const results = [];

  // General comparison: Price
  if (p1.price < p2.price) {
    results.push(`${p1.name} is **cheaper** at ₱${p1.price} compared to ${p2.name} at ₱${p2.price}.`);
  } else if (p2.price < p1.price) {
    results.push(`${p2.name} is **cheaper** at ₱${p2.price} compared to ${p1.name} at ₱${p1.price}.`);
  } else {
    results.push(`Both parts have the **same price** of ₱${p1.price}.`);
  }

  // Type-specific comparisons
  if (p1.type === 'CPU' && p2.type === 'CPU') {
    if (p1.specs.cores && p2.specs.cores) {
      if (p1.specs.cores > p2.specs.cores) {
        results.push(`${p1.name} has **more cores** (${p1.specs.cores}) than ${p2.name} (${p2.specs.cores}).`);
      } else if (p2.specs.cores > p1.specs.cores) {
        results.push(`${p2.name} has **more cores** (${p2.specs.cores}) than ${p1.name} (${p1.specs.cores}).`);
      }
    }
    if (p1.specs.threads && p2.specs.threads) {
      if (p1.specs.threads > p2.specs.threads) {
        results.push(`${p1.name} has **more threads** (${p1.specs.threads}) than ${p2.name} (${p2.specs.threads}).`);
      } else if (p2.specs.threads > p1.specs.threads) {
        results.push(`${p2.name} has **more threads** (${p2.specs.threads}) than ${p1.name} (${p1.specs.threads}).`);
      }
    }
  } else if (p1.type === 'GPU' && p2.type === 'GPU') {
    // Assuming memory is a string like '10GB GDDR6X', extract number for comparison
    const getMemorySize = (mem) => {
      if (typeof mem === 'number') {
        return mem;
      }
      if (typeof mem === 'string') {
        return parseInt(mem.match(/\d+/)?.[0] || 0);
      }
      return 0;
    };
    const p1Memory = getMemorySize(p1.specs.memory || '');
    const p2Memory = getMemorySize(p2.specs.memory || '');

    if (p1Memory > p2Memory) {
      results.push(`${p1.name} has **more VRAM** (${p1.specs.memory}) than ${p2.name} (${p2.specs.memory}).`);
    } else if (p2Memory > p1Memory) {
      results.push(`${p2.name} has **more VRAM** (${p2.specs.memory}) than ${p1.name} (${p1.specs.memory}).`);
    }

    if (p1.gpu_cores && p2.gpu_cores) {
      if (p1.gpu_cores > p2.gpu_cores) {
        results.push(`${p1.name} has **more GPU Cores** (${p1.gpu_cores}) than ${p2.name} (${p2.gpu_cores}).`);
      } else if (p2.gpu_cores > p1.gpu_cores) {
        results.push(`${p2.name} has **more GPU Cores** (${p2.gpu_cores}) than ${p1.name} (${p1.gpu_cores}).`);
      }
    }
  } 
  
  if (p1.type === 'RAM' && p2.type === 'RAM') {
    const getSpeed = (speed) => parseInt(speed.match(/\d+/)?.[0] || 0);
    const p1Speed = getSpeed(p1.specs.speed || '');
    const p2Speed = getSpeed(p2.specs.speed || '');

    if (p1Speed > p2Speed) {
      results.push(`${p1.name} has **faster speed** (${p1.specs.speed}) than ${p2.name} (${p2.specs.speed}).`);
    } else if (p2Speed > p1Speed) {
      results.push(`${p2.name} has **faster speed** (${p2.specs.speed}) than ${p1.name} (${p1.specs.speed}).`);
    }
    if (p1.specs.capacity && p2.specs.capacity) {
      const getCapacity = (cap) => parseInt(cap.match(/\d+/)?.[0] || 0);
      const p1Capacity = getCapacity(p1.specs.capacity || '');
      const p2Capacity = getCapacity(p2.specs.capacity || '');

      if (p1Capacity > p2Capacity) {
        results.push(`${p1.name} has **higher capacity** (${p1.specs.capacity}) than ${p2.name} (${p2.specs.capacity}).`);
      } else if (p2Capacity > p1Capacity) {
        results.push(`${p2.name} has **higher capacity** (${p2.specs.capacity}) than ${p1.name} (${p1.specs.capacity}).`);
      }
    }
  } else if (p1.type === 'Storage' && p2.type === 'Storage') {
    if (p1.specs.capacity && p2.specs.capacity) {
      const getCapacity = (cap) => parseInt(cap.match(/\d+/)?.[0] || 0);
      const p1Capacity = getCapacity(p1.specs.capacity || '');
      const p2Capacity = getCapacity(p2.specs.capacity || '');

      if (p1Capacity > p2Capacity) {
        results.push(`${p1.name} has **higher capacity** (${p1.specs.capacity}) than ${p2.name} (${p2.specs.capacity}).`);
      } else if (p2Capacity > p1Capacity) {
        results.push(`${p2.name} has **higher capacity** (${p2.specs.capacity}) than ${p1.name} (${p1.specs.capacity}).`);
      }
    }
    if (p1.specs.type && p2.specs.type) {
      if (p1.specs.type.includes('SSD') && !p2.specs.type.includes('SSD')) {
        results.push(`${p1.name} is an **SSD**, which is generally faster than ${p2.name} (${p2.specs.type}).`);
      } else if (!p1.specs.type.includes('SSD') && p2.specs.type.includes('SSD')) {
        results.push(`${p2.name} is an **SSD**, which is generally faster than ${p1.name} (${p1.specs.type}).`);
      }
      
      if (p1.specs.type === p2.specs.type) {
        results.push(`Both drives are of the same type: **${p1.specs.type}**`);
      }
    }
    
    // Compare write speeds if available
    if (p1.specs.write_speed && p2.specs.write_speed) {
      const p1Speed = parseInt(p1.specs.write_speed);
      const p2Speed = parseInt(p2.specs.write_speed);
      
      if (p1Speed > p2Speed) {
        results.push(`${p1.name} has **faster write speed** (${p1.specs.write_speed} MB/s) compared to ${p2.name} (${p2.specs.write_speed} MB/s).`);
      } else if (p2Speed > p1Speed) {
        results.push(`${p2.name} has **faster write speed** (${p2.specs.write_speed} MB/s) compared to ${p1.name} (${p1.specs.write_speed} MB/s).`);
      } else {
        results.push(`Both drives have the same write speed: **${p1.specs.write_speed} MB/s**`);
      }
    }
  } else if (p1.type === 'Motherboard' && p2.type === 'Motherboard') {
    const getRamSpeed = (speed) => parseInt(speed.match(/\d+/g)?.join('') || 0);
    const p1RamSpeed = getRamSpeed(p1.specs.ram_speed || '');
    const p2RamSpeed = getRamSpeed(p2.specs.ram_speed || '');

    if (p1RamSpeed > p2RamSpeed) {
      results.push(`${p1.name} has **faster RAM speed** (${p1.specs.ram_speed}) compared to ${p2.name} (${p2.specs.ram_speed}).`);
    } else if (p2RamSpeed > p1RamSpeed) {
      results.push(`${p2.name} has **faster RAM speed** (${p2.specs.ram_speed}) compared to ${p1.name} (${p1.specs.ram_speed}).`);
    }
  } else if (p1.type === 'PSU' && p2.type === 'PSU') {
    const getWattage = (wattage) => parseInt(wattage.match(/\d+/)?.[0] || 0);
    const p1Wattage = getWattage(p1.specs.wattage || '');
    const p2Wattage = getWattage(p2.specs.wattage || '');

    if (p1Wattage > p2Wattage) {
      results.push(`${p1.name} has **higher wattage** (${p1.specs.wattage}) than ${p2.name} (${p2.specs.wattage}).`);
    } else if (p2Wattage > p1Wattage) {
      results.push(`${p2.name} has **higher wattage** (${p2.specs.wattage}) than ${p1.name} (${p1.specs.wattage}).`);
    }

    // Assuming efficiency is a string like '80 Plus Gold' or a number
    // For simplicity, we'll compare them directly. More complex parsing might be needed for '80 Plus' ratings.
    if (p1.specs.efficiency && p2.specs.efficiency) {
      // A simple string comparison might not be ideal for '80 Plus Gold' vs '80 Plus Bronze'
      // For now, assuming a direct comparison is sufficient or efficiency is a numerical value.
      if (p1.specs.efficiency > p2.specs.efficiency) {
        results.push(`${p1.name} has **better efficiency** (${p1.specs.efficiency}) than ${p2.name} (${p2.specs.efficiency}).`);
      } else if (p2.specs.efficiency > p1.specs.efficiency) {
        results.push(`${p2.name} has **better efficiency** (${p2.specs.efficiency}) than ${p1.name} (${p1.specs.efficiency}).`);
      }
    }
  }

  return results;
};

onMounted(async () => {
  const { part1: part1Id, part2: part2Id } = route.query;
  if (part1Id && part2Id) {
    [part1.value, part2.value] = await Promise.all([
      fetchPart(part1Id),
      fetchPart(part2Id),
    ]);
    if (part1.value && part2.value && part1.value.type === part2.value.type) {
      comparisonResults.value = compareParts(part1.value, part2.value);
    } else if (part1.value && part2.value && part1.value.type !== part2.value.type) {
      comparisonResults.value.push('Cannot compare parts of different types.');
    }
  }
});
</script>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.list-group {
  margin-top: 1rem;
}

.list-group-item {
  padding: 0.75rem 1.25rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  background-color: #f8f9fa;
}
</style>
