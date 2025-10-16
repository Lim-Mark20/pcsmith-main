import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  specs: { type: mongoose.Schema.Types.Mixed, default: {} },
  gpu_cores: { type: Number, required: false },
  image_url: { type: String, required: false }
}); 
export default mongoose.model("Part", partSchema);