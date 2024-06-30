const handler500 = (err, req, res, next) => {
  res.status(500).json({
    status: 'fail',
    errors: err.message,
  });
}

module.exports = handler500;