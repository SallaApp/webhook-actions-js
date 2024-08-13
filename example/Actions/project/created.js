/**
 * This function is executed on the "product.created" action triggered by Salla.
 *
 * Action Body received from Salla:
 * @param {Object} eventBody
 * { 
 *   event: 'product.created',
 *   merchant: 1305146709,
 *   created_at: 'Mon Apr 17 2023 12:14:21 GMT+0300',
 *   data: {
 *     id: 1025569331,
 *     promotion: {
 *       title: null,
 *       sub_title: null
 *     },
 *     sku: '',
 *     mpn: null,
 *     gtin: null,
 *     type: 'booking',
 *     name: 'Product-Booking-API-Date-and-Time',
 *     short_link_code: 'aezvrRn',
 *     urls: {
 *       customer: 'https://salla.sa/dev-wofftr4xsra5xtlv/product-booking-api-date-and-time/p1025569331',
 *       admin: 'https://s.salla.sa/products/1025569331'
 *     },
 *     price: {
 *       amount: 299,
 *       currency: 'SAR'
 *     },
 *     taxed_price: {
 *       amount: 343.85,
 *       currency: 'SAR'
 *     },
 *     pre_tax_price: {
 *       amount: 299,
 *       currency: 'SAR'
 *     },
 *     tax: {
 *       amount: 44.85,
 *       currency: 'SAR'
 *     },
 *     description: '',
 *     quantity: 20,
 *     status: 'hidden',
 *     is_available: false,
 *     views: 0,
 *     sale_price: {
 *       amount: 0,
 *       currency: 'SAR'
 *     },
 *     sale_end: null,
 *     require_shipping: false,
 *     cost_price: null,
 *     weight: 0,
 *     weight_type: null,
 *     with_tax: true,
 *     url: 'https://salla.sa/dev-wofftr4xsra5xtlv/product-booking-api-date-and-time/p1025569331',
 *     main_image: null,
 *     images: [],
 *     sold_quantity: 0,
 *     rating: {
 *       total: 0,
 *       count: 0,
 *       rate: 0
 *     },
 *     regular_price: {
 *       amount: 299,
 *       currency: 'SAR'
 *     },
 *     max_items_per_user: 1,
 *     maximum_quantity_per_order: null,
 *     show_in_app: false,
 *     notify_quantity: null,
 *     hide_quantity: true,
 *     unlimited_quantity: false,
 *     managed_by_branches: false,
 *     services_blocks: {
 *       installments: []
 *     },
 *     calories: null,
 *     customized_sku_quantity: false,
 *     channels: [],
 *     starting_price: null,
 *     metadata: {
 *       title: null,
 *       description: null
 *     },
 *     booking_details: {
 *       id: 231783151,
 *       type: 'date_time',
 *       session_duration: 50,
 *       session_gap: 3,
 *       sessions_count: 10,
 *       location: 'Medina',
 *       time_strict_type: 'days',
 *       time_strict: 5,
 *       overrides: [
 *         {
 *           id: 1476756183,
 *           date: '2023-04-23'
 *         },
 *         {
 *           id: 904045008,
 *           date: '2023-04-24'
 *         }
 *       ],
 *       availabilities: [
 *         {
 *           day: 'sunday',
 *           is_available: true,
 *           times: [
 *             {
 *               from: '09:30',
 *               to: '13:00'
 *             },
 *             {
 *               from: '12:00',
 *               to: '22:00'
 *             }
 *           ]
 *         },
 *         {
 *           day: 'monday',
 *           is_available: true,
 *           times: [
 *             {
 *               from: '10:00',
 *               to: '12:00'
 *             }
 *           ]
 *         }
 *       ]
 *     },
 *     allow_attachments: false,
 *     is_pinned: false,
 *     pinned_date: '2023-04-17 12:14:20',
 *     sort: 0,
 *     enable_upload_image: false,
 *     updated_at: '2023-04-17 12:14:21',
 *     options: [],
 *     skus: [],
 *     categories: [],
 *     brand: null,
 *     tags: []
 *   }
 * }
 *
 * Arguments passed by you:
 * @param {Object} userArgs
 * { key: 'val' }
 * @api public
 */
module.exports = (eventBody, userArgs) => {
  // your logic here
  return null;
};
