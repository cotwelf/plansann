import Mock from 'mockjs'

export const getPlanData = Mock.mock('/plans', 'get', {
  success: true,
  message: '@cparagraph',
  'list|1-5': [{
    'sid| +1': 1,
    'userId | 5': '',
  }]
})
