const PackUse = require("../models/packUse");
const PackPurchase = require("../models/packPurchase");
const Pack = require("../models/pack");
const Room = require("../models/auction");
const { updatePackPurchaseAvailability } = require("./packPurchaseController");

// creation nouveau packUse
const createPackUse = async (req, res) => {
  try {
    const { room_id, user_id, selectedPurchasedPack_Id } = req.body;

    // Check if all required fields are provided
    if (!room_id || !user_id || !selectedPurchasedPack_Id) {
      return res.status(400).send({ message: "Action non autorisée" });
    }

    // Check if the selectedPurchasedPack_Id corresponds to a purchased pack with selected set to true
    const purchasedPack = await PackPurchase.findOne({
      _id: selectedPurchasedPack_Id,
    });
    if (!purchasedPack) {
      return res
        .status(404)
        .send({ message: "Veuillez sélectionner un pack valide" });
    }
    if (purchasedPack.availability === false) {
      return res
        .status(400)
        .send({ message: "Le pack sélectionné n'est plus valide" });
    }

    // Check if the selectedPurchasedPack_Id is already used by the same user and room
    const existingPackUseWithSamePack = await PackUse.findOne({
      room_id,
      user_id,
      selectedPurchasedPack_Id,
    });
    if (existingPackUseWithSamePack) {
      return res.status(400).send({
        message:
          "Pack déja joué dans cette enchére, veuillez sélectionner ou acheter un nouveau pack",
      });
    }

    // Check if the user already has a room with an existing packUse
    // const existingPackUse = await PackUse.findOne({ room_id, user_id });
    // if (existingPackUse) {
    //   const room = await Room.findOne({ _id: room_id });
    //   const remainingCredit = existingPackUse.remaining - room.mise;

    //   // user can't select an other pack if packUse.remaining >= room.mise
    //   if (remainingCredit >= 0) {
    //     return res.status(400).send({
    //       message: "Pack déjà sélectionné pour cette enchère",
    //     });
    //   }
    // }

    // check if old packUse is still enabled
    const existingPackUse = await PackUse.findOne({ room_id, user_id });

    if (existingPackUse?.isEnabled) {
      return res.status(400).send({
        message: "Le pack sélectionné est encore valide pour cette enchére",
      });
    }

    // Check if the number of packUses inferior of num_uses of purchased pack
    const num_uses = purchasedPack.num_uses;

    const packUseCount = await PackUse.countDocuments({
      selectedPurchasedPack_Id: selectedPurchasedPack_Id,
    });

    if (packUseCount > num_uses) {
      return res.status(400).send({
        message:
          "Le pack sélectionné a atteint la limite des enchères souscrites, veuillez sélectionner un nouveau pack pour cette enchère",
      });
    }

    // Check if the remaining credits of the selected pack are sufficient for the room's mise
    const pack = await Pack.findOne({ _id: purchasedPack.pack_id });
    const remainingCredits = pack.credit;

    // Fetch the room from the database to get the mise
    const room = await Room.findOne({ _id: room_id });
    const roomMise = room.mise;

    if (remainingCredits < roomMise) {
      return res.status(400).send({
        message:
          "Les crédits du pack sélectionné sont inférieurs à la mise de l'enchére",
      });
    }

    const packUse = await PackUse.create({
      room_id,
      user_id,
      selectedPurchasedPack_Id,
      remaining: pack.credit,
    });

    // Update num_uses in PackPurchase by decrementing it by 1 chaque fois on creer un packUse
    await PackPurchase.updateOne(
      { _id: selectedPurchasedPack_Id },
      { $inc: { num_uses: -1 } }
    );

    // If packUse is created successfully, return the packUse data in the response
    return res.status(200).send(packUse);
  } catch (error) {
    return res.status(500).json({ message: "Erreur Serveur" });
  }
};

// get last used packUse
const fetchLastUsedPackUse = async (req, res) => {
  const { roomId, userid } = req.params;

  try {
    // Find the latest packUse with the specified roomId and userId, sorted by createdAt date in descending order (latest first)
    const lastUsedPackUse = await PackUse.findOne({
      room_id: roomId,
      user_id: userid,
    })
      .sort({ createdAt: -1 })
      .exec();

    if (!lastUsedPackUse) {
      return res.status(404).json({
        message: "Vous n'avez pas encore de packs utilisé pour cette enchère.",
      });
    }

    return res.json(lastUsedPackUse);
  } catch (error) {
    console.error("Error fetching last used packUse:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get ALL packUses by selected room_id & user_id as params
const getPackUseByRoomAndUser = async (req, res) => {
  try {
    const { user_id, room_id } = req.params;

    // find all packUses objects based on user_id and room_id
    const packUses = await PackUse.find({ user_id, room_id });

    if (packUses.length > 0) {
      // Retrieve the room object to get the room's mise
      const room = await Room.findById(room_id);

      for (const packUse of packUses) {
        // Check if the remaining of packUse is inferior than room's mise
        if (packUse.remaining < room.mise) {
          packUse.isEnabled = false; // Change isEnabled to false
          await packUse.save(); // Save the updated packUse object
        }
      }

      return res.status(200).send(packUses);
    } else {
      return res
        .status(404)
        .send({ message: "Aucun pack sélectionné n'a été trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur Serveur" });
  }
};

// get packUse by room_id & user_id & valid only (isEnabled===true)
const getValidPackUseByRoomAndUser = async (req, res) => {
  try {
    const { user_id, room_id } = req.params;

    // Find the packUse based on user_id and room_id
    const packUse = await PackUse.findOne({
      user_id,
      room_id,
      isEnabled: true,
    });

    if (packUse) {
      return res.status(200).send(packUse);
    } else {
      /*return res
        .status(404)
        .send({ message: "Veuillez sélectionner un pack pour cette enchére" });*/

      const dummyPackUse = {
        _id: "64db7d6edf8735b2d943c917",
        room_id: "64da3eec39ce1b8778d64b89",
        user_id: "63a06af999e4f181a5675c3b",
        selectedPurchasedPack_Id: "64da1ebf8cf6ef4617477f43",
        remaining: 0,
        isEnabled: false,
        createdAt: "2023-08-15T13:17:59.216Z",
        __v: 0,
      };
      return res.status(200).send(dummyPackUse);

    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur Serveur" });
  }
};

// get packUse by room_id
const getPackUseByRoom = async (req, res) => {
  try {
    const { room_id } = req.params;

    // Find the packUse based on room_id
    const packUse = await PackUse.findOne({ room_id });

    if (packUse) {
      return res.status(200).send(packUse);
    } else {
      return res
        .status(404)
        .send({ message: "Aucun pack sélectionné trouvé pour cette room" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur Serveur" });
  }
};

// get packUse by user_id
const getPackUseByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // find the packUse based on user_id
    const packUse = await PackUse.find({ user_id });

    if (packUse) {
      return res.status(200).send(packUse);
    } else {
      return res.status(404).send({ message: "Aucun pack sélectionné trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur Serveur" });
  }
};

// get packUse by room_id & valid only (isEnabled===true)
const getValidPackUseByRoom = async (req, res) => {
  try {
    const { room_id } = req.params;

    // Find the valid packUse based on room_id and isEnabled
    const packUse = await PackUse.findOne({ room_id, isEnabled: true });

    if (packUse) {
      return res.status(200).send(packUse);
    } else {
      return res.status(404).send({
        message: "Veuillez sélectionner un pack pour cette enchére",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur Serveur" });
  }
};

// get packUse by user_id & valid only (isEnabled===true)
const getValidPackUseByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the valid packUse based on user_id & isEnabled
    const packUse = await PackUse.find({ user_id, isEnabled: true });

    if (packUse) {
      return res.status(200).send(packUse);
    } else {
      return res
        .status(404)
        .send({ message: "Aucun pack sélectionné valide trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur Serveur" });
  }
};

// update packUse validity (isEnabled), call this when you want to set (isEnabled to false)
const updatePackUseValidity = async (req, res) => {
  try {
    const { user_id, room_id, selectedPurchasedPack_Id } = req.body;
    const packUse_Id = req.params.packUse_Id;

    if (!room_id || !user_id || !selectedPurchasedPack_Id) {
      return res.status(400).send({ message: "Champs obligatoires manquants" });
    }

    // Check if packPurchase availability is true
    const packPurchase = await PackPurchase.findById(selectedPurchasedPack_Id);
    if (!packPurchase) {
      return res.status(404).json({ message: "Le pack acheté introuvable" });
    }

    if (packPurchase.availability) {
      const packUse = await PackUse.findById(packUse_Id);
      if (!packUse) {
        return res
          .status(404)
          .json({ message: "Le pack sélectionné introuvable" });
      }

      if (packUse.isEnabled) {
        const auction = await Room.findById(room_id);
        if (!auction) {
          return res.status(404).json({ message: "Enchére introuvable" });
        }

        if (auction && auction.status === "enable") {
          /* const packUseCount = await PackUse.countDocuments({
            selectedPurchasedPack_Id: selectedPurchasedPack_Id,
          }); */

          const num_uses = packPurchase.num_uses;
          const remaining = packUse.remaining;
          const mise = auction.mise;

          if (remaining >= mise && num_uses /* - packUseCount > */ > 0) {
            return res.status(200).send(packUse);
          }
        }
      }
    }

    // If any of the conditions fail, update packUse.isEnabled to false
    const updatedPackUse = await PackUse.findByIdAndUpdate(
      packUse_Id,
      { isEnabled: false },
      { new: true }
    );

    return res.status(200).send(updatedPackUse);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// update remaining value of packUse after each Mise
const updatePackUseRemaining = async (req, res) => {
  try {
    const { packUse_Id } = req.params;

    // Retrieve the packUse & auction documents
    const packUse = await PackUse.findById(packUse_Id);
    const auction = await Room.findById(packUse.room_id);
    if (!packUse || !auction) {
      return res
        .status(404)
        .json({ message: "Le pack sélectionné ou enchére pas trouvé" });
    }

    /* // check availability to selected purchased pack
    const selectedPurchasedPack = await PackPurchase.findById(
      packUse.selectedPurchasedPack_Id
    );
    if (!selectedPurchasedPack) {
      return res.status(404).json({ message: "Pack d'achat introuvable." });
    }

    if (!selectedPurchasedPack.availability) {
      return res.status(400).json({
        message: "Ce pack n'est plus valide. Veuillez sélectionner un autre.",
        packPurchase: selectedPurchasedPack,
      });
    } */

    // Check if the remaining number is less than Room.mise
    const remaining = packUse.remaining;
    const mise = auction.mise;

    if (remaining > mise) {
      packUse.remaining -= mise;
      await packUse.save();
    } else if (remaining === mise) {
      packUse.remaining -= mise;
      packUse.isEnabled = false;
      await packUse.save();
      await updatePackPurchaseAvailability(packUse.selectedPurchasedPack_Id);
      return res.status(200).json({
        packUse,
        message:
          "Oops! Le pack est épuisé pour cet enchére. Veuillez sélectionner un autre pack.",
      });
    } else if (remaining < mise) {
      packUse.isEnabled = false;
      await packUse.save();
      await updatePackPurchaseAvailability(packUse.selectedPurchasedPack_Id);
      return res.status(200).json({
        packUse,
        message:
          "Oops! Le pack est épuisé pour cet enchére. Veuillez sélectionner un autre pack.",
      });
    }

    // Return the packUse document
    return res.status(200).json(packUse);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// supprission de packUse par packUseId
const deletePackUseById = async (req, res) => {
  try {
    const { packUseId } = req.params;

    // find the packUse and delete it by its Id
    const deletedPackUse = await PackUse.findByIdAndDelete(packUseId);

    if (deletedPackUse) {
      return res
        .status(200)
        .send({ message: "Le pack sélectionné supprimé avec success" });
    } else {
      // check if the packUse is not found or the collection is empty
      const packUseCount = await PackUse.countDocuments();
      if (packUseCount === 0) {
        return res
          .status(404)
          .send({ message: "Le pack sélectionné est vide" });
      } else {
        return res
          .status(404)
          .send({ message: "Le pack sélectionné introuvable" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur Serveur" });
  }
};

module.exports = {
  createPackUse,
  fetchLastUsedPackUse,
  getPackUseByRoomAndUser,
  getPackUseByRoom,
  getPackUseByUser,
  getValidPackUseByRoomAndUser,
  getValidPackUseByRoom,
  getValidPackUseByUser,
  updatePackUseValidity,
  updatePackUseRemaining,
  deletePackUseById,
};
