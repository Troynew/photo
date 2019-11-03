import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';
import Authorized from '@/utils/Authorized';
import routerConfig from '@/../config/router.config';

const { check } = Authorized;
const defaultRoutes = routerConfig.find(route => route.path === '/').routes;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        name: formatMessage({ id: locale, defaultMessage: item.name }),
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => {
      // make dom
      const ItemDom = getSubMenu(item);
      const data = check(item.authority, ItemDom);
      return ItemDom;
    })
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
  namespace: 'menu',

  state: {
    menuDataAll: memoizeOneFormatter(defaultRoutes),
    menuData: memoizeOneFormatter(defaultRoutes),
    breadcrumbNameMap: {},
  },

  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes, authority } = payload;
      const menuDataAll = memoizeOneFormatter(routes, authority);
      const menuData = filterMenuData(menuDataAll);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuDataAll);
      yield put({
        type: 'save',
        payload: { menuDataAll, menuData, breadcrumbNameMap },
      });
    },
    *authMenuData(_, { put, select }) {
      const menuDataAll = yield select(({ menu }) => menu.menuDataAll);
      const menuData = filterMenuData(menuDataAll);
      yield put({
        type: 'updateMenuData',
        payload: menuData,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateMenuData(state, { payload }) {
      return { ...state, menuData: payload };
    },
  },
};
