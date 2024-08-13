/**
 *  This function is executed on the "order.created" action triggered by Salla.
 *
 * Action Body received from Salla
 * @param {Object} eventBody
 * { 
 *  event: 'order.created',
 *  merchant: 1305146709,
 *  created_at: 'Sun Jun 26 2022 12:21:48 GMT+0300',
 *  data:
 *    {
 *      "id": 2116149737,
 *      "reference_id": 41027662,
 *      "urls": {
 *        "customer": "https://salla.sa/dev-wofftr4xsra5xtlv/order/DXZbOz68qjnYaOw04oBa35wVELBpJyxo",
 *        "admin": "https://s.salla.sa/orders/order/DXZbOz68qjnYaOw04oBa35wVELBpJyxo"
 *      },
 *      "date": {
 *        "date": "2022-06-26 12:21:45.000000",
 *        "timezone_type": 3,
 *        "timezone": "Asia/Riyadh"
 *      },
 *      "draft": false,
 *      "read": true,
 *      "source": "store",
 *      "source_device": "desktop",
 *      "source_details": {
 *        "type": "direct",
 *        "value": null,
 *        "device": "desktop",
 *        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
 *        "ip": "31.166.186.78"
 *      },
 *      "status": {
 *        "id": 566146469,
 *        "name": "بإنتظار المراجعة",
 *        "slug": "under_review",
 *        "customized": {
 *          "id": 986688842,
 *          "name": "بإنتظار المراجعة"
 *        }
 *      },
 *      "receipt_image": "https://cdn.salla.sa/jKxK/md4Pv5jeLEX52zWTboKSVr8VmlX5tNbiu9YF00C0.png",
 *      "payment_method": "bank",
 *      "currency": "SAR",
 *      "amounts": {
 *        "sub_total": {
 *          "amount": 186,
 *          "currency": "SAR"
 *        },
 *        "shipping_cost": {
 *          "amount": 15,
 *          "currency": "SAR"
 *        },
 *        "cash_on_delivery": {
 *          "amount": 0,
 *          "currency": "SAR"
 *        },
 *        "tax": {
 *          "percent": "0.00",
 *          "amount": {
 *            "amount": 0,
 *            "currency": "SAR"
 *          }
 *        },
 *        "discounts": [
 *          {
 *            "title": "new offer",
 *            "type": "special",
 *            "code": "new offer",
 *            "discount": "5.00",
 *            "discounted_shipping": 0
 *          }
 *        ],
 *        "total": {
 *          "amount": 196,
 *          "currency": "SAR"
 *        }
 *      },
 *      "shipping": {
 *        "id": 1833934431,
 *        "company": "السعودية",
 *        "receiver": {
 *          "name": "Mohammed Ali",
 *          "email": "usertest@gmail.com",
 *          "phone": "999123456789"
 *        },
 *        "shipper": {
 *          "name": "Demo",
 *          "company_name": "dev-wofftr4xsra5xtlv",
 *          "email": "wofftr4xsra5xtlv@email.partners",
 *          "phone": "966500000000"
 *        },
 *        "pickup_address": {
 *          "country": "السعودية",
 *          "city": "مكة",
 *          "shipping_address": "شارع عبدالله,السلام,23233, سنابل السلام, مكة,السعودية",
 *          "street_number": "شارع عبدالله",
 *          "block": "السلام",
 *          "postal_code": "23233",
 *          "geo_coordinates": {
 *            "lat": 21.3825905096851,
 *            "lng": 39.77319103068542
 *          }
 *        },
 *        "address": {
 *          "country": "SA",
 *          "city": "جدة",
 *          "shipping_address": " شارع ابو امية الضمري، الحي الزهراء ،, جدة, السعودية",
 *          "street_number": "ابو امية الضمري",
 *          "block": "الزهراء",
 *          "postal_code": "",
 *          "geo_coordinates": {
 *            "lat": 0,
 *            "lng": 0
 *          }
 *        }
 *      },
 *      "items": [
 *        {
 *          "id": 70815337,
 *          "name": "بيتزا",
 *          "sku": "54534534",
 *          "quantity": 1,
 *          "currency": "SAR",
 *          "weight": 0.25,
 *          "amounts": {
 *            "price_without_tax": {
 *              "amount": 186,
 *              "currency": "SAR"
 *            },
 *            "total_discount": {
 *              "amount": 5,
 *              "currency": "SAR"
 *            },
 *            "total": {
 *              "amount": 186,
 *              "currency": "SAR"
 *            }
 *          },
 *          "product": {
 *            "id": 720881993,
 *            "type": "food",
 *            "promotion": {
 *              "title": "اطلبها ساخنه",
 *              "sub_title": "بيتزا خضار مشكل"
 *            },
 *            "status": "sale",
 *            "is_available": true,
 *            "sku": "54534534",
 *            "name": "بيتزا",
 *            "price": {
 *              "amount": 66,
 *              "currency": "SAR"
 *            },
 *            "sale_price": {
 *              "amount": 45,
 *              "currency": "SAR"
 *            },
 *            "currency": "SAR",
 *            "url": "https://salla.sa/dev-wofftr4xsra5xtlv/بيتزا/p720881993",
 *            "thumbnail": "https://cdn.salla.sa/bYQEn/buItWZf4OLbaTmL7vTMlDUWLOn20hfpq3QUbD2AB.jpg"
 *          },
 *          "options": [
 *            {
 *              "id": 1197801866,
 *              "product_option_id": 60176141,
 *              "name": "SIZE",
 *              "type": "checkbox",
 *              "value": [
 *                {
 *                  "id": 408420634,
 *                  "name": "BIG",
 *                  "price": {
 *                    "amount": 120,
 *                    "currency": "SAR"
 *                  }
 *                }
 *              ]
 *            },
 *            {
 *              "id": 289546379,
 *              "product_option_id": 1674915438,
 *              "name": "الاضافات",
 *              "type": "checkbox",
 *              "value": [
 *                {
 *                  "id": 152115913,
 *                  "name": "بصل",
 *                  "price": {
 *                    "amount": 0,
 *                    "currency": "SAR"
 *                  }
 *                },
 *                {
 *                  "id": 1526610378,
 *                  "name": "فلفل",
 *                  "price": {
 *                    "amount": 0,
 *                    "currency": "SAR"
 *                  }
 *                }
 *              ]
 *            }
 *          ]
 *        }
 *      ],
 *      "customer": {
 *        "id": 225167971,
 *        "first_name": "Mohammed",
 *        "last_name": "Ali",
 *        "mobile": 501806978,
 *        "mobile_code": "+966",
 *        "email": "usertest@gmail.com",
 *        "avatar": "https://cdn.salla.sa/customer_profiles/5i6SUhu9dlF1fvL3EcV98U644eOlG9jcEipz6dOo.jpg",
 *        "gender": "female",
 *        "birthday": {
 *          "date": "1997-06-03 00:00:00.000000",
 *          "timezone_type": 3,
 *          "timezone": "Asia/Riyadh"
 *        },
 *        "city": "جدة",
 *        "country": "السعودية",
 *        "country_code": "SA",
 *        "currency": "SAR"
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
