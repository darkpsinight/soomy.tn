const PackPurchase = require("../models/packPurchase");
const PackUse = require("../models/packUse");
const Pack = require("../models/pack");
const mongoose = require("mongoose");

const addPackPurchase = async (req, res) => {
  try {
    const { pack_id, user_id, transaction_id } = req.body;
    if (!pack_id) {
      return res.status(400).send({ msg: "valeur manquante" });
    } else if (!user_id) {
      return res.status(400).send({ msg: "valeur manquante" });
    } else if (!transaction_id) {
      return res.status(400).send({ msg: "valeur manquante" });
    }

    const pack = await Pack.findById(pack_id);
    if (!pack) {
      return res.status(404).send({ msg: "Pack non trouvé" });
    }

    const num_uses = pack.num_uses;

    const query = await PackPurchase.create({
      pack_id,
      user_id,
      transaction_id,
      num_uses,
    });

    return res.status(200).send(query);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "erreur serveur" });
  }
};

// update availability of purchased pack by number of uses substructed sum of packUses
const updatePackPurchase = async (req, res) => {
  try {
    const { selectedPurchasedPack_Id } = req.params;

    const packPurchase = await PackPurchase.findOne({
      _id: selectedPurchasedPack_Id,
    });

    if (!packPurchase) {
      return res.status(404).json({ message: "Pack d'achat introuvable." });
    }

    if (packPurchase.availability === false) {
      return res.status(400).json({
        message: "Pack sélectionné n'est plus valide",
      });
    }

    const num_uses = packPurchase.num_uses;

    /* const packUseCount = await PackUse.countDocuments({
      selectedPurchasedPack_Id: selectedPurchasedPack_Id,
    }); */

    if (num_uses /* - packUseCount */ <= 0) {
      packPurchase.availability = false;
      await packPurchase.save();

      return res.status(200).json({
        packPurchase,
        message:
          "Pack sélectionné épuisé! Veuillez considérer de changer de pack ou d'en acheter un nouveau",
      });
    }

    return res.status(200).json({
      packPurchase,
      /* message: "Pack acheté est encore valable et disponible", */
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Update availability of purchased pack: (This controller has no route/api, will run after updatePackUseRemaining in packUseController, see packUseController code)
const updatePackPurchaseAvailability = async (selectedPurchasedPack_Id) => {
  try {
    const packPurchase = await PackPurchase.findOne({
      _id: selectedPurchasedPack_Id,
    });

    if (!packPurchase) {
      return {
        status: 404,
        message: "Pack sélectionné introuvable.",
      };
    }

    if (packPurchase.availability === false) {
      return {
        status: 404,
        message:
          "Pack sélectionné n'est plus valide, veuillez sélectionner un autre",
      };
    }

    const num_uses = packPurchase.num_uses;

    const packUseQuery = {
      selectedPurchasedPack_Id: selectedPurchasedPack_Id,
    };

    const [packUseCount, packUseDisabledCount] = await Promise.all([
      PackUse.countDocuments(packUseQuery),
      PackUse.countDocuments({ ...packUseQuery, isEnabled: false }),
    ]);

    if (num_uses - packUseCount <= 0 && num_uses - packUseDisabledCount <= 0) {
      packPurchase.availability = false;
      await packPurchase.save();
      return {
        status: 200,
        data: {
          packPurchase,
          message:
            "Pack sélectionné épuisé! Veuillez considérer de changer de pack ou d'en acheter un nouveau",
        },
      };
    }

    return {
      status: 200,
      data: {
        packPurchase,
        message: "Pack sélectionné est encore valable et disponible",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Erreur serveur",
    };
  }
};

// an other optimised code of the same previous controller: "updatePackPurchaseAvailability" (use IF this provides better performance)
/* const updatePackPurchaseAvailability = async (selectedPurchasedPack_Id) => {
  try {
    const packPurchase = await PackPurchase.findById(selectedPurchasedPack_Id);

    if (!packPurchase) {
      return {
        status: 404,
        message: "Pack sélectionné introuvable.",
      };
    }

    if (!packPurchase.availability) {
      return {
        status: 404,
        message: "Le pack sélectionné n'est plus valide.",
      };
    }

    const packUseEnabledCount = await PackUse.countDocuments({
      selectedPurchasedPack_Id,
      isEnabled: false,
    });

    if (packPurchase.num_uses <= packUseEnabledCount) {
      packPurchase.availability = false;
      await packPurchase.save();
      return {
        status: 200,
        data: {
          packPurchase,
          message:
            "Le pack sélectionné est épuisé. Veuillez envisager de choisir un autre pack ou d'en acheter un nouveau.",
        },
      };
    }

    return {
      status: 200,
      data: {
        packPurchase,
        message: "Le pack acheté est encore valable et disponible.",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Erreur serveur",
    };
  }
}; */

const getPackPurchase = async (req, res) => {
  try {
    const user_id = mongoose.Types.ObjectId(req.params.user_id);

    const packPurchases = await PackPurchase.find({ user_id }).populate({
      path: "pack_id",
      populate: {
        path: "image",
      },
    });

    if (packPurchases.length > 0) {
      res.status(200).send({ packPurchases });
    } else {
      res.status(404).send({ message: "Aucun pack trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur Serveur" });
  }
};

const deletePackPurchase = async (req, res) => {
  try {
    const packPurchase = await PackPurchase.findByIdAndDelete(req.params.id);
    if (packPurchase) {
      res.json({ message: "pack purchase supprimé avec success!" });
    } else {
      res.status(404).send({ message: "pack introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
module.exports = {
  addPackPurchase,
  updatePackPurchase,
  updatePackPurchaseAvailability,
  getPackPurchase,
  deletePackPurchase,
};
