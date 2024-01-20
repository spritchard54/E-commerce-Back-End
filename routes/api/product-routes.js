const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  // Get all products from the product table
  const productData = await Product.findAll()
  // .then((productData) => {
    res.json(productData);
  });
// });

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id` and be sure to include its associated Category and Tag data
  // Get one product from the product table
  const productData = await Product.findOne(
    {
      // Gets the product based on the id given in the request parameters
      where: {
        id: req.params.id
      },
    });
  // ).then((productData) => {
    res.json(productData);
  // });
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  // Use Sequelize's `create()` method to add a row to the table
  // Similar to `INSERT INTO` in plain SQL
  const productData = await Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock
  });
    // .then((newProduct) => {
    //   // Send the newly created row as a JSON object
    //   res.json(newProduct);
    // })
    // .catch((err) => {
    //   res.json(err);
    // });
    return res.json(productData);
});

Product.create(req.body)
  .then((product) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // if no product tags, just respond
    res.status(200).json(product);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  // Looks for the products based on id given in the request parameters and deletes the instance from the database
  const productData = await Product.destroy({
    where: {
      id: req.params.id,
    },
  }); //added semicolon here after commenting out lines below
    // .then((deletedProduct) => {
    //   res.json(deletedProduct);
    // })
    // .catch((err) => res.json(err));
return res.json(productData);

});

module.exports = router;
