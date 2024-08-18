/**
 *  this function is exeucted on "customer.created" action triggered by Salla .
 *
 * Action Body received from Salla
 * @param {Object} eventBody
 * { 
 *  event: 'customer.created',
 *  merchant: 1305146709,
 *  created_at: 'Tue Jan 25 2022 12:36:49 GMT+0300',
 *  data:
 *    {
 *      "id": 225167971,
 *      "first_name": "User",
 *      "last_name": "Mohammed",
 *      "mobile": 555555555,
 *      "mobile_code": "+966",
 *      "email": "test@gmail.com",
 *      "urls": {
 *        "customer": "https://salla.sa/dev-wofftr4xsra5xtlv/profile",
 *        "admin": "https://s.salla.sa/customers/l7mYBdgXA9xJwWZRZK8WD42GNkZbjvRO"
 *      },
 *      "avatar": "https://i.ibb.co/jyqRQfQ/avatar-male.webp",
 *      "gender": "female",
 *      "birthday": {
 *        "date": "1997-06-03 00:00:00.000000",
 *        "timezone_type": 3,
 *        "timezone": "Asia/Riyadh"
 *      },
 *      "city": "الرياض",
 *      "country": "السعودية",
 *      "country_code": "SA",
 *      "currency": "AED",
 *      "location": "14",
 *      "updated_at": {
 *        "date": "2022-01-24 14:26:55.000000",
 *        "timezone_type": 3,
 *        "timezone": "Asia/Riyadh"
 *      }
 *    }
 * }
 * Arguments passed by you:
 * @param {Object} userArgs
 * { key:"val" }
 * @api public
 */
module.exports = (eventBody, userArgs) => {
  // your logic here
  return null;
};
