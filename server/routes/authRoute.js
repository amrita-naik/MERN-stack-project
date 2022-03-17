const router = require("express").Router();
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

let refreshTokens = [];

router.post("/refresh", (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
});

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
      expiresIn: "5s",
    });
  };
  
  const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
  };

router.post("/auth", async (req, res) => {

  try {

		const user = await User.findOne({ username: req.body.username });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const hashPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString()

    const newUser	=	await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send(error);
	}
})

router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
          res.status(401).json("Wrong password or username!");
        
          if (user) {
            //Generate an access token
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.json({
              username: user.username,
              isAdmin: user.isAdmin,
              accessToken,
              refreshToken,
            });
          } 
    } catch (error) {
      console.log(error)
        res.status(500).send(error);
    }
})

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

router.delete("/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted.");
  } else {
    res.status(403).json("You are not allowed to delete this user!");
  }
});

router.post("/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     !user && res.status(401).json("Wrong password or username!");

//     const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
//     const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

//     originalPassword !== req.body.password &&
//       res.status(401).json("Wrong password or username!");

//     const accessToken = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.SECRET_KEY,
//       { expiresIn: "5d" }
//     );

//     const { password, ...info } = user._doc;

//     res.status(200).json({ ...info, accessToken });
//   } catch (err) {
//     res.status(500).json(err);
//   }

//});

module.exports = router