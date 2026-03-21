// Central endpoint catalog for frontend and AI engineers.
// Base URL: `${API_HOST}/api/v1`

const ENDPOINTS = {
  basePath: '/api/v1',
  authHeader: {
    type: 'Bearer',
    format: 'Authorization: Bearer <token>',
  },

  auth: [
    {
      method: 'POST',
      path: '/auth/otp',
      auth: 'none',
      description: 'Verify OTP for user email verification.',
      body: {
        otp: 'string',
        email: 'string',
      },
    },
    {
      method: 'POST',
      path: '/auth/registration',
      auth: 'header auth: 12345678',
      description: 'Register a new user account.',
      body: {
        username: 'string',
        email: 'string',
        password: 'string',
      },
    },
    {
      method: 'POST',
      path: '/auth/login',
      auth: 'none',
      description: 'Login and receive JWT token.',
      body: {
        email: 'string',
        password: 'string',
      },
      responseNotes: ['Returns token in response payload.'],
    },
    {
      method: 'POST',
      path: '/auth/forgetpassword',
      auth: 'none',
      description: 'Start forgot-password flow.',
      body: {
        email: 'string',
      },
    },
    {
      method: 'POST',
      path: '/auth/changepassword',
      auth: 'none',
      description: 'Complete password change flow.',
      body: {
        email: 'string',
        password: 'string',
      },
    },
  ],

  product: [
    {
      method: 'POST',
      path: '/product/addcategory',
      auth: 'none',
      description: 'Create category.',
    },
    {
      method: 'GET',
      path: '/product/viewcategory',
      auth: 'none',
      description: 'List categories.',
    },
    {
      method: 'POST',
      path: '/product/addsubcategory',
      auth: 'none',
      description: 'Create subcategory.',
    },
    {
      method: 'GET',
      path: '/product/viewsubcategory',
      auth: 'none',
      description: 'List subcategories.',
    },
    {
      method: 'POST',
      path: '/product/addproduct',
      auth: 'none',
      description: 'Create product (legacy route).',
      contentType: 'multipart/form-data',
      files: {
        field: 'productImg',
        maxCount: 10,
      },
    },
    {
      method: 'GET',
      path: '/product/viewproduct',
      auth: 'none',
      description: 'List all products.',
    },
    {
      method: 'GET',
      path: '/product/viewsingleproduct/:id',
      auth: 'none',
      description: 'Get a single product by ID.',
      params: {
        id: 'productId',
      },
    },
    {
      method: 'DELETE',
      path: '/product/deleteproduct/:item',
      auth: 'none',
      description: 'Delete product by ID (legacy route).',
      params: {
        item: 'productId',
      },
    },
    {
      method: 'POST',
      path: '/product/editproduct/:getId',
      auth: 'none',
      description: 'Edit product by ID (legacy route).',
      params: {
        getId: 'productId',
      },
    },
    {
      method: 'POST',
      path: '/product/addbanner',
      auth: 'none',
      description: 'Create banner.',
      contentType: 'multipart/form-data',
      files: {
        field: 'productImg',
        maxCount: 1,
      },
    },
    {
      method: 'GET',
      path: '/product/viewbanner',
      auth: 'none',
      description: 'List banners.',
    },
    {
      method: 'DELETE',
      path: '/product/deletebanner/:item',
      auth: 'none',
      description: 'Delete banner by ID.',
      params: {
        item: 'bannerId',
      },
    },
    {
      method: 'POST',
      path: '/product/addvariant',
      auth: 'none',
      description: 'Create variant.',
      contentType: 'multipart/form-data',
      files: {
        field: 'productImg',
        maxCount: 1,
      },
    },
    {
      method: 'GET',
      path: '/product/viewvariant',
      auth: 'none',
      description: 'List variants.',
    },
    {
      method: 'GET',
      path: '/product/viewallsubcategory',
      auth: 'none',
      description: 'List all subcategories.',
    },
    {
      method: 'POST',
      path: '/product/addtocart',
      auth: 'none',
      description: 'Add product to cart.',
    },
    {
      method: 'GET',
      path: '/product/viewaddtocart',
      auth: 'none',
      description: 'Get cart list.',
    },
    {
      method: 'POST',
      path: '/product/adddiscount',
      auth: 'none',
      description: 'Add discount.',
    },
    {
      method: 'GET',
      path: '/product/topdiscount',
      auth: 'none',
      description: 'Get top discount products.',
    },
  ],

  vendor: [
    {
      method: 'POST',
      path: '/vendor/products',
      auth: 'Bearer token + role merchant/admin',
      description: 'Create vendor-owned product.',
      contentType: 'multipart/form-data',
      files: {
        field: 'productImg',
        maxCount: 10,
      },
    },
    {
      method: 'GET',
      path: '/vendor/products',
      auth: 'Bearer token + role merchant/admin',
      description: 'List logged-in vendor products.',
    },
    {
      method: 'PATCH',
      path: '/vendor/products/:productId/stock',
      auth: 'Bearer token + role merchant/admin',
      description: 'Update stock/isActive for vendor product.',
      params: {
        productId: 'productId',
      },
      body: {
        stock: 'number (optional)',
        isActive: 'boolean (optional)',
      },
    },
  ],

}

module.exports = ENDPOINTS
