// TODO: 此目录是计划表方式完成任务的，比较复杂
export const WEEKLY = [
  {
    id: 1,
    name: '周一',
    selected: true,
  },
  {
    id: 2,
    name: '周二',
    selected: false,
  },
  {
    id: 3,
    name: '周三',
    selected: true,
  },
  {
    id: 4,
    name: '周四',
    selected: false,
  },
  {
    id: 5,
    name: '周五',
    selected: true,
  },
  {
    id: 6,
    name: '周六',
    selected: false,
  },
  {
    id: 0,
    name: '周日',
    selected: false,
  },
]

export const LEVEL = [
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

export const WEEKLY_TYPE = [
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
    type: 3,
    description: '每天 name per unit',
    tips: '具体到每天',
  }
]
