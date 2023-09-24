const Pack = require("../models/pack");
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

const addPackType = async (req, res) => {
  try {
    console.log(req.body);
    const { num_uses, credit, prix } = JSON.parse(req.body.pack);
    if (!num_uses) {
      return res.status(400).send({ msg: "validité manquante" });
    } else if (!credit) {
      return res.status(400).send({ msg: "credit manquant" });
    } else if (!prix) {
      return res.status(400).send({ msg: "prix manquant" });
    }
    console.log(req.file);
    const packImage = await Image.create({
      //imageURL: path.join("/uploads", req.file.filename), //dev
      imageURL: "/uploads/" + req.file.path.split("/").pop(), //prod
    });

    const query = await Pack.create({
      num_uses,
      credit,
      prix,
      image: packImage._id,
    });

    return res.status(200).send(query);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "erreur create pack" });
  }
};

const updatePack = async (req, res) => {
  try {
    const { num_uses, credit, prix } = req.body;
    if (!num_uses) {
      return res.status(400).send({ msg: "validité manquante" });
    } else if (!credit) {
      return res.status(400).send({ msg: "credit manquant" });
    } else if (!prix) {
      return res.status(400).send({ msg: "prix manquant" });
    }

    const pack = await Pack.findById(req.params.id);
    if (pack) {
      pack.num_uses = num_uses || pack.num_uses;
      pack.credit = credit || pack.credit;
      pack.prix = prix || pack.prix;

      if (req.file) {
        // if a new image file was uploaded, update the image field of the Pack model
        const packImage = await Image.create({
          imageURL: "/uploads/" + req.file.path.split("/").pop(),
        });
        pack.image = packImage._id;
      }

      const updatedPack = await pack.save();
      if (updatedPack) {
        res.json(updatedPack);
      } else {
        res
          .status(404)
          .send({ message: "impossible de mettre à jour le pack" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const updatePackImage = async (req, res) => {
  try {
    const existpack = await Pack.findById(req.params.id).populate("image");
    if (!req.file) {
      return res.status(404).json({ message: "pas de photo !" });
    }
    if (existpack) {
      if (existpack.image) {
        const url = existpack.image.imageURL;

        console.log(url);

        const updatedImagePath = path.join("/uploads", req.file.filename);
        const updatedpack = await Image.findByIdAndUpdate(existpack.image._id, {
          imageURL: updatedImagePath,
        });

        res.json({ message: "succes" });
        await unlinkAsync(url, function (err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        return res.status(404).json({ message: "Image introuvable" });
      }
      res.json({ message: "succes" });
    } else {
      return res.status(404).json({ message: "pack introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const getPacks = async (req, res) => {
  try {
    const result = await Pack.find({}).populate([
      {
        path: "image",
      },
    ]);
    return res.status(200).json({ Packs: result });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const getPackById = async (req, res) => {
  try {
    const packId = req.params.id;
    const pack = await Pack.findById(packId).populate([
      {
        path: "image",
      },
    ]);

    if (!pack) {
      return res.status(404).json({ message: "Pack not found" });
    }

    return res.status(200).json({ Packs: pack });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const deletePackType = async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);
    if (pack) {
      // delete the pack
      await Pack.deleteOne({ _id: req.params.id });

      // delete the associated image
      await Image.deleteOne({ _id: pack.image });

      // GET updated list of packs
      // const packs = await Pack.find().populate("image");
      // res.json(packs);
      return res.status(200).json({ message: "pack supprimé" });
    } else {
      res.status(404).send({ message: "pack introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

module.exports = {
  addPackType,
  updatePack,
  updatePackImage,
  getPacks,
  getPackById,
  deletePackType,
};
