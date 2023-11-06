import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react'
import {
  createArticleAPI,
  getArticleById,
  updateArticleAPI,
} from '@/api/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  const { channelList } = useChannel()
  const navigate = useNavigate()

  // 提交表单
  const onFinish = (formValue) => {
    if (imageType !== imageList.length)
      return message.warning('图片类型和数量不一致')
    const { title, content, channel_id } = formValue
    const formatUrl = (list) => {
      return list.map((item) => {
        if (item.response) {
          return item.response.data.url
        } else {
          return item.url
        }
      })
    }
    // 收集数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType, //封面模式
        images: formatUrl(imageList), //封面列表
      },
      channel_id,
    }
    try {
      // 发布
      if (articleId) {
        // 编辑
        updateArticleAPI({ ...reqData, id: articleId })
      } else {
        // 新增
        createArticleAPI(reqData)
      }
      message.success('发布成功')
      navigate('/article')
    } catch (error) {message.error('发布失败')}
  }

  // 上传图片
  const cacheImageList = useRef([])
  const [imageList, setImageList] = useState([])
  const onUploadChange = (info) => {
    setImageList(info.fileList)
    cacheImageList.current = info.fileList
  }

  // 控制图片Type
  const [imageType, setImageType] = useState(0)

  const onTypeChange = (e) => {
    const type = e.target.value
    setImageType(type)
    if (type === 1) {
      // 单图，截取第一张展示
      const imgList = cacheImageList.current[0]
        ? [cacheImageList.current[0]]
        : []
      setImageList(imgList)
    } else if (type === 3) {
      // 三图，取所有图片展示
      setImageList(cacheImageList.current)
    }
  }
  // 回填数据
  const articleId = useLocation().search.slice(1)
  const [form] = Form.useForm()
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleById(articleId)
      console.log(222222222, res.data)
      const { cover, ...formValue } = res.data.data
      // 1.设置表单数据
      form.setFieldsValue({ ...formValue, type: cover.type })
      // 2. 回填封面图片
      setImageType(cover.type) // 封面类型
      setImageList(cover.images.map((url) => ({ url }))) // 封面list
    }
    if (articleId) {
      // 拉取数据回显
      getArticleDetail()
    }
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: `${articleId ? '编辑文章' : '发布文章'}` },
            ]}
          >
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange}
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
