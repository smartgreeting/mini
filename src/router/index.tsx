/*
 * @Author: lihuan
 * @Date: 2024-07-15 21:59:52
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-05 21:41:48
 * @Email: 17719495105@163.com
 */


import type { RouteObject } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));
const Personal = lazy(() => import('@/pages/personal'));
const ShopCenter = lazy(() => import('@/pages/shop-center'));


type IShouldAuth = ((route:IRouteObject)=> boolean) | boolean | string[] | string
export type IRouteObject = {
  title?: string;
  showTabBar?: boolean;
  isTabBar?: boolean;
  children?: IRouteObject[];
  shouldAuth?: IShouldAuth;
} & Omit<RouteObject,'children'>


const routes: IRouteObject[] = [
  {
    path: 'login',
    element: (
      <Login />
    ),
    title: '登陆页面',
    showTabBar: false,
  },
  {
    path: 'home',
    element: (
      <Home />
    ),
    title: '首页',
    isTabBar:true
  },
  {
    path: 'shopCenter',
    element: (
      <ShopCenter />
    ),
    title: '商品中心',
    isTabBar:true
  },
  {
    path: 'personal',
    element: (
      <Personal />
    ),
    title: '个人中心',
    isTabBar: true,
    shouldAuth: true,
  },

];

export { routes };
