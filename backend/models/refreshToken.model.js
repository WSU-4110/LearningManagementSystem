const mongoose = require('mongoose');
const refreshTokenSchema = mongoose.Schema({
    token: String
});
const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema);
module.exports = RefreshToken;