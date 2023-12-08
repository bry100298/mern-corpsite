import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    cname: {
      type: String,
      required: true,
    },
    cemail: {
      type: String,
      required: true,
    },
    clogo: {
      type: Array,
      required: true,
    },
    pname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    committment: {
      type: String,
      required: true,
    },
    jdesc: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
