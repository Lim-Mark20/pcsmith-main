<template>
    <div class="container mt-4">
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="admin-parts">
                    <h1>Add New Part</h1>
                    <form @submit.prevent="addPart">
                        <div class="form-group">
                            <label for="name">Part Name:</label>
                            <input type="text" id="name" v-model="part.name" required>
                        </div>
                        <div class="form-group">
                            <label for="type">Type:</label>
                            <select id="type" v-model="part.type" required>
                                <option value="">Select a type</option>
                                <option v-for="typeOption in partTypes" :key="typeOption" :value="typeOption">{{ typeOption }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="price">Price:</label>
                            <input type="number" id="price" v-model="part.price" required>
                        </div>
                        <div class="form-group">
                            <label for="brand">Brand:</label>
                            <select id="brand" v-model="part.brand" required>
                                <option value="">Select a brand</option>
                                <option v-for="brandOption in partBrands" :key="brandOption" :value="brandOption">{{ brandOption }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="image_url">Image URL:</label>
                            <input type="text" id="image_url" v-model="part.image_url">
                        </div>
                        <div v-if="part.type === 'CPU'">
                            <div class="form-group">
                                <label for="cores">Cores:</label>
                                <input type="number" id="cores" v-model="part.specs.cores">
                            </div>
                            <div class="form-group">
                                <label for="threads">Threads:</label>
                                <input type="number" id="threads" v-model="part.specs.threads">
                            </div>
                            <div class="form-group">
                                <label for="socket">Socket:</label>
                                <input type="text" id="socket" v-model="part.specs.socket">
                            </div>
                        </div>
                        <div v-if="part.type === 'GPU'">
                            <div class="form-group">
                                <label for="memory">Memory (GB):</label>
                                <input type="number" id="memory" v-model="part.specs.memory">
                            </div>
                            <div class="form-group">
                                <label for="chipset">Chipset:</label>
                                <input type="text" id="chipset" v-model="part.specs.chipset">
                            </div>
                            <div class="form-group">
                                <label for="gpu_cores">GPU Cores:</label>
                                <input type="number" id="gpu_cores" v-model="part.gpu_cores">
                            </div>
                        </div>
                        <div v-if="part.type === 'Motherboard'">
                            <div class="form-group">
                                <label for="chipset">Chipset:</label>
                                <input type="text" id="chipset" v-model="part.specs.chipset">
                            </div>
                            <div class="form-group">
                                <label for="socket">Socket:</label>
                                <input type="text" id="socket" v-model="part.specs.socket">
                            </div>
                            <div class="form-group">
                                <label for="ram_speed">RAM Speed:</label>
                                <input type="text" id="ram_speed" v-model="part.specs.ram_speed" placeholder="e.g., DDR4 3200MHz">
                            </div>
                        </div>
                        <div v-if="part.type === 'PSU'">
                            <div class="form-group">
                                <label for="wattage">Wattage:</label>
                                <input type="text" id="wattage" v-model="part.specs.wattage" placeholder="e.g., 750W">
                            </div>
                            <div class="form-group">
                                <label for="efficiency">Efficiency Rating:</label>
                                <select id="efficiency" v-model="part.specs.efficiency">
                                    <option value="">Select efficiency rating</option>
                                    <option value="80+ White">80+ White</option>
                                    <option value="80+ Bronze">80+ Bronze</option>
                                    <option value="80+ Silver">80+ Silver</option>
                                    <option value="80+ Gold">80+ Gold</option>
                                    <option value="80+ Platinum">80+ Platinum</option>
                                    <option value="80+ Titanium">80+ Titanium</option>
                                </select>
                            </div>
                        </div>
                        <template v-if="part.type === 'Storage'">
                            <div class="form-group">
                                <label for="storage_capacity">Capacity:</label>
                                <select id="storage_capacity" v-model="part.specs.capacity">
                                    <option value="">Select capacity</option>
                                    <option value="250GB">250GB</option>
                                    <option value="500GB">500GB</option>
                                    <option value="1TB">1TB</option>
                                    <option value="2TB">2TB</option>
                                    <option value="4TB">4TB</option>
                                    <option value="8TB">8TB</option>
                                    <option value="16TB">16TB</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="storage_type">Type:</label>
                                <select id="storage_type" v-model="part.specs.type">
                                    <option value="">Select type</option>
                                    <option value="NVMe SSD">NVMe SSD</option>
                                    <option value="SATA SSD">SATA SSD</option>
                                    <option value="HDD">HDD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="write_speed">Write Speed:</label>
                                <div class="input-group">
                                    <input type="number" id="write_speed" v-model="part.specs.write_speed" placeholder="e.g., 3500">
                                    <span class="input-group-text">MB/s</span>
                                </div>
                            </div>
                        </template>
                        <div v-if="part.type === 'RAM'">
                            <div class="form-group">
                                <label for="ram_capacity">Capacity:</label>
                                <select id="ram_capacity" v-model="part.specs.capacity">
                                    <option value="">Select capacity</option>
                                    <option value="4GB">4GB</option>
                                    <option value="8GB">8GB</option>
                                    <option value="16GB">16GB</option>
                                    <option value="32GB">32GB</option>
                                    <option value="64GB">64GB</option>
                                    <option value="128GB">128GB</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="ram_speed">Speed:</label>
                                <select id="ram_speed" v-model="part.specs.speed">
                                    <option value="">Select speed</option>
                                    <option value="2133MHz">2133MHz</option>
                                    <option value="2400MHz">2400MHz</option>
                                    <option value="2666MHz">2666MHz</option>
                                    <option value="3000MHz">3000MHz</option>
                                    <option value="3200MHz">3200MHz</option>
                                    <option value="3600MHz">3600MHz</option>
                                    <option value="4000MHz">4000MHz</option>
                                    <option value="4400MHz">4400MHz</option>
                                    <option value="4800MHz">4800MHz</option>
                                    <option value="5000MHz">5000MHz</option>
                                    <option value="5200MHz">5200MHz</option>
                                    <option value="5400MHz">5400MHz</option>
                                    <option value="5600MHz">5600MHz</option>
                                    <option value="5800MHz">5800MHz</option>
                                    <option value="6000MHz">6000MHz</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="ram_type">Type:</label>
                                <select id="ram_type" v-model="part.specs.type">
                                    <option value="">Select type</option>
                                    <option value="DDR3">DDR3</option>
                                    <option value="DDR4">DDR4</option>
                                    <option value="DDR5">DDR5</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Part</button>
                    </form>
                    <p v-if="message" class="mt-3">{{ message }}</p>
                </div>
            </div>

            <div class="col-md-6">
                <div class="part-preview-section">
                    <h2>Card Preview</h2>
                    <div class="part-card-preview">
                        <PartCard :part="part" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12">
                <h1>Existing Parts</h1>
            </div>
            <PartCard
                v-for="p in parts"
                :key="p._id"
                :part="p"
                :showActions="false"
                @delete-part="deletePart"
            >
                <template #delete-button>
                    <button class="btn btn-danger mt-2" @click="deletePart(p._id)">Delete</button>
                </template>
            </PartCard>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PartCard from '../components/PartCard.vue';

export default {
    name: 'AdminParts',
    components: {
        PartCard
    },
    data() {
        return {
            part: {
                name: '',
                type: '',
                price: 0,
                brand: '',
                image_url: '',
                gpu_cores: null,
                specs: {
                    cores: null,
                    threads: null,
                    socket: '',
                    memory: null,
                    chipset: '',
                    ram_speed: '',
                    wattage: '',
                    efficiency: '',
                    capacity: '',
                    speed: '',
                    type: '',
                    write_speed: null,
                }
            },
            message: '',
            partTypes: ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case'],
            partBrands: ['Intel', 'AMD', 'NVIDIA', 'ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Samsung', 'Western Digital', 'G.SKILL', 'Lexar'],
            parts: [] // New data property to store existing parts
        };
    },
    mounted() {
        this.fetchParts(); // Fetch parts when the component is mounted
    },
    methods: {
        async addPart() {
            try {
                const partData = {
                    name: this.part.name,
                    type: this.part.type,
                    price: this.part.price,
                    brand: this.part.brand,
                    image_url: this.part.image_url,
                    specs: {}
                };

                if (this.part.type === 'CPU') {
                    partData.specs.cores = this.part.specs.cores;
                    partData.specs.threads = this.part.specs.threads;
                    partData.specs.socket = this.part.specs.socket;
                } else if (this.part.type === 'GPU') {
                    partData.specs.memory = this.part.specs.memory;
                    partData.specs.chipset = this.part.specs.chipset;
                    partData.gpu_cores = this.part.gpu_cores;
                } else if (this.part.type === 'Motherboard') {
                    partData.specs.chipset = this.part.specs.chipset;
                    partData.specs.socket = this.part.specs.socket;
                    partData.specs.ram_speed = this.part.specs.ram_speed;
                } else if (this.part.type === 'PSU') {
                    partData.specs.wattage = this.part.specs.wattage;
                    partData.specs.efficiency = this.part.specs.efficiency;
                } else if (this.part.type === 'Storage') {
                    partData.specs.capacity = this.part.specs.capacity;
                    partData.specs.type = this.part.specs.type;
                    partData.specs.write_speed = this.part.specs.write_speed;
                } else if (this.part.type === 'RAM') {
                    partData.specs.capacity = this.part.specs.capacity;
                    partData.specs.speed = this.part.specs.speed;
                    partData.specs.type = this.part.specs.type;
                }

                const response = await axios.post('http://localhost:5000/api/admin/parts', partData);
                this.message = 'Part added successfully!';
                this.part = { 
                    name: '', 
                    type: '', 
                    price: 0, 
                    brand: '', 
                    image_url: '', 
                    specs: { 
                        cores: null, 
                        threads: null, 
                        socket: '', 
                        memory: null, 
                        chipset: '',
                        ram_speed: '' 
                    }, 
                    gpu_cores: null 
                }; // Clear form
                this.fetchParts(); // Refresh the list of parts
            } catch (error) {
                this.message = 'Error adding part: ' + error.message;
                console.error('Error adding part:', error);
            }
        },
        async fetchParts() {
            try {
                const response = await axios.get('http://localhost:5000/api/parts');
                this.parts = response.data;
            } catch (error) {
                console.error('Error fetching parts:', error);
            }
        },
        async deletePart(id) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/parts/${id}`);
                this.message = 'Part deleted successfully!';
                this.fetchParts(); // Refresh the list of parts
            } catch (error) {
                this.message = 'Error deleting part: ' + error.message;
                console.error('Error deleting part:', error);
            }
        }
    }
};
</script>

<style scoped>
.part-card-preview {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.admin-parts,
.part-preview-section {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px; /* Add margin to separate sections */
}

.input-group {
    display: flex;
    align-items: center;
}

.input-group input {
    border-radius: 4px 0 0 4px;
    border: 1px solid #ced4da;
    padding: 0.375rem 0.75rem;
}

.input-group-text {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0 4px 4px 0;
    padding: 0.375rem 0.75rem;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    margin-right: 10px;
}
</style>
