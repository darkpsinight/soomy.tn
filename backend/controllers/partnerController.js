const Partner = require("../models/partner");
const Image = require("../models/image");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path")
const unlinkAsync = promisify(fs.unlink);
function RemoveLastDirectoryPartOf(the_url)
{
    var the_arr = the_url.split('/');
    the_arr.pop();
    return( the_arr.join('/') );
}
const addPartner = async (req, res) => {
  try {
    const { name, adresse, phone, email } = JSON.parse(req.body.info);
    const imageInfo = "/uploads/"+ req.file.path.split('/').pop();
    if (!imageInfo) {
      return res.status(400).json({ message: "image est obligatoire!" });
    } else if (name && adresse && phone && email) {
      const newimage = await Image.create({
        imageURL: imageInfo,
      });
      const newpartner = await Partner.create({
        name,
        adresse,
        phone,
        email,
        image: newimage._id,
      });
      return res.send(newpartner);
    } else {
      return res.status(400).send({ message: "informations manquantes" });
    }
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
    
  }
};
const getPartners = async (req, res) => {
  try {
    const options = {
      page: req.body.page || 1,
      limit: 10,
      sort: { createdAt: -1 },
      populate: { path: "image" },
      collation: {
        locale: "en",
      },
    };
    Partner.paginate({}, options, function (err, result) {
      return res.json({
        partners: result.docs,
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
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const getTotalPartners = async (req, res) => {
  try {
    Partner.find({}, function (err, result) {
      return res.status(200).json({partners:result});
    });
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const updatePartner = async (req, res) => {
  try {
    const { name, adresse, email, phone } = req.body;
    const partner = await Partner.findById(req.params.id);
    if (partner) {
      partner.name = name || partner.name;
      partner.adresse = adresse || partner.adresse;
      partner.email = email || partner.email;
      partner.phone = phone || partner.phone;

      const updatedpartner = await Partner.findByIdAndUpdate(req.params.id, {
        name: partner.name,
        adresse: partner.adresse,
        email: partner.email,
        phone: partner.phone,
      });

      return res.json(updatedpartner);
    } else {
      return res.status(404).send({ message: "partner not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};

const updatepartnerImage = async (req, res) => {
  try {
    
    const existpartner = await Partner.findById(req.params.id).populate(
      "image"
    );

    if (existpartner) {
      const url =
        path.join(RemoveLastDirectoryPartOf(__dirname)) + existpartner.image.imageURL;
      imageInfo = "/uploads/"+ req.file.path.split('/').pop();
      const updatedImage = await Image.findByIdAndUpdate(
        existpartner.image._id,
        {
          imageURL: imageInfo,
        }
      );
      res.json(updatedImage);
      await unlinkAsync(url, function (err) {
        if (err)  {}
      });
      return;
    } else {
      return res.status(404).send({ message: "partner not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id).populate("image");
    if (!partner) {
      return res.status(404).send({ message: "Not found" });
    } else {
      const url = path.join(RemoveLastDirectoryPartOf(__dirname))+partner.image.imageURL
     
    
      const deletedImage = await Image.deleteOne({ _id: partner.image._id });
      const deletedPartner = await Partner.deleteOne({ _id: req.params.id });
     res.json({ deletedPartner, deletedImage });
      await unlinkAsync(url, function (err) {
        if (err)  {}
      });
      return;
    }
  } catch (error) {
    
    res.status(500).json({ message: "erreur serveur" });
  }
};
module.exports = {
  addPartner,
  getPartners,
  getTotalPartners,
  updatepartnerImage,
  updatePartner,
  deletePartner,
};
