const notFound = (req,res,next) =>{
  //console.log(req)
  res.status(404)
  const error = new Error(`${req.originalUrl} Not Found! `)
  next(error);
}

const errHandler = (err,req,res,next) => {
  let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  let message = err.message;
  if(err.name === 'CastError' && err.kind=='ObjectId' ) {
    statusCode = 404;
    message = 'Resource not found!'
  }

  res.status(statusCode).json({
    message,
    stack : process.env.NODE_ENV == 'production' ? null : err.stack
  })
}

export {notFound, errHandler}