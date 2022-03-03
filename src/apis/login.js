import request from '@/plugins/axios/request'
import axios from 'axios'
// export function login (data) {
//   return request({
//     url: '/gateway/user/companyManager/login',
//     method: 'post',
//     params: null,
//     data: data
//   })
// }
/**
@description 登录
*/
export function login (data) {
  return request({
    url: '/api/login',
    method: 'post',
    params: null,
    data: data
  })
}

// 刷新token
export function refreshToken (data) {
  return axios({
    url: '/api/refreshToken',
    method: 'post',
    data
  })
}
/**
@description 前端退出
*/
export function logout (data) {
  return request({
    url: '/api/logout',
    method: 'post',
    params: null,
    data: data
  })
}

// 用户信息
export function getUserInfo (data) {
  return request({
    url: '/api/userInfo',
    method: 'post',
    data
  })
}

// 用户信息
export function getTest () {
  return request({
    url: '/api/test',
    method: 'get'
  })
}

// 用户权限列表
/**
@params id 用户id获取 权限列表 隐藏code
*/
export function getPermission () {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 隐藏code
      const permissionHiddenList = []
      resolve(permissionHiddenList)
    }, 200)
  })
}
