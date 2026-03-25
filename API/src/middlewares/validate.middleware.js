import createError from 'http-errors'

export default (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    })
    next()
  } catch (error) {
    const message = error.errors?.[0]?.message || "เกิดข้อผิดพลาดในการตรวจสอบ";
    next(createError(400, message));
  }
}