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
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
