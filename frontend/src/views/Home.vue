<template>
  <div class="container mt-4">
    <div class="row mb-4">
      <div class="col">
        <h3>Compare Parts</h3>
        <ul class="list-group">
          <li v-for="p in comparisonParts" :key="p._id" class="list-group-item">
            {{ p.name }}
          </li>
        </ul>
        <button
          class="btn btn-info mt-3"
          @click="goToComparison"
          :disabled="comparisonParts.length !== 2"
        >
          Compare
        </button>
      </div>
    </div>

    <h1 class="mb-4">Select Parts</h1>

    <!-- Filter and Search Form -->
    <div class="row mb-4">
      <div class="col-md-3">
        <input type="text" class="form-control" placeholder="Search by name..." v-model="searchQuery">
      </div>
      <div class="col-md-2">
        <select class="form-control" v-model="selectedCategory">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-control" v-model="selectedBrand">
          <option value="">All Brands</option>
          <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
        </select>
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control" placeholder="Min price" v-model.number="minPrice">
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control" placeholder="Max price" v-model.number="maxPrice">
      </div>
    </div>

    <div class="row">
      <PartCard
        v-for="part in filteredParts"
        :key="part._id"
        :part="part"
        @select-part="addPartToBuild"
        @add-to-compare="addToCompare"
      />
    </div>

    <div class="mt-4">
      <h3>Selected Parts</h3>
      <ul class="list-group">
        <li v-for="p in selectedParts" :key="p._id" class="list-group-item">
          {{ p.name }} - ₱{{ p.price }} ({{ p.type }})
          <button class="btn btn-danger btn-sm float-end" @click="removePartFromBuild(p._id)">Remove</button>
        </li>
      </ul>
      <div class="mt-3">
        <label for="buildName" class="form-label">Build Name:</label>
        <input type="text" class="form-control" id="buildName" v-model="buildName" placeholder="Enter build name">
      </div>
      <button
        class="btn btn-success mt-3"
        @click="createBuild"
        :disabled="selectedParts.length === 0 || !buildName"
      >
        Save Build
      </button>
      <div v-if="buildErrors.length" class="alert alert-danger mt-3">
        <p>Failed to save build:</p>
        <ul>
          <li v-for="(error, index) in buildErrors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import PartCard from "../components/PartCard.vue";
import axios from "axios";

const parts = ref([]);
const selectedParts = ref([]);
const comparisonParts = ref([]);
const router = useRouter();

const searchQuery = ref('');
const selectedCategory = ref('');
const selectedBrand = ref('');
const minPrice = ref(null);
const maxPrice = ref(null);

const API_URL = "http://localhost:5000/api";

const fetchParts = async () => {
  try {
    const res = await axios.get(`${API_URL}/parts`);
    parts.value = res.data;
  } catch (err) {
    console.error("Error fetching parts:", err);
  }
};

const categories = computed(() => {
  const allCategories = parts.value.map(p => p.type);
  return [...new Set(allCategories)];
});

const brands = computed(() => {
  const allBrands = parts.value.map(p => p.brand);
  return [...new Set(allBrands)];
});

const filteredParts = computed(() => {
  return parts.value.filter(part => {
    const nameMatch = part.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const categoryMatch = selectedCategory.value ? part.type === selectedCategory.value : true;
    const brandMatch = selectedBrand.value ? part.brand === selectedBrand.value : true;
    const minPriceMatch = minPrice.value ? part.price >= minPrice.value : true;
    const maxPriceMatch = maxPrice.value ? part.price <= maxPrice.value : true;
    return nameMatch && categoryMatch && brandMatch && minPriceMatch && maxPriceMatch;
  });
});

const addPartToBuild = (part) => {
  if (!selectedParts.value.some(p => p._id === part._id)) {
    selectedParts.value.push(part);
  }
};

const addToCompare = (part) => {
  if (comparisonParts.value.length < 2 && !comparisonParts.value.some(p => p._id === part._id)) {
    comparisonParts.value.push(part);
  } else if (comparisonParts.value.some(p => p._id === part._id)) {
    comparisonParts.value = comparisonParts.value.filter(p => p._id !== part._id);
  }
};

const goToComparison = () => {
  if (comparisonParts.value.length === 2) {
    router.push({
      name: 'Compare',
      query: {
        part1: comparisonParts.value[0]._id,
        part2: comparisonParts.value[1]._id,
      },
    });
  }
};

const buildName = ref('');
const buildErrors = ref([]);

const removePartFromBuild = (partId) => {
  selectedParts.value = selectedParts.value.filter(p => p._id !== partId);
};

const createBuild = async () => {
  buildErrors.value = []; // Clear previous errors
  let buildPrice = 0;
  const buildBody = {
    name: buildName.value,
    description: "", // Optional description
    userId: "65231711202e08a1131920a6", // Hardcoded user ID from seed.js for demonstration
    cpu: null,
    gpu: null,
    motherboard: null,
    psu: null,
    ram: [],
    storage: [],
  };

  selectedParts.value.forEach(part => {
    buildPrice += part.price;
    const embeddedPart = {
      componentId: part._id,
      name: part.name,
      type: part.type,
      brand: part.brand,
      price: part.price,
      specs: part.specs,
    };

    switch (part.type) {
      case 'CPU':
        buildBody.cpu = embeddedPart;
        break;
      case 'GPU':
        buildBody.gpu = embeddedPart;
        break;
      case 'Motherboard':
        buildBody.motherboard = embeddedPart;
        break;
      case 'PSU':
        buildBody.psu = embeddedPart;
        break;
      case 'RAM':
        buildBody.ram.push(embeddedPart);
        break;
      case 'Storage':
        buildBody.storage.push(embeddedPart);
        break;
      default:
        console.warn(`Unknown part type: ${part.type}`);
    }
  });

  buildBody.buildPrice = buildPrice;

  try {
    const res = await axios.post(`${API_URL}/builds`, buildBody);
    alert(`Build created! ID: ${res.data._id}`);
    selectedParts.value = [];
    buildName.value = '';
  } catch (err) {
    console.error("Error creating build:", err);
    if (err.response && err.response.data && err.response.data.errors) {
      buildErrors.value = err.response.data.errors;
    } else {
      buildErrors.value.push("An unexpected error occurred while saving the build.");
    }
  }
};

onMounted(fetchParts);
</script>
