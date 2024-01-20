const router = require('express').Router();
// Import the Category and Poduct models
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories and be sure to include its associated Products
  // Get all categories from the category table
  const categoryData = await Category.findAll()

  //This .then statement is not seen in activity 09, only the return statment
    // .then((categoryData) => { 
      return res.json(categoryData);
    });
// });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value and be sure to include its associated Products
  // Get one category from the category table

  const categoryData = await Category.findOne(
    {
      // Gets the category based on the id given in the request parameters
      where: {
        id: req.params.id
      },
    });
  // ).then((categoryData) => {
    return res.json(categoryData);
  // });
});

router.post('/', async (req, res) => {
  // create a new category
  // const categoryData = await Category.create({
  //   category_name: req.body.category_name
  // })
  //   .then((newCategory) => {
  //     // Send the newly created row as a JSON object
  //     res.json(newCategory);
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });
  const categoryData = await Category.create(req.body);
  return res.json(categoryData);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // Category.update(
  //   {
  //     // All the fields you can update and the data attached to the request body.
  //     category_name: req.body.category_name,
  //   },
  //   {
  //     // Gets the category based on the id given in the request parameters
  //     where: {
  //       id: req.params.id,
  //     },
  //   }
  // )
  //   .then((updatedCategory) => {
  //     // Sends the updated category as a json response
  //     res.json(updatedCategory);
  //   })
  //   .catch((err) => res.json(err));

  const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        category_id: req.params.category_id,
      },
    }
  );

  return res.json(categoryData);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  // Looks for the category based on id given in the request parameters and deletes the instance from the database
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
    // .then((deletedCategory) => {
    //   res.json(deletedCategory);
    // })
    // .catch((err) => res.json(err));
    return res.json(categoryData);
});

module.exports = router;
