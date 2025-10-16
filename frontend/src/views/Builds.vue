<template>
  <div class="container mt-4">
    <h1 class="mb-4">All Builds</h1>
    <div class="row">
      <div
        v-for="build in builds"
        :key="build._id"
        class="col-md-6 col-lg-4 mb-3"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ build.name }}</h5>
            <ul class="list-group list-group-flush">
              <li
                v-if="build.cpu"
                class="list-group-item"
              >
                CPU: {{ build.cpu.name }} - ₱{{ build.cpu.price }}
              </li>
              <li
                v-if="build.gpu"
                class="list-group-item"
              >
                GPU: {{ build.gpu.name }} - ₱{{ build.gpu.price }}
              </li>
              <li
                v-if="build.motherboard"
                class="list-group-item"
              >
                Motherboard: {{ build.motherboard.name }} - ₱{{ build.motherboard.price }}
              </li>
              <li
                v-if="build.psu"
                class="list-group-item"
              >
                PSU: {{ build.psu.name }} - ₱{{ build.psu.price }}
              </li>
              <li
                v-for="(ram, index) in build.ram"
                :key="`ram-${index}`"
                class="list-group-item"
              >
                RAM: {{ ram.name }} - ₱{{ ram.price }}
              </li>
              <li
                v-for="(storage, index) in build.storage"
                :key="`storage-${index}`"
                class="list-group-item"
              >
                Storage: {{ storage.name }} - ₱{{ storage.price }}
              </li>
            </ul>
            <p class="mt-2"><strong>Total:</strong> ₱{{ build.buildPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Builds",
  data() {
    return {
      builds: [],
    };
  },
  methods: {
    async fetchBuilds() {
      try {
        const res = await axios.get("http://localhost:5000/api/builds");
        this.builds = res.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.fetchBuilds();
  },
};
</script>
