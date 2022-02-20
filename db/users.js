const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({ firstname, lastname, email, imgURL, username, password, isAdmin, address}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users(firstname, lastname, email, "imgURL", username, password, "isAdmin", address) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
    `, [firstname, lastname, email, imgURL, username, hashedPassword, isAdmin, address]);
    delete user.password;
    return user;
  } catch (error){
    throw error;
  }
}

async function getUser({username, password}) {
  if (!username || !password) {
    return;
  }
  try {
    const user = await getUserByUsername(username);
    if(!user) return;

    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const {rows: users} = await client.query(`
      SELECT * FROM users
    `);
    users.forEach((user) => delete user.password)
    return users;
  } catch (error) {
    throw error;
  };
};

async function getUserById(id){
  try{
    const {rows:[user] } = await client.query(`
      SELECT * 
      FROM users
      WHERE id= $1;
    `, [id]);
    if (!user) return null;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName){
  try{
    const {rows: [user] }= await client.query(`
      SELECT * 
      FROM users
      WHERE username = $1; 
    `, [userName]);
    return user;
  } catch (error){
    throw error;
  }
}

async function patchUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    if (setString > 0) {
      await client.query(
        `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *
      `,
        Object.values(fields)
      );
    }
    return await getUserById(id);
  } catch (error) {
    console.error("Error with patchUser in db/users.");
    throw error;
  }
}

async function deleteUser(id) {
    try {
      const { rows: [user] } = await client.query(`
      DELETE * FROM users
      WHERE id=$1
  `, [id]);
    } catch (error) {
      console.error("Error with deleteUser in db/users.");
      throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    patchUser,
    deleteUser,
};
