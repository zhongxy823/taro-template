import React from 'react';
import {useDidShow} from '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Demo from '@/components/Demo';
import {getExample} from '@/services/home'
import './index.scss';

const IPage: Taro.FC = () => {
  useDidShow(() => {
    getList()
  })
  const getList = async () => {
    try {
      console.log(111)
      const res = await getExample({foo: '1222'})
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View className="index">
      <Text>Hello world2</Text>
      <Demo />
      <AtButton type="primary">AtButton</AtButton>
    </View>
  );
}

export default IPage
