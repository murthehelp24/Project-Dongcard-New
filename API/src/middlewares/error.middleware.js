

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'เกิดข้อผิดพลาดฝั่งเซิร์ฟเวอร์';
  res.status(statusCode).json({ message })
}

export default errorMiddleware