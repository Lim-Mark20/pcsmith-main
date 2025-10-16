<template>
  <div class="card m-2" style="width: 18rem;">
    <div class="image-container">
      <img :src="part.image_url" class="card-img-top" :alt="part.name" />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ part.name }}</h5>
      <p class="card-text">
        Type: {{ part.type }} <br />
        Brand: {{ part.brand }} <br />
        Price: ₱{{ part.price }}
        <span v-if="part.type === 'CPU' && part.specs && part.specs.cores"> <br /> Cores: {{ part.specs.cores }}</span>
        <span v-if="part.type === 'CPU' && part.specs && part.specs.threads"> <br /> Threads: {{ part.specs.threads }}</span>
        <span v-if="part.type === 'CPU' && part.specs && part.specs.socket"> <br /> Socket: {{ part.specs.socket }}</span>
        <span v-if="part.type === 'GPU' && part.gpu_cores"> <br /> GPU Cores: {{ part.gpu_cores }}</span>
      </p>
      <div v-if="showActions">
        <button class="btn btn-primary me-2" @click="$emit('select-part', part)">
          Select Part
        </button>
        <button class="btn btn-secondary" @click="$emit('add-to-compare', part)">
          Compare
        </button>
      </div>
      <slot name="delete-button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PartCard",
  props: {
    part: {
      type: Object,
      required: true,
    },
    showActions: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.image-container {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>