const apiError = require("../Services/apiError")
const apiResponse = require("../Services/apiResponse")


async function profileView(req, res) {
  const tokenValue = await req.cookies["token"]
  if (!tokenValue) {
    res.status(400).json(new apiError(400, "please login"))

  } else {
    try {
      res.status(200).json(new apiResponse(200, "profile ", req.user))
    } catch (e) {
      res.status(400).json(new apiError(400, `No ${req.user.role == "Doctor" ? "Doctor" : "Patient"} found, please login`, e.message))
    }


    // if (req.user.role == "Doctor") {
    //   try {
    //     res.status(200).json(req.user)
    //   } catch (e) {
    //     res.status(400).json({ message: "No Doctor found, please login", error: e })
    //   }
    // } else {
    //   try {
    //     res.status(200).json(req.user)
    //   } catch (e) {
    //     res.status(400).json({ message: "No Patient found, please login", error: e })
    //   }

    // }
  }
}


module.exports = profileView