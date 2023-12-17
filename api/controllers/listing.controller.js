import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// export const getAllListings = async (req, res, next) => {
//   try {
//     const listings = await Listing.find({}); // Retrieve all listings
//     res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };

/*
localhost:3000/api/listing/get?keyword=software&location=New%20York&sort=pname&order=asc
localhost:3000/api/listing/get?keyword=software&location=Makati
localhost:3000/api/listing/get?keyword=engineer


localhost:3000/api/listing/get?
keyword=software&
sort=pname&
order=asc&
limit=10&
startIndex=0&
workoptions=true&
committment=false&
location=New%20York

GET http://localhost:3000/api/listing/get?keyword=your_keyword&location=your_location&sort=createdAt&order=asc&workoptions=your_option&commitment=your_commitment


http://localhost:3000/api/listing/get?committment=Full-time&workoptions=Remote
http://localhost:3000/api/listing/get?committment=Full-time&workoptions=Remote&limit=1
*/

export const getAllListings = async (req, res, next) => {
  try {
    const { keyword, location, sort, order, workoptions, committment } =
      req.query;
    // const limit = parseInt(req.query.limit) || 8;
    const limit = parseInt(req.query.limit);
    const startIndex = parseInt(req.query.startIndex) || 0;
    let filter = {};

    // Check if keyword, location, workoptions, or commitment parameters exist
    if (keyword) {
      filter.$or = [
        { pname: { $regex: keyword, $options: "i" } },
        { jdesc: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (workoptions) {
      filter.workoptions = { $regex: workoptions, $options: "i" };
    }

    if (committment) {
      filter.committment = { $regex: committment, $options: "i" };
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const listings = await Listing.find(filter)
      // .sort({ [sort || "createdAt"]: sortOrder })
      .sort({ [sort]: sortOrder })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// export const getListings = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 8;
//     const startIndex = parseInt(req.query.startIndex) || 0;

//     let workSetup = req.query.workoptions;
//     if (workSetup === undefined || workSetup === "false") {
//       workSetup = { $in: [false, true] };
//     }

//     let jobType = req.query.committment;
//     if (jobType === undefined || jobType === "false") {
//       jobType = { $in: [false, true] };
//     }

//     let location = req.query.location;
//     if (location === undefined || location === "false") {
//       location = { $in: [false, true] };
//     }

//     // let skills = req.query.skills;
//     // if (skills === undefined || skills === "all") {
//     //   skills = { $in: ["React", "Python"] };
//     // }

//     const searchTerm = req.query.searchTerm || "";

//     const sort = req.query.sort || "createdAt";

//     const order = req.query.order || "desc";

//     // const listings = await Listing.find({
//     //   $and: [
//     //     { workSetup },
//     //     { jobType },
//     //     { location },
//     //     {
//     //       $or: [{ cname: { $regex: searchTerm, $options: "i" } }],
//     //     },
//     //   ],
//     // });

//     const listings = await Listing.find({
//       cname: { $regex: searchTerm, $options: "i" },
//       workSetup,
//       jobType,
//       location,
//       // skills,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     return res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };
