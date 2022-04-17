export const PATH = {
    //------------ CLIENT --------------
    HOMEPAGE: '/',
    CATEGORY: '/category/:categorySeo',
    BLOG: '/blog',
    DETAIL_BLOG: '/detail-blog/:blogSeo',
    CONTACT: '/contact',
    CART: '/cart',
    CLIENT_LOGIN: '/login',
    CLIENT_REGISTER: '/register',
    CLIENT_VERIFY_ACCOUNT: '/verify-account',
    ACCOUNT: '/account',
    DETAIL_PRODUCT: '/detail-product/:productSeo',
    PAGE_SEARCH_PRODUCT: '/search/:productName',

    //------------ ADMIN --------------
    ADMIN_REGISTER: '/system-admin/register',
    ADMIN_LOGIN: '/system-admin/login',
    MANAGE_USER: '/system-admin/manage-user',
    MANAGE_CATEGORY: '/system-admin/manage-category',
    MANAGE_PRODUCT: '/system-admin/manage-product',
    MANAGE_BLOG: '/system-admin/manage-blog',
    MANAGE_ORDER: '/system-admin/manage-order',
}

export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
};

export const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const LIMIT_ITEM_ONE_PAGE_ADMIN = 10
export const LIMIT_ITEM_ONE_PAGE_CLIENT = 6