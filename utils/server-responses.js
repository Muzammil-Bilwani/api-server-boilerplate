const messages = {

  error: (message, err) => ({
    success: false,
    message: message || 'Something goes wrong Retry.',
    data: err || null,
  }),

  success: (message, data) => ({
    success: true,
    message: message || 'Operation Successful',
    data,
  }),

};

module.exports = messages;
