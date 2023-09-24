const Brand = require("../models/brand");
const Image = require("../models/image");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
function RemoveLastDirectoryPartOf(the_url) {
  var the_arr = the_url.split("/");
  the_arr.pop();
  return the_arr.join("/");
}

const unlinkAsync = promisify(fs.unlink);
const addBrand = async (req, res) => {
  try {
    
    const { name, description } = JSON.parse(req.body.info);
    const imageInfo = "/uploads/" + req.file.path.split("/").pop();
    if (!imageInfo) {
      res.status(400).json({ message: "image est obligatoire!" });
    } else if (name && description) {
      const newimage = await Image.create({
        imageURL: imageInfo,
      });

      const newbrand = await Brand.create({
        name,
        description,
        logo: newimage._id,
      });
      res.send(newbrand);
    } else {
      res.status(400).json({ message: "informations manquantes" });
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getBrands = async (req, res) => {
  try {
    const options = {
      page: req.body.page || 1,
      limit: 10,
      sort: { createdAt: -1 },
      populate: { path: "logo" },
      collation: {
        locale: "en",
      },
    };
    Brand.paginate({}, options, function (err, result) {
      res.json({
        brands: result.docs,
        total: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page,
      });
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
const getTotalBrands = async (req, res) => {
  try {
    Brand.find({}, function (err, result) {
      res.status(200).json({ brands: result });
    });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const brand = await Brand.findById(req.params.id);
    if (brand) {
      brand.name = name || brand.name;
      brand.description = description || brand.description;

      const updatedbrand = await Brand.findByIdAndUpdate(req.params.id, {
        name: brand.name,
        description: brand.description,
      });
      if (updatedbrand) {
        res.json(updatedbrand);
      } else {
        res.status(404).send({ message: "marque introuvable" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const updatebrandImage = async (req, res) => {
  try {
    const existbrand = await Brand.findById(req.params.id).populate("logo");
    if (existbrand) {
      const url =
        path.join(RemoveLastDirectoryPartOf(__dirname)) + existbrand.image.imageURL;
      const updatedImage = await Image.findByIdAndUpdate(existbrand.logo._id, {
        imageURL: "/uploads/" + req.file.path.split("/").pop(),
      });

      res.json(updatedImage);
      await unlinkAsync(url, function (err) {
        if (err)  {}
      });
      return;
    } else {
      res.status(404).json({ message: "marque introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate("logo");
    if (!brand) {
      res.status(404).send({ message: "marque introuvable" });
    } else {
      const url =
        path.join(RemoveLastDirectoryPartOf(__dirname)) + brand.logo.imageURL;
    
      const deletedImage = await Image.deleteOne({ _id: brand.logo._id });
      const deletedBrand = await Brand.deleteOne({ _id: req.params.id });
      res.json({ deletedBrand, deletedImage });
      await unlinkAsync(url, function (err) {
        if (err)  {}
      });
      return ;
    }
  } catch (err) {
    
    res.status(500).json({ message: "erreur serveur" });
  }
};
module.exports = {
  addBrand,
  getBrands,
  getTotalBrands,
  updatebrandImage,
  updateBrand,
  deleteBrand,
};
