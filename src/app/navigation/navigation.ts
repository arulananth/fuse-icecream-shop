import {
    FuseNavigation
} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'shop-management',
        title: 'Shop Management',
        type: 'collapsable',
        icon: 'shopping_cart',
        badge: {
            title: '3',
            bg: '#525e8a',
            fg: '#FFFFFF'
        },
        children: [
            {
                id: 'orders',
                title: 'Orders',
                type: 'item',
                url: '/shop-management/orders'
            },
            {
                id: 'category-management',
                title: 'Category Management',
                type: 'item',
                url: '/shop-management/category-management'
            },
            {
                id: 'product-management',
                title: 'Product Management',
                type: 'item',
                url: '/shop-management/product-management'
            }
        ]
    },
    {
        id: 'user-reports',
        title: 'User Reports',
        type: 'collapsable',
        icon: 'Person',
        badge: {
            title: '2',
            bg: '#525e8a',
            fg: '#FFFFFF'
        },
        children: [
            {
                id: 'user-management',
                title: 'Users Management',
                icon: 'person',
                type: 'item',
                url: '/user-reports/user-management'
            },
            {
                id: 'user-reports-dashboard',
                title: 'User Reporting',
                icon: 'chart-bar',
                type: 'item',
                url: '/user-reports/user-reports-dashboard'
            }
        ]
    },
    
];
