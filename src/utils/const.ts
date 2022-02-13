export const NAV_ROUTE = {
  TODO: '/todo',
  SCHEDULE: '/schedule',
  MINE: '/mine',
}

export const PLAN_WEEKLY_TYPE = [
  {
    type: 0,
    description: 'name per unit',
    tips: '不具体到周或天',
  },
  {
    type: 1,
    description: '每周 name per unit',
    tips: '具体到每周',
  },
  {
    type: 2,
    description: '每天 name per unit',
    tips: '具体到每天',
  }
]

export const PLAN_WEEKLY = [
  {
    id: 1,
    name: '周一',
  },
  {
    id: 2,
    name: '周二',
  },
  {
    id: 3,
    name: '周三',
  },
  {
    id: 4,
    name: '周四',
  },
  {
    id: 5,
    name: '周五',
  },
  {
    id: 6,
    name: '周六',
  },
  {
    id: 0,
    name: '周日',
  },
]

export const PLAN_LEVEL = [
  {
    level: 1,
    label: '非常',
  },
  {
    level: 2,
    label: '一般',
  },
  {
    level: 3,
    label: '不太',
  },
]
