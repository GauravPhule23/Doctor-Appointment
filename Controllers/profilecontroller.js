

async function profileView(req, res) {
  const tokenValue = await req.cookies["token"]
  if(!tokenValue){
    res.status(400).json({ message: "please login"})
      
  }else{

    if (req.user.role == "Doctor") {
      try {
        res.status(200).json(req.user)
      } catch (e) {
        res.status(400).json({ message: "No Doctor found, please login", error: e })
      }
    } else {
      try {
        res.status(200).json(req.user)
      } catch (e) {
        res.status(400).json({ message: "No Patient found, please login", error: e })
      }
  
    }
  }
}


module.exports = profileView