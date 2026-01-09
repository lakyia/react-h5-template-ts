import { useEffect } from 'react'
import { useUserStore } from '@/stores/user'

// 模拟API函数
const queryIndexConfig = async () => ({
  data: { message: '模拟首页配置' }
})

const queryIndexData = async () => ({
  data: { message: '模拟首页数据' }
})

const Home = () => {
  const { userInfo, isLogin } = useUserStore()

  useEffect(() => {
    console.log('模拟componentDidMount，即只运行一次该函数，获取用户信息，判断是否登录', userInfo)
    //非登录方法，获取首页配置
    queryIndexConfig().then((res: any) => {
      console.log('获取首页配置', res)
    })
    if (isLogin) {
      //已登录查询首页数据
      queryIndexData()
        .then(({ data }: { data: any }) => {
          console.log('首页数据', data)
        })
        .catch(() => {})
    }
  }, [isLogin, userInfo])

  return (
    <>
      <div>Home Page</div>
    </>
  )
}

export default Home
