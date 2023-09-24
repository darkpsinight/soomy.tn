const Room = require("../models/auction");
const Image = require("../models/image");
const Category = require("../models/category");
const Partner = require("../models/partner");
const Brand = require("../models/brand");
const Product = require("../models/product");
const addRoom = async (req, res) => {
  try {
    const {
      nameOfroom,
      description,
      product,
      startDate,
      endDate,
      status,
      niveau,
      capacity,
      mise,
      winner,
      participationPrice,
      roomCategory,
      ruleDirectCheckout,
      privilege,
      featured,
    } = req.body;

    const nbParticipant = 0;

    const newRoom = await Room.create({
      nameOfroom,
      description,
      product,
      startDate,
      nbParticipant,
      capacity,
      mise,
      participationPrice,
      roomCategory,
      ruleDirectCheckout,
      niveau,
      privilege,
      featured,
      endDate,
      status,
      winner,
    });
    res.send(newRoom);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};

const updateRoom = async (req, res) => {
  try {
    const {
      product,
      startDate,
      nbParticipant,
      capacity,
      mise,
      participationPrice,
      roomCategory,
      ruleDirectCheckout,
      niveau,
      featured,
      privilege,
      endDate,
      status,
      winner,
      prixPromo,
      directWinner,
      directPrice,
      participation
    } = req.body;

    const room = await Room.findById(req.params.id);
    if (room) {
      room.product = product || room.product;
      room.directPrice =  directPrice || room.directPrice;
      room.startDate = startDate || room.startDate;
      room.nbParticipant = nbParticipant || room.nbParticipant;
      room.mise = mise || room.mise;
      room.niveau = niveau || room.niveau;
      room.participationPrice = participationPrice || room.participationPrice;
      room.roomCategory = roomCategory || room.roomCategory;
      room.ruleDirectCheckout = ruleDirectCheckout || room.ruleDirectCheckout;
      room.privilege = privilege || room.privilege;
      room.featured = featured === "undefined" ? room.featured : featured;
      room.endDate = endDate || room.endDate;
      room.status = status || room.status;
      room.winner = winner || room.winner;
      room.directWinner = directWinner || room.directWinner;
      room.participation = participation || room.participation;
      room.prixPromo = prixPromo || room.prixPromo;
      
      if (capacity==0){
        return res.status(500).json({ message: "capacity can't be 0" });
       }
      else if(capacity<room.capacity){
        return res.status(500).json({ message: "capacity can't be reduced" });
      }
      else{
        room.capacity = capacity || room.capacity;
      }
      const updatedroom = await Room.findByIdAndUpdate(req.params.id, {
        product: room.product,
        startDate: room.startDate,
        nbParticipant: room.nbParticipant,
        capacity: room.capacity,
        mise: room.mise,
        participationPrice: room.participationPrice,
        roomCategory: room.roomCategory,
        ruleDirectCheckout: room.ruleDirectCheckout,
        niveau: room.niveau,
        featured: room.featured,
        privilege: room.privilege,
        status: room.status,
        endDate: room.endDate,
        prixPromo: room.prixPromo,
        winner: room.winner,
        participation: room.participation,
        directWinner: room.directWinner,
         directPrice: room.directPrice,
      });
      if (updatedroom) {
        return res.json(updatedroom);
      } else {
        return res.status(404).send({ message: "Enchère introuvable" });
      }
    }
  } catch (error) {

    return res.status(500).json({ message: "erreur serveur" });
  }
};
const getSoomyAuctions = async (req, res) => {
  try {
    const rooms = await Room.find({
      $and: [
        { $or: [{ status: "pending" }, { status: "enable" }] },
        { roomCategory: "soomy" },
      ],
    }).sort({"startDate":1}).populate({
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getAuctions = async (req, res) => {
  try {
    const options = {
      page: req.body.page||1,
      limit:10,
      sort: { createdAt: -1 },
      populate:[{
        path: "product",

        populate: [
          {
            path: "image",
          },
          {
            path: "image1",
          },
          {
            path: "image2",
          },
          ,
          {
            path: "brand",
            populate: {
              path: "logo",
            },
          },
          { path: "category" },
          {
            path: "partner",
            populate: {
              path: "image",
            },
          },
        ],
      }],
      collation: {
        locale: 'en',
      },
    };
    Room.paginate({}, options, function (err, result) {
    
      res.json({rooms:result.docs,total:result.totalDocs,totalPages:result.totalPages,page:result.page});
      // result.docs
      // result.totalDocs = 100
      // result.limit = 10
      // result.page = 1
      // result.totalPages = 10
      // result.hasNextPage = true
      // result.nextPage = 2
      // result.hasPrevPage = false
      // result.prevPage = null
      // result.pagingCounter = 1
    });}
   catch (error) {

    res.status(500).json({ message: "erreur serveur" });
  }
};
const getAuctionsSearch = async (req, res) => {
  try {
    let reg = req.params.search
    const categoryFiltered = await Category.find({name:new RegExp(reg,'i')})
    const brandFiltered = await Brand.find({name:new RegExp(reg,'i')})
    const productFiltered = await Product.find({$or:[{title:new RegExp(reg,'i')},{brand:{$in:brandFiltered}},{category:{$in:categoryFiltered}}]})
    
 
    const result = await Room.find({product:{$in:productFiltered}}).sort({"startDate":1}).populate({
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    });
     res.json(result);
  }
   catch (error) {

    res.status(500).json({ message: "erreur serveur" });
  }
};
const getAuctionsByCategory = async (req, res) => {
  try {

    const categoryFiltered = await Category.findById(req.params.category)
    const productFiltered = await Product.find({category:{$in:categoryFiltered}})
 
 
    const result = await Room.find({$and:[{product:{$in:productFiltered}},{$or: [{ status: "pending" }, { status: "enable" }]} ]}).sort({"startDate":1}).populate({
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    });
     res.json(result);
  }
   catch (error) {

    res.status(500).json({ message: "erreur serveur" });
  }
};
const getAllAuctions = async (req, res) => {
  try {
  
    const rooms = await Room.find().populate([{
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    }])
    
      res.json({rooms:rooms});
    }
   catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getRelevantAuctions = async (req, res) => {
  try {
  
    const rooms = await Room.find({ $or: [{ status: "pending" }, { status: "enable" }] }).sort({"startDate":1}).populate([{
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    }])
     const filteredArray = rooms.filter((elm) => elm?.product?.category?._id.toString() === req.params.category.toString())
     if(filteredArray?.length>0)
     { res.json(filteredArray);}
     else{
      res.status(404).send({msg:"pas d'enchères dans cette catégorie"})
     }
    }
   catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getAuctionById = async (req, res) => {
  try {
    const rooms = await Room.findById(req.params.id).populate({
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    }).populate({
      path: "winner",
      populate: [
        {
          path: "profile_img",
        },
      ],
    })
    .populate({
      path: "directWinner",
      populate: [
        {
          path: "profile_img",
        },
      ],
    });;
    
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getroomsPaginationWinner = async (req, res) => {
  try {
    const options = {
      page: req.params.page||1,
      limit:6,
      populate:[{
        path: "product",

        populate: [
          {
            path: "image",
          },
          {
            path: "image1",
          },
          {
            path: "image2",
          },
          ,
          {
            path: "brand",
            populate: {
              path: "logo",
            },
          },
          { path: "category" },
          {
            path: "partner",
            populate: {
              path: "image",
            },
          },
        ],
      }],
      collation: {
        locale: 'en',
      },
    };
    Room.paginate({ winner: req.params.id }, options, function (err, result) {
     
      res.json({rooms:result.docs,total:result.totalDocs,totalPages:result.totalPages,page:result.page});
      // result.docs
      // result.totalDocs = 100
      // result.limit = 10
      // result.page = 1
      // result.totalPages = 10
      // result.hasNextPage = true
      // result.nextPage = 2
      // result.hasPrevPage = false
      // result.prevPage = null
      // result.pagingCounter = 1
    });
   
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getFinishedAuctions = async (req, res) => {
  try {
    const RECORD_RANGE = req.params.range?new Date(new Date (new Date().setDate(new Date().getDate() - req.params.range)).setHours(0,0,0,0)): null;
    const rooms = await Room.find({$and:[{status:"finished"},{endDate:{$gte:RECORD_RANGE}}]}).sort({"endDate":-1}).populate({
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getPremiumAuctions = async (req, res) => {
  try {
    const rooms = await Room.find({
      $and: [
        { $or: [{ status: "pending" }, { status: "enable" }] },
        { roomCategory: "premium" },
      ],
    }).sort({"startDate":-1}).populate({
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getPrivilegedAuctions = async (req, res) => {
  try {
    const rooms = await Room.find({
      $and: [
        { $or: [{ status: "pending" }, { status: "enable" }] },
        { privilege: req.params.privilege },
      ],
    }).sort({"startDate":1}).populate({
      path: "product",

      populate: [
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
        ,
        {
          path: "brand",
          populate: {
            path: "logo",
          },
        },
        { path: "category" },
        {
          path: "partner",
          populate: {
            path: "image",
          },
        },
      ],
    });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const deleteroom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404).send({ message: "Enchère introuvable" });
    } else {
      const deletedroom = await Room.deleteOne({ _id: req.params.id });
      res.json(deletedroom);
    }
  } catch (error) {
    
    res.status(500).json({ message: "erreur serveur" });
  }
};

const getNumberOfDocumentsByMonth = async(req,res) =>{
  const numberOfDocs = await Room.aggregate([ // User is the model of userSchema
  {
    $group: {
      _id: { $month: "$createdAt" }, // group by the month *number*, mongodb doesn't have a way to format date as month names
      numberofdocuments: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: false, // remove _id
      month: { // set the field month as the month name representing the month number
        $arrayElemAt: [
          [
            "", // month number starts at 1, so the 0th element can be anything
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          "$_id"
        ]
      },
      numberofdocuments: true // keep the count
    }
  }
])
res.send( numberOfDocs)
}
module.exports = {
  getSoomyAuctions,
  addRoom,
  getPremiumAuctions,
  getFinishedAuctions,
  getPrivilegedAuctions,
  getAuctions,
  getAuctionById,
  getAllAuctions,
  updateRoom,
  getroomsPaginationWinner,
  deleteroom,
  getRelevantAuctions,
  getAuctionsSearch,
  getNumberOfDocumentsByMonth,
  getAuctionsByCategory
 
};
