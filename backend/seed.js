import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Part from './models/Part.js';
import Build from './models/Build.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    console.log('Clearing existing data...');
    await User.deleteMany();
    await Part.deleteMany();
    await Build.deleteMany();
    console.log('Existing data cleared.');

    // Create a user
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    await user.save();
    console.log('User created.');

    // Create some parts
    const cpu = new Part({
      name: 'Intel Core i7-12700K',
      type: 'CPU',
      brand: 'Intel',
      price: 22999.00,
      specs: { cores: 12, threads: 20, socket: 'LGA1700' },
      image_url: 'https://mindtech.ae/wp-content/uploads/intel-core-i7-12700k.webp',
    });
    await cpu.save();

    const gpu = new Part({
      name: 'NVIDIA GeForce RTX 3080',
      type: 'GPU',
      brand: 'NVIDIA',
      price: 37999.00,
      specs: { memory: 10, chipset: 'Ampere' },
      gpu_cores: 8704,
      image_url: 'https://asset.msi.com/resize/image/global/product/product_16051683789c6e411042e9ef0f558376d40b4aa85f.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    });
    await gpu.save();

    const ram = new Part({
      name: 'Corsair Vengeance RGB Pro 16GB (2x8GB) DDR4 3200MHz',
      type: 'RAM',
      brand: 'Corsair',
      price: 4899.00,
      specs: { capacity: '16GB', speed: '3200MHz', type: 'DDR4' },
      image_url: 'https://shop.villman.com/cdn/shop/files/Vengeance_RGB_Pro_01_800x.png?v=1715737831',
    });
    await ram.save();

    const motherboard = new Part({
      name: 'ASUS ROG Strix Z690-E Gaming WiFi',
      type: 'Motherboard',
      brand: 'ASUS',
      price: 24990.00,
      specs: { chipset: 'Z690', socket: 'LGA1700', ram_speed: 'DDR4 5333MHz' },
      image_url: 'https://dlcdnwebimgs.asus.com/files/media/F06BD967-FC83-4514-8AC4-760944D051CC/v2/img/kv/ROG-Strix-Z690-E-Gaming.png',
    });
    await motherboard.save();

    const psu = new Part({
      name: 'Corsair RM850x 850W 80+ Gold',
      type: 'PSU',
      brand: 'Corsair',
      price: 8990.00,
      specs: { wattage: '850W', efficiency: '80+ Gold' },
      image_url: 'https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/Power-Supply-Units/CP-9020188-NA/Gallery/RMx_White_850_02.webp',
    });
    await psu.save();

    const storage = new Part({
      name: 'Samsung 970 Evo Plus 1TB NVMe SSD',
      type: 'Storage',
      brand: 'Samsung',
      price: 8499.00,
      specs: { capacity: '1TB', type: 'NVMe SSD', write_speed: 6900 },
      image_url: 'https://images.samsung.com/is/image/samsung/p6pim/nz/mz-v9p1t0bw/gallery/nz-990pro-nvme-m2-ssd-mz-v9p1t0bw-thumb-534155518?$UX_EXT1_PNG$',
    });
    await storage.save();
    console.log('Parts created.');

    // Create a build
    const build = new Build({
      name: 'High-End Gaming PC',
      description: 'A powerful PC for gaming and content creation.',
      userId: user._id,
      cpu: {
        componentId: cpu._id,
        name: cpu.name,
        type: cpu.type,
        brand: cpu.brand,
        price: cpu.price,
        specs: cpu.specs,
      },
      gpu: {
        componentId: gpu._id,
        name: gpu.name,
        type: gpu.type,
        brand: gpu.brand,
        price: gpu.price,
        specs: gpu.specs,
      },
      motherboard: {
        componentId: motherboard._id,
        name: motherboard.name,
        type: motherboard.type,
        brand: motherboard.brand,
        price: motherboard.price,
        specs: motherboard.specs,
      },
      psu: {
        componentId: psu._id,
        name: psu.name,
        type: psu.type,
        brand: psu.brand,
        price: psu.price,
        specs: psu.specs,
      },
      ram: [
        {
          componentId: ram._id,
          name: ram.name,
          type: ram.type,
          brand: ram.brand,
          price: ram.price,
          specs: ram.specs,
        },
        {
          componentId: ram._id,
          name: ram.name,
          type: ram.type,
          brand: ram.brand,
          price: ram.price,
          specs: ram.specs,
        }, // Add another RAM stick for a total of 32GB
      ],
      storage: [
        {
          componentId: storage._id,
          name: storage.name,
          type: storage.type,
          brand: storage.brand,
          price: storage.price,
          specs: storage.specs,
        },
      ],
      buildPrice: cpu.price + gpu.price + (ram.price * 2) + motherboard.price + psu.price + storage.price,
    });
    await build.save();
    console.log('Build created.');

    // Create another user
    const user2 = new User({
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    });
    await user2.save();
    console.log('User 2 created.');

    // Create more parts for comparison
    const cpu2 = new Part({
      name: 'AMD Ryzen 7 5800X',
      type: 'CPU',
      brand: 'AMD',
      price: 18990.00,
      specs: { cores: 8, threads: 16, socket: 'AM4' },
      image_url: 'https://blackmambagaming.com/wp-content/uploads/2021/06/20614362-a_ryzen7_5000_3dpibwof_left_row.png',
    });
    await cpu2.save();

    const gpu2 = new Part({
      name: 'AMD Radeon RX 6700 XT',
      type: 'GPU',
      brand: 'AMD',
      price: 25990.00,
      specs: { memory: 12, chipset: 'RDNA 2' },
      gpu_cores: 2560,
      image_url: 'https://bermorzone.com.ph/wp-content/uploads/2023/04/asrock-rx-6700-xt-challenger-pro.webp',
    });
    await gpu2.save();

    const ram2 = new Part({
      name: 'G.Skill Ripjaws V 32GB (2x16GB) DDR4 3600MHz',
      type: 'RAM',
      brand: 'G.Skill',
      price: 8499.00,
      specs: { capacity: '32GB', speed: '3600MHz', type: 'DDR4' },
      image_url: 'https://dynaquestpc.com/cdn/shop/products/1_0ea187da-227e-438b-af2d-17679c6f9cd9.png?v=1578625786&width=1100',
    });
    await ram2.save();

    const motherboard2 = new Part({
      name: 'MSI MAG B550 TOMAHAWK',
      type: 'Motherboard',
      brand: 'MSI',
      price: 9990.00,
      specs: { chipset: 'B550', socket: 'AM4', ram_speed: 'DDR4 4400MHz' },
      image_url: 'https://asset.msi.com/resize/image/global/product/product_5_20200520165805_5ec4f11d89e51.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    });
    await motherboard2.save();

    const psu2 = new Part({
      name: 'EVGA SuperNOVA 750 G5 750W 80+ Gold',
      type: 'PSU',
      brand: 'EVGA',
      price: 6990.00,
      specs: { wattage: '750W', efficiency: '80+ Gold' },
      image_url: 'https://images.evga.com/products/gallery/png/220-G5-0750-X1_XL_1.png',
    });
    await psu2.save();

    const storage2 = new Part({
      name: 'Western Digital Blue SN570 1TB NVMe SSD',
      type: 'Storage',
      brand: 'Western Digital',
      price: 5499.00,
      specs: { capacity: '1TB', type: 'NVMe SSD', write_speed: 3500 },
      image_url: 'https://bermorzone.com.ph/wp-content/uploads/2019/06/wd-blue-sn570-nvme-ssd-straight-front-250GB.png.wdthumb.1280.1280.webp',
    });
    await storage2.save();

    const storage3 = new Part({
      name: 'Seagate Barracuda Compute 2TB HDD',
      type: 'Storage',
      brand: 'Seagate',
      price: 3490.00,
      specs: { capacity: '2TB', type: 'HDD', write_speed: 150 },
      image_url: 'https://www.seagate.com/content/dam/seagate/migrated-assets/www-content/support-content/internal-products/desktop%20hard/barracuda-3-5/barracuda-2tb-dm008-hero-left-270x270.png',
    });
    await storage3.save();
    console.log('More parts created.');

    // Create another build for user2
    const build2 = new Build({
      name: 'Mid-Range AMD Gaming PC',
      description: 'A balanced PC for gaming at 1440p.',
      userId: user2._id,
      cpu: {
        componentId: cpu2._id,
        name: cpu2.name,
        type: cpu2.type,
        brand: cpu2.brand,
        price: cpu2.price,
        specs: cpu2.specs,
      },
      gpu: {
        componentId: gpu2._id,
        name: gpu2.name,
        type: gpu2.type,
        brand: gpu2.brand,
        price: gpu2.price,
        specs: gpu2.specs,
      },
      motherboard: {
        componentId: motherboard2._id,
        name: motherboard2.name,
        type: motherboard2.type,
        brand: motherboard2.brand,
        price: motherboard2.price,
        specs: motherboard2.specs,
      },
      psu: {
        componentId: psu2._id,
        name: psu2.name,
        type: psu2.type,
        brand: psu2.brand,
        price: psu2.price,
        specs: psu2.specs,
      },
      ram: [
        {
          componentId: ram2._id,
          name: ram2.name,
          type: ram2.type,
          brand: ram2.brand,
          price: ram2.price,
          specs: ram2.specs,
        },
      ],
      storage: [
        {
          componentId: storage2._id,
          name: storage2.name,
          type: storage2.type,
          brand: storage2.brand,
          price: storage2.price,
          specs: storage2.specs,
        },
        {
          componentId: storage3._id,
          name: storage3.name,
          type: storage3.type,
          brand: storage3.brand,
          price: storage3.price,
          specs: storage3.specs,
        },
      ],
      buildPrice: cpu2.price + gpu2.price + ram2.price + motherboard2.price + psu2.price + storage2.price + storage3.price,
    });
    await build2.save();
    console.log('Build 2 created.');

    console.log('Data seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error with data seeding:', error);
    process.exit(1);
  }
};

seedData();
