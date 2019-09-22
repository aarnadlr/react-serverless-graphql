require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

module.exports = {
  Mutation: {
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      },
      context,
      info
    ) {
      //Validate user data
      // Make sure user doesnt already exist
      // Hash password and create auth token
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString()
			});

			const res = await newUser.save();

			const token = jwt.sign({
				id: res.id,
				email: res.email,
				username: res.username
			}, process.env.SECRET_KEY, { expiresIn: '1h'});

			return {
				...res._doc,
				id: res._id,
				token
			}
    }
  },

  Query: {
    getPosts: async () => {
      try {
        const Posts = await Post.find();
        return Posts;
      } catch (e) {
        throw new Error(e);
      }
    }

    // getUsers: async () => {
    //   try {
    //     const Users = await User.find();
    //     return Users;
    //   } catch (e) {
    //     throw new Error(e);
    //   }
    // }
  }
};
