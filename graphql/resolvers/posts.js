const Post = require('../../models/Post')

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const Posts = await Post.find();
        return Posts;
      } catch (e) {
        throw new Error(e);
      }
    },

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
