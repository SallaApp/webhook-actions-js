/**
 * This function is executed on the "brand.updated" action triggered by Salla.
 *
 * Action Body received from Salla:
 * @param {Object} eventBody
 * 
 * {
 *   "event": "brand.updated",
 *   "merchant": 596493488,
 *   "created_at": "Sun Mar 24 2024 16:09:48 GMT+0300",
 *   "data": {
 *     "id": 190175156,
 *     "name": "test1212",
 *     "description": "test",
 *     "banner": "https://cdn.salla.sa/image/banner1.png",
 *     "logo": "https://cdn.salla.sa/image/logo1.png",
 *     "status": true,
 *     "ar_char": "ت",
 *     "en_char": "T",
 *     "metadata": {
 *       "title": "1231",
 *       "description": "123",
 *       "url": "123"
 *     }
 *   }
 * }
 * 
 * Arguments passed by you:
 * @param {Object} userArgs
 * 
 * { key: "val" }
 * 
 * @api public
 */
module.exports = (eventBody, userArgs) => {
  // Your logic here
  return null;
};
