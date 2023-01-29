/**
 * 全局字典枚举统一管理
 * @module dict-enum
 */
import { ADD, EDIT, DETAIL } from '@/constants'
/**
 * 用户类型
 * @readonly
 * @enum {number}
 */
export const USER_TYPE = {
  /**  系统用户 */
  SYSTEM: 1,
  /** 企业人员 */
  COMPANY: 2,
  /** 承包商人员 */
  CONSTRACTOR: 3,
  /** 开发者 */
  DEVELOPER: 100
}

/**
 * 模板类型
 * @readonly
 * @enum {number}
 */
export const TEMPLATE_TYPE = {
  /**  新增类型 */
  [ADD]: 1,
  /** 修改类型 */
  [EDIT]: 2,
  /** 详情类型 */
  [DETAIL]: 3
}

/**
 * 场景目录分类
 * @readonly
 * @enum {number}
 */
export const MENU_TYPE = {
  /** 入驻类型 */
  ENTER: 1,
  /** 企业能力 */
  COMPANY: 2,
  /** 企业客户 */
  CUSTOMERS: 3,
  /** 合作单位 */
  PARTNER: 4
}

/**
 * 发布状态
 * @readonly
 * @enum {number}
 */
export const RELEASE_STATUS = {
  /** 待发布 */
  TO_RELEASED: 0,
  /** 招募中 */
  RECRUIT: 1,
  /** 已下架 */
  LOWER_SHELF: 2
}

/**
 * 货架Id
 * @readonly
 * @enum {number}
 */
export const SHOP_SHELVES_ID = {
  /** B端商品货架id */
  TOB: 1,
  /** C端商品货架id */
  TOC: 2
}
/**
 * 咨询类型
 * @readonly
 * @enum {number}
 */
export const ONLINE_TYPE = {
  /** 供需市场-能力咨询 */
  PROFESSION: 2
}

/**
 * 文本模板类型
 * @readonly
 * @enum {number}
 */
export const COLUMN_TYPE = {
  /** 通用文档模板 */
  ADMIN: 1,
  /** 我的文档模板 */
  CUST: 2
}

/**
 * 评价方式
 * @readonly
 * @enum {number}
 */
export const BASIS_OF_EVALUATION = {
  /** 直接打分 */
  DIRECT: 1,
  /** 分档打分 */
  GRADING: 2,
  /** 选项评价 */
  OPTIONS: 3,
  /** 符合性评价 */
  COMPLIANCE: 4,
  /** 打星 */
  STARS: 5
}

/**
 * 评价类型
 * @readonly
 * @enum {number}
 */
export const EVALUATE_TYPE = {
  /** 课程 */
  COURSE: 1,
  /** 老师 */
  TEACHER: 2,
  /** 餐品 */
  MEALS: 3,
  /** 学生 */
  STUDENT: 4,
  /** 企业 */
  ENTERPRISE: 5,
  /** 活动 */
  ACTIVITY: 6
}

export default {
  USER_TYPE,
  TEMPLATE_TYPE,
  MENU_TYPE,
  RELEASE_STATUS,
  ONLINE_TYPE,
  SHOP_SHELVES_ID,
  COLUMN_TYPE,
  BASIS_OF_EVALUATION,
  EVALUATE_TYPE
}
