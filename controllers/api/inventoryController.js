const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory, Feature, Proficiency, Spell } = require("../../models");
const tokenAuth = require("../../middleware/tokenAuth");
const router = require('express').Router();

// The `http://localhost:3001/api/inventory` endpoint

// create  
router.post('/:id', tokenAuth, async (req, res) => {
    try {
      const inventoryData = await Inventory.create({
        user_id: req.user.id,
      })
      res.status(200).json(inventoryData)
    } catch(err) {
        res.status(400).json({ message: "an error occured", err: err });
      };
  });

// find one 
router.get('/:id', async (req, res) => {
    try {
      const inventoryData = await Inventory.findByPk(req.params.id, {
        include: [User, Character],
      });
      if (!inventoryData) {
        res.status(404).json({ message: 'No Inventory found with that id!' });
        return;
      }
      res.status(200).json(inventoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// update 
router.put('/:id', tokenAuth, async (req, res) => {
    try {
      const inventoryData = await Inventory.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!inventoryData) {
        res.status(404).json({ message: 'No Inventory with this id!' });
        return;
      }
      res.status(200).json(inventoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete 
router.delete('/:id', tokenAuth, async (req, res) => {
    try {
      const inventoryData = await Inventory.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!inventoryData) {
        res.status(404).json({ message: 'No Inventory with this id!' });
        return;
      }
      res.status(200).json(inventoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;