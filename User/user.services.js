const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./user.schema");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username and/or password" });

    const alreadyExist = await User.findOne({ username });
    if (alreadyExist)
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  const user = await User.findOne({ username });

  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "Incorrect username or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res
      .status(400)
      .json({ success: false, message: "Incorrect username or password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ success: true, token });
};

module.exports = { register, login };
