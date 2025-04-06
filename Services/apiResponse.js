class apiResponse {
  constructor(statusCode, message = "Success", data) {
    this.statusCode = statusCode < 400
    this.message = message
    this.data = data
    this.success = true
  }

}

module.exports=apiResponse