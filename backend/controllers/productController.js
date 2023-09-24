const Product = require("../models/product");
const Image = require("../models/image");
const fs = require("fs");
const { promisify } = require("util");
const Room = require("../models/auction");
const path = require("path")
function RemoveLastDirectoryPartOf(the_url)
{
    var the_arr = the_url.split('/');
    the_arr.pop();
    return( the_arr.join('/') );
}
const unlinkAsync = promisify(fs.unlink);
const addProduct = async (req, res) => {
  try {
    
    const {
      title,
      subTitle,
      description,
      prix,
      brand,
      partner,
      category,
      garantie,
    } = JSON.parse(req.body.info);

    if (
      title &&
      subTitle &&
      prix &&
      req.files[0] &&
      req.files[1] &&
      req.files[2]
    ) {
      const newimage = await Image.create({
        imageURL:  "/uploads/"+ req.files[0].path.split('/').pop()
      });
      const newimage1 = await Image.create({
        imageURL: "/uploads/"+ req.files[1].path.split('/').pop()
      });
      const newimage2 = await Image.create({
        imageURL:"/uploads/"+ req.files[2].path.split('/').pop()
      });

      const newProduct = await Product.create({
        title,
        subTitle,
        description,
        prix,
        brand,
        partner,
        category,
        garantie,
        image: newimage._id,
        image1: newimage1._id,
        image2: newimage2._id,
      });
      return res.send(newProduct);
    } else {
      return res.status(400).json({ message: "informations manquantes" });
    }
  } catch (error) {
    
    return res.status(500).json({ message: "erreur serveur" });
  }
};

const getTotalProducts = async (req, res) => {
  try {
    const result = await Product.find({}).populate([
    
        {
          path: "image",
        },
        {
          path: "image1",
        },
        {
          path: "image2",
        },
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
          }},
        
        ])
      return res.status(200).json({productList:result});
   
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const getProductPagination = async (req, res) => {
  try {
    const options = {
      page: req.body.page || 1,
      limit: 10,
      sort: { createdAt: -1 },
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
      collation: {
        locale: "en",
      },
    };
    Product.paginate({}, options, function (err, result) {
      return res.json({
        productList: result.docs,
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

const updateproductImage = async (req, res) => {
  try {
    const existproduct = await Product.findById(req.params.id).populate(
      "image"
    )
    if (!req.files[0]){
      return res.status(404).json({ message: "pas de photo !" });
    }
    if (existproduct) {
      
      if (existproduct.image) {
        const url = path.join(RemoveLastDirectoryPartOf(__dirname))+existproduct.image.imageURL
        const updatedproduct = await Image.findByIdAndUpdate(
          existproduct.image._id,
          {
            imageURL: "/uploads/"+ req.files[0].path.split('/').pop(),
          }
        );
      }
      res.json({ message: "succes" });
      await unlinkAsync(url, function (err) {
        if (err)  {
          console.log(err)
        }
      });
       return;
    } else {
     return res.status(404).json({ message: "produit introuvable" });
    } 
    
  } catch (error) {
    
    res.status(500).json({ message: "erreur serveur" });
  }
};
const updateproductImage1 = async (req, res) => {
  try {
    const existproduct = await Product.findById(req.params.id).populate(
      "image1"
    )
    if (!req.files[1]){
      return res.status(404).json({ message: "pas de photo !" });
    }
    if (existproduct) {
      
      if (existproduct.image) {
        const url = path.join(RemoveLastDirectoryPartOf(__dirname))+existproduct.image1.imageURL
        const updatedproduct = await Image.findByIdAndUpdate(
          existproduct.image1._id,
          {
            imageURL: "/uploads/"+ req.files[1].path.split('/').pop(),
          }
        );
      }
      res.json({ message: "succes" });
      await unlinkAsync(url, function (err) {
        if (err)  {}
      });
       return;
    } else {
     return res.status(404).json({ message: "produit introuvable" });
    } 
    
  } catch (error) {
    
    res.status(500).json({ message: "erreur serveur" });
  }
};
const updateproductImage2 = async (req, res) => {
  try {
    const existproduct = await Product.findById(req.params.id).populate(
      "image2"
    )
    if (!req.files[2]){
      return res.status(404).json({ message: "pas de photo !" });
    }
    if (existproduct) {
      
      if (existproduct.image) {
        const url = path.join(RemoveLastDirectoryPartOf(__dirname))+existproduct.image.imageURL
        const updatedproduct = await Image.findByIdAndUpdate(
          existproduct.image._id,
          {
            imageURL: "/uploads/"+ req.files[2].path.split('/').pop(),
          }
        );
      }
      res.json({ message: "succes" });
      await unlinkAsync(url, function (err) {
        if (err)  {}
      });
       return;
    } else {
     return res.status(404).json({ message: "produit introuvable" });
    } 
    
  } catch (error) {
    
    res.status(500).json({ message: "erreur serveur" });
  }
};

const updateproduct = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      description,
      prix,
      brand,
      partner,
      category,
      garantie,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.title = title || product.title;
      product.subTitle = subTitle || product.subTitle;
      product.description = description || product.description;
      product.prix = prix || product.prix;
      product.brand = brand || product.brand;
      product.partner = partner || product.partner;
      product.category = category || product.category;
      product.garantie = garantie || product.garantie;
      const updatedproduct = await Product.findByIdAndUpdate(req.params.id, {
        title: product.title,
        subTitle: product.subTitle,
        description: product.description,
        prix: product.prix,
        brand: product.brand,
        partner: product.partner,
        category: product.category,
        garantie: product.garantie,
      });
      if (updatedproduct) {
        res.json(updatedproduct);
      } else {
        res.status(404).send({ message: "produit introuvable" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("image")
      .populate("image1")
      .populate("image2");

    if (!product) {
      return res.status(404).send({ message: "produit introuvable" });
    } else {
      const url = path.join(RemoveLastDirectoryPartOf(__dirname))+product.image?.imageURL;
      const url1 = path.join(RemoveLastDirectoryPartOf(__dirname))+product.image1?.imageURL;
      const url2 = path.join(RemoveLastDirectoryPartOf(__dirname))+product.image2?.imageURL;
      if (product.image) {
       
       
       
        const deletedImage = await Image.deleteOne({ _id: product.image._id });
      }
      if (product.image1) {
      
 
       
        const deletedImage1 = await Image.deleteOne({
          _id: product.image1._id,
        });
      }
      if (product.image2) {
       

        const deletedImage2 = await Image.deleteOne({
          _id: product.image2._id,
        });
      }
      const deletedProduct = await Product.deleteOne({ _id: req.params.id });
      const deletedrooms = await Room.deleteMany({ product: product._id });

      res.json({ deletedProduct, deletedrooms });
      await unlinkAsync(url, function (err) {
        if (err)  {}
      });
      await unlinkAsync(url1, function (err) {
        if (err)  {}
      });
      await unlinkAsync(url2, function (err) {
        if (err)  {}
      });
return;
    }
  } catch (error) {
    
    return res.status(500).json({ message: "erreur serveur" });
  }
};

module.exports = {
  updateproduct,
  updateproductImage,
  updateproductImage1,
  updateproductImage2,
  addProduct,
  getTotalProducts,
  getProductPagination,
  deleteProduct,
};
