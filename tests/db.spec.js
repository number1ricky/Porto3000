//Test DB 2/2/22
require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
const { createUser, 
    getUser,
    getAllUsers,
    getUserById, 
    getUserByUsername,
    patchUser, 
    deleteUser,
    getProductById,
    getAllProducts,
    createProduct,
    getProductByName,
    patchProduct,
    destroyProduct,
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder,
    updateOrder,
    completeOrder,
    cancelOrder,
    getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct,
    rebuildDB } = require('../db');
const client = require('../db/client');

describe('Database', () => {
  beforeAll(async() => {
    await client.connect();
  })
  afterAll(async() => {
    await client.end();
  })
  describe('Users', () => {
    const userCredentials = {
        firstname: "Dan", 
        lastname: "Colomba", 
        email: "TheBigStache@aol.com", 
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Head_silhouette.svg/600px-Head_silhouette.svg.png", 
        username: "DanColomba", 
        password: "TheStache", 
        isAdmin: true, 
        address: "Port 5432"};
    describe('createUser({ username, password })', () => {
      let queriedUser;
      beforeAll(async () => {
        await createUser(userCredentials);
        const {rows} = await client.query(`SELECT * FROM users WHERE username = $1`, [userCredentials.username]);
        queriedUser = rows[0];
      })
      it('Creates the user with 8 credentials', async () => {
        expect(queriedUser.firstname).toBe(userCredentials.firstname);
        // expect(queriedUser.lastname).toBe(userCredentials.lastname);
        // expect(queriedUser.email).toBe(userCredentials.email);
        // expect(queriedUser.imgURL).toBe(userCredentials.imgURL);
        // expect(queriedUser.username).toBe(userCredentials.username);
        // expect(queriedUser.password).toBe(userCredentials.password);
        // expect(queriedUser.isAdmin).toBe(userCredentials.isAdmin);
        // expect(queriedUser.address).toBe(userCredentials.address);
      });
        })
  })
})
      it('Does not store plaintext password in the database', async () => {
        expect(queriedUser.password).not.toBe(userCredentials.password);
      });
      it('Hashes the password before storing it to the database', async () => {
        const hashedVersion = bcrypt.compareSync(userCredentials.password, queriedUser.password);
        expect(hashedVersion).toBe(true);
      });
      it('Does not return the password', async () => {
        expect(userToCreateAndUpdate.password).toBeFalsy();
      })
  
      describe('getUser({ username, password })', () => {
        it('Uses getUserByUsername to get the user', () =>{ 
          expect(getUserByUsername).toBeInTheDocument();
        })
        describe('getUserByUsername({ username })', () => {
          it('Gets a user based on the user username', async () => {
            let foundUser
            let user = await getUserByUsername(foundUser);
            expect(user.username).toBeTruthy();
          })
        })
      })
        let verifiedUser;
        beforeAll(async () => {
          verifiedUser = await getUser(userCredentials);
        })
        it('Verifies the passed-in, plain-text password against the password in the database (the hashed password, if this portion is complete)', async () => {
          //do we want to keep this?
          const unVerifiedUser = await getUser({username: userCredentials.username, password: 'badPassword'});
          expect(verifiedUser).toBeTruthy();
          expect(verifiedUser.username).toBe(userCredentials.username);
          expect(unVerifiedUser).toBeFalsy();
        })
        it('Does not return the password', async () => {
          expect(verifiedUser.password).toBeFalsy();
        })

      describe('getAllUsers', () => {
        it('Gets an array of objects, the users seed data', async () => {
          let users = await getAllUsers()
          expect(users).toBeTruthy();
          expect(users.length > 0).toBeTruthy();
        })
      })


      describe('getUserById', () => {
        //so the id is cerealize so will this pass? ...
        it('Gets a user based on the user Id', async () => {
          let user = await getUserById(userToCreate.id);
          expect(user).toBeTruthy();
          expect(user.id).toBe(userToCreateAndUpdate.id);
        })
      })

      describe('products', () => {
        describe('createProduct', () => {
          let createdProduct;
          it('Creates and returns the new product', async () => {
            const productValues = {
              name: "Test_Wine_Or_Cheese", 
              description: "Test_Description", 
              price: "2", 
              imgURL: "imageUrl", 
              inStock: true, 
              category: "Test category"};
            const createdProduct = await createProduct(productValues);
            expect(createdProduct.name).toBe(productValues.name);
            expect(createdProduct.description).toBe(productValues.description);
            expect(createdProduct.price).toBe(productValues.price);
            expect(createdProduct.imgURL).toBe(productValues.imgURL);
            expect(createdProduct.inStock).toBe(productValues.inStock);
            expect(createdProduct.category).toBe(productValues.category);
          })
        })

      describe('getAllProducts', () => {
        let product;
        beforeAll(async() => {
          [product] = await getAllProducts();
        })
        it('Returns an array of all products which are objects', async () => {
          expect(product).toEqual(expect.objectContaining({
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(String),
            imgURL: expect.any(String),
            inStock: expect.any(Boolean),
            categories: expect.any(String),
          }));
        })
      })

    describe('getProductById', () => {
      it('Gets a product by its id', async () => {
        const productValues = {
          name: "Test_Wine_Or_Cheese", 
          description: "Test_Description", 
          price: "2", 
          imgURL: "imageUrl", 
          inStock: true, 
          category: "Test category"};
        const createdProduct = await createProduct(productValues);
        const product = await getProductById(createdProduct.id);
        expect(product.id).toBe(createdProduct.id);
      })
    })

    describe('getProductByName', () => {
         it('Gets a product by its name', async () => {
          const productValues = {
            name: "Test_Wine_Or_Cheese", 
            description: "Test_Description", 
            price: "2", 
            imgURL: "imageUrl", 
            inStock: true, 
            category: "Test category"};
          const createdProduct = await createProduct(productValues);
          const product = await getProductByName(createdProduct.name);
          expect(createdProduct).toBeTruthy();
        });
      });
    })
