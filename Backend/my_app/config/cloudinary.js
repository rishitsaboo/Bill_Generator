const cloudinary = require('cloudinary').v2;

const requiredVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingVars = requiredVars.filter((name) => !process.env[name]);
if (missingVars.length) {
  console.warn(`Missing Cloudinary env vars: ${missingVars.join(', ')}`);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function verifyCloudinaryConfig() {
  if (missingVars.length) return;

  try {
    await cloudinary.api.ping();
    console.log(`Cloudinary connected (cloud: ${process.env.CLOUDINARY_CLOUD_NAME})`);
  } catch (err) {
    console.error(
      `Cloudinary config invalid for cloud "${process.env.CLOUDINARY_CLOUD_NAME}": ${err.message}`
    );
    console.error(
      'Update CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET from https://console.cloudinary.com'
    );
  }
}

verifyCloudinaryConfig();

module.exports = cloudinary;