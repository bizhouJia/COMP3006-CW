import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'
import Container from '../views/layout/Container'

export const constantRouterMap = [
  { path: '/', redirect: '/login', name: 'Login', component: () => import('@/views/login/Login'), hidden: true },
  { path: '/login', name: 'Login', component: () => import('@/views/login/Login'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // Frontend main page
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index'),
    hidden: true,
    children: [
      { path: '', name: '', component: () => import('@/views/index/default') },
      { path: 'userInfo', name: '', component: () => import('@/views/index/userInfo/index') },
      { path: 'edit', name: '', component: () => import('@/views/index/userInfo/edit') },
      { path: 'modify', name: '', component: () => import('@/views/index/userInfo/modify') }
    ]
  },

  // Backend main page
  {
    path: '/admin',
    component: Container,
    redirect: '/home',
    children: [
      { path: '', name: 'Home', component: () => import('@/views/home/index') }
    ]
  },
  // User center
  {
    path: '/userInfo',
    component: Container,
    children: [
      { path: '', name: 'userInfo', component: () => import('@/views/userInfo/index') },
      {
        path: 'edit',
        name: 'editUser',
        hidden: true,
        component: () => import('@/views/userInfo/edit'),
        meta: { title: 'Edit Personal information' }
      },
      {
        path: 'modify',
        name: 'modifyPW',
        hidden: true,
        component: () => import('@/views/userInfo/modifyPassword'),
        meta: { title: 'Edit password' }
      },
    ]
  },

  // User management
  {
    path: '/userManage',
    component: Container,
    children: [
      { path: '', name: 'userList', component: () => import('@/views/userManage/index') },
      {
        path: 'edit',
        name: 'editUserOne',
        hidden: true,
        component: () => import('@/views/userManage/edit'),
        meta: { title: 'Edit information' }
      }
    ]
  },

  {
    path: '/roomType', component: Container, children: [
      { path: '', name: 'RoomType', component: () => import('@/views/roomType/index') },
      {
        path: 'add',
        name: 'addType',
        hidden: true,
        component: () => import('@/views/roomType/add'),
        meta: { title: 'Add room types' }
      },
      {
        path: 'edit',
        name: 'EditType',
        hidden: true,
        component: () => import('@/views/roomType/edit'),
        meta: { title: 'Edit room types' }
      }
    ]
  },
  {
    path: '/roomInfo', component: Container, children: [
      {
        path: '',
        name: 'RoomInfo',
        component: () => import('@/views/roomInfo/index'),
        meta: { title: 'Room information management', icon: 'table' }
      },
      {
        path: 'add',
        name: 'addRoom',
        hidden: true,
        component: () => import('@/views/roomInfo/add'),
        meta: { title: 'Add rooms' }
      },
      {
        path: 'edit',
        name: 'EditRoom',
        hidden: true,
        component: () => import('@/views/roomInfo/edit'),
        meta: { title: 'Edit rooms' }
      }
    ]
  },
  {
    path: '/worker', component: Container, children: [
      {
        path: '',
        name: 'Worker',
        component: () => import('@/views/worker/index')
      },
      {
        path: 'add',
        name: 'AddWorker',
        hidden: true,
        component: () => import('@/views/worker/add')
      },
      {
        path: 'edit',
        name: 'EditWorker',
        hidden: true,
        component: () => import('@/views/worker/edit')
      }
    ]
  },
  {
    path: '/bookingType', component: Container, meta: { title: 'Reservation methods management', icon: 'tree' }, children: [
      {
        path: '',
        name: 'BookingType',
        component: () => import('@/views/bookingType/index'),
        meta: { title: 'Reservation methods management', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'AddBookingType',
        hidden: true,
        component: () => import('@/views/bookingType/add'),
        meta: { title: 'Add reservation methods' }
      },
      {
        path: 'edit',
        name: 'EditBookingType',
        hidden: true,
        component: () => import('@/views/bookingType/edit'),
        meta: { title: 'Edit reservation methods' }
      }
    ]
  },
  {
    path: '/order', component: Container, meta: { title: 'Order management', icon: 'tree' }, children: [
      {
        path: '',
        name: 'Order',
        component: () => import('@/views/order/order'),
        meta: { title: 'Order management', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'AddOrder',
        hidden: true,
        component: () => import('@/views/order/add'),
        meta: { title: 'Add orders' }
      },
      {
        path: 'edit',
        name: 'EditOrder',
        hidden: true,
        component: () => import('@/views/order/edit'),
        meta: { title: 'Edit orders' }
      }
    ]
  },
  {
    path: '/user', component: Container, meta: { title: 'User management', icon: 'tree' }, children: [
      {
        path: '',
        name: 'Guest',
        component: () => import('@/views/guest/index'),
        meta: { title: 'User management', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'AddGuest',
        hidden: true,
        component: () => import('@/views/guest/add'),
        meta: { title: 'Add users' }
      },
      {
        path: 'edit',
        name: 'EditGuest',
        hidden: true,
        component: () => import('@/views/guest/edit'),
        meta: { title: 'Edit users' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router
