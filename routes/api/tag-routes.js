const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags and be sure to include its associated Product data
  // Get all tags from the tag table
  const tagData = await Tag.findAll();
  // .then((tagData) => {
   return res.json(tagData);
  // });
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` and be sure to include its associated Product data
  // Get one tag from the tag table
  const tagData = await Tag.findOne(
    {
      // Gets the tags based on the id given in the request parameters
      where: {
        id: req.params.id
      },
    });//added );
  // ).then((tagData) => {
    return res.json(tagData);
  // });
});

router.post('/', async (req, res) => {
  // create a new tag
  // Use Sequelize's `create()` method to add a row to the table
  // Similar to `INSERT INTO` in plain SQL
  const tagData = await Tag.create({
    tag_name: req.body.tag_name
  });//added ;
    // .then((newTag) => {
      // Send the newly created row as a JSON object
      return res.json(tagData); //was newTag
    // })
    // .catch((err) => {
      // res.json(err);
    // });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,
    },
    {
      // Gets the tag based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  );
    // .then((updatedTag) => {
      // Sends the updated tag as a json response
      return res.json(tagData); //was updatedTag
    // })
    // .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  // Looks for the tag based on id given in the request parameters and deletes the instance from the database
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  }); // added ;
    // .then((deletedTag) => {
      return res.json(tagData); // was deletedTag
    // })
    // .catch((err) => res.json(err));
});

module.exports = router;
