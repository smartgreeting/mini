/*
 * @Author: lihuan
 * @Date: 2021-12-26 14:17:50
 * @LastEditors: lihuan
 * @LastEditTime: 2024-08-21 22:01:07
 * @Email: 17719495105@163.com
 */

import { RouteObject, matchRoutes, useNavigate, useRoutes } from 'react-router-dom';
import { useCheckAuth } from '@/utils/hooks/useCheckAuth';
import { IRouteObject, routes } from '@/router';
import BottomTab from './BottomTab';
import CustomNavBar from '@/components/custom-nav-bar';

export interface ICurrentMenu {
  params: Record<string, any>;
  pathname: string;
  pathnameBase: string;

  route?: IRouteObject;
}

const Layout = () => {
  const _matchRoutes = matchRoutes(routes as any, location) || []
  const currentMenu = (_matchRoutes[_matchRoutes?.length - 1] || {}) as ICurrentMenu
  const element = useRoutes(routes as RouteObject[], location);
  const navigation = useNavigate()
  const bool = useCheckAuth(currentMenu.route!)
  if (!bool) {
    navigation('/login')
    return
  }

  return <>
    <CustomNavBar title={currentMenu.route?.title || ''} />
    {
      currentMenu.route?.showTabBar !== false && <BottomTab />
    }

    {element}
  </>;
};

export default Layout;
