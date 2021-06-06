import { get } from '@/utils/request';

// 获取亲人列表
export const getExample = data => get('/example/get', data);
