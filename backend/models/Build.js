
import mongoose from "mongoose";

// This is the schema for embedded components within a build
const embeddedComponentSchema = new mongoose.Schema({
  componentId: { type: mongoose.Schema.Types.ObjectId, ref: "Part", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  specs: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { _id: false });

const buildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cpu: { type: embeddedComponentSchema, default: null },
  gpu: { type: embeddedComponentSchema, default: null },
  motherboard: { type: embeddedComponentSchema, default: null },
  psu: { type: embeddedComponentSchema, default: null },
  ram: [embeddedComponentSchema],
  storage: [embeddedComponentSchema],
  buildPrice: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now }
});

const Build = mongoose.model("Build", buildSchema);

export default Build;
