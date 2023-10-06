import User from "../models/user.js";

const userAuth = async (req, res, next) => {

  try {
    const response = await User.find({
      googleID: req.headers.googleid
    });

    if (response.length !== 0) {
      next();
      return true;
    } else {
      res.status(404).json({ message: "User not found!" });
      return false;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return false;
  }
};

export default userAuth;
