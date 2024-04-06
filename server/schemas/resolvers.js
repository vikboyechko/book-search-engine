const { User, Book } = require('../models');

const resolvers = {
  Query: {
    // get a single user by either their id or their username
    async getSingleUser({ user = null, params }, res) {
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });

      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }
      
    return foundUser;

    },


  },

  Mutation: {

    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, { body }) => {
      const user = await User.findOne 
        ({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
            }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }

        const token = signToken(user);
        return { token, user };
    },

    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
        const token = signToken(user);
        return { token, user };

    },

    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (parent, { userId, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: bookId } },
        { new: true }
      );
        return updatedUser;
    },

    // remove a book from `savedBooks`
    removeBook: async (parent, { userId, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
        }
        return updatedUser;
    }
  },
};

module.exports = resolvers;
