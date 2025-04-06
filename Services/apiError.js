class apiError extends Error {
  constructor(statusCode, message = "Something went wrong",errors=[]) {
   super(message)
    this.statusCode=statusCode >=400
    this.errors = errors
    this.message=message
    this.data=null
    this.success=false
   
  }
}

module.exports=apiError