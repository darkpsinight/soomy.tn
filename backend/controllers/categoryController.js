const Category = require("../models/category");
const addcategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newcategory = await Category.create({
      name,
      description,
    });
    res.send(newcategory);
  } catch (error) {
    
   return res.status(500).json({ message: "erreur serveur" });
  }
};

const getCategories = async (req, res) => {
  try {
    const options = {
      page: req.body.page||1,
      limit:10,
      sort: { createdAt: -1 },
      collation: {
        locale: 'en',
      },
    };
    Category.paginate({}, options, function (err, result) {
    
      res.json({categories:result.docs,total:result.totalDocs,totalPages:result.totalPages,page:result.page});
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
    return res.status(500).json({ message: "erreur serveur" });
    
  }
};

const getTotalCategories = async (req, res) => {
  try {
    Category.find({}, function (err, result) {
      res.status(200).json({categories:result});
    });}
   catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
    
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    res.json(category);
  } catch (error) {
   return res.status(500).json({ message: "erreur serveur" });
  }
};
const getCategoryByName = async (req, res) => {
  try {
    const category = await Category.findOne({ "name" : {'$regex' : new RegExp(req.params.id, "i")}});
    
    res.json(category);
  } catch (error) {
   return res.status(500).json({ message: "erreur serveur" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = name || category.name;
      category.description = description || category.description;

      const updatedcategory = await Category.findByIdAndUpdate(req.params.id, {
        name: category.name,
        Description: category.description,
      });

      res.json(updatedcategory);
    } else {
      res.status(404).send({ message: "categorie introuvable" });
    }
  } catch (error) {
   
   return res.status(500).json({ message: "erreur serveur" });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).send({ message: "categorie introuvable" });
    } else {
      const deletedCategory = await Category.deleteOne({ _id: req.params.id });
      res.json(deletedCategory);
    }
  } catch (error) {
  return  res.status(500).json({ message: "erreur serveur" });
  }
};
module.exports = {
  updateCategory,
  getSingleCategory,
  getCategories,
  addcategory,
  deleteCategory,
  getCategoryByName,
  getTotalCategories
};