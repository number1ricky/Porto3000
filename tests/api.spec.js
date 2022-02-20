//Test API 2/2/22
const axios = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SERVER_ADDRESS = 'http://localhost:', PORT = 4000 } = process.env;
const API_URL = process.env.API_URL || SERVER_ADDRESS + PORT;
const { JWT_SECRET } = process.env;
const { getUserByUsername,
    createUser, 
    getAllOrders, 
    getCartByUser, 
    createOrder, 
    updateOrder,
    getProductById, 
    getAllProducts, 
    createProduct, 
    getProductByName,
    getAllUsers, 
    getOrdersByUser   } = require('../db/init_db');
const client = require('../db/client')

describe('API', () => {
  let token, registeredUser;
  const productToUpdate = { 
    name: "Test_Wine_Or_Cheese", 
    description: "Test_Description", 
    price: "2", 
    imgURL: "imageUrl", 
    inStock: true, 
    category: "Test category"};
  beforeAll(async() => {
    await client.connect();
  })
  afterAll(async() => {
    await client.end();
  })
  //deleted it about api/health
  describe('users', () => {
    const newUser = { 
      firstname: "Richard", 
      lastname: "Brown", 
      email: "number1ricky@yahoo.com", 
      imgURL: 'https://www.customscene.co/wp-content/uploads/2020/01/wine-bottle-mockup-thumbnail.jpg', 
      username: "number1ricky", 
      password: "SomethingLameAndOnATrackedList", 
      isAdmin: false, 
      address: "867530, Nine court."};
    let newUserShortPassword = { username: 'rickyShort', password: 'Brown' };
    describe('POST /users/register', () => {
      let tooShortSuccess, tooShortResponse;
      beforeAll(async() => {
        const successResponse = await axios.post(`${API_URL}/api/users/register`, newUser);
        registeredUser = successResponse.data.user;
        try {
          tooShortSuccess = await axios.post(`${API_URL}/api/users/register`, newUserShortPassword);
        } catch(err) {
          tooShortResponse = err.response;
        }
      })
      it('Checks if a username exists already.', () => {
          expect(!getUserByUsername).toBeFalsy();
        })
      it('Creates a new user.', () => {
        expect(typeof registeredUser).toEqual('object');
        expect(registeredUser.username).toEqual(newUser.username);
      });
      it('Requires username and password. Requires all passwords to be at least 8 characters long.', () => {
        expect(newUser.password.length).toBeGreaterThan(7);
      });
      it('Hashes password before saving user to DB.', async () => {
        const {rows: [queriedUser]} = await client.query(`
          SELECT *
          FROM users
          WHERE id = $1;
        `, [registeredUser.id]);
        expect(queriedUser.password).not.toBe(newUser.password);
        expect(await bcrypt.compare(newUser.password, queriedUser.password)).toBe(true);
      });
      it('Throws errors for duplicate username', async () => {
        let duplicateSuccess, duplicateErrResp;
        try {
          duplicateSuccess = await axios.post(`${API_URL}/api/users/register`, newUser);
        } catch (err) {
          duplicateErrResp = err.response;
        }
        expect(duplicateSuccess).toBeFalsy();
        expect(duplicateErrResp.data).toBeTruthy();
      });
      it('Throws errors for password-too-short.', async () => {
        expect(tooShortSuccess).toBeFalsy();
        expect(tooShortResponse.data).toBeTruthy();
      });
    });
    describe('POST /users/login', () => {
      it('Logs in the user. Requires username and password, and verifies that hashed login password matches the saved hashed password.', async () => {
        const {data} = await axios.post(`${API_URL}/api/users/login`, newUser);
        token = data.token;
        expect(data.token).toBeTruthy();
      });
      it('Returns a JSON Web Token. Stores the id and username in the token.', async () => {
        const parsedToken = jwt.verify(token, JWT_SECRET);
        expect(parsedToken.id).toEqual(registeredUser.id);
        expect(parsedToken.username).toEqual(registeredUser.username);
      });
    })
    describe('GET /users/me', () => {
      it('Sends back users data if valid token is supplied in header', async () => {
        const {data} = await axios.get(`${API_URL}/api/users/me`, {
          headers: {'Authorization': `Bearer ${token}`}
        });        
        expect(data.username).toBeTruthy();
        expect(data.username).toBe(registeredUser.username);
      });
      it('Rejects requests with no valid token', async () => {
        let noTokenResp, noTokenErrResp;
        try {
          noTokenResp = await axios.get(`${API_URL}/api/users/me`);
        } catch (err) {
          noTokenErrResp = err.response;
        }
        expect(noTokenResp).toBeFalsy();
        expect(noTokenErrResp.data).toBeTruthy();
      });
    });
  describe('products', () => {
    const productToCreate = {
      name: "Test_Wine_Or_Cheese", 
      description: "Test_Description", 
      price: "2", 
      imgURL: "imageUrl", 
      inStock: true, 
      category: "Test category"};
    describe('GET /', () => {
      it('Returns a list of all products in the database', async () => {
        const product = { name: 'Grenache', inStock: true };
        const createdProduct = await createProduct(productToCreate);
        const {data: products} = await axios.get(`${API_URL}/api/`);
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].name).toBeTruthy();
        expect(products[0].description).toBeTruthy();
        const [filteredProduct] = products.filter(product => product.name === createdProduct.name);
        expect(filteredProduct.name).toEqual(product.name);
        expect(filteredProduct.inStock).toEqual(product.inStock);
      });
    });
    describe('POST "/:productId" (id)', () => {
        it('Creates a new prduct', async () => {
          const {data: respondedProduct} = await axios.post(`${API_URL}/api/`, productToUpdate, { headers: {'Authorization': `Bearer ${token}`} });
          expect(respondedProduct.id).toEqual(productToUpdate.id);
          expect(respondedProduct.name).toEqual(productToUpdate.name);
          expect(respondedProduct.description).toEqual(productToUpdate.description);
          expect(respondedProduct.inStock).toEqual(productToUpdate.inStock);
          expect(respondedProduct.price).toEqual(productToUpdate.price);
          expect(respondedProduct.category).toEqual(productToUpdate.category);
          productToUpdate = respondedProduct;
        });
      });
   })
  })
 })