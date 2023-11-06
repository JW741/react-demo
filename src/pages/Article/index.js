import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Popconfirm,
  message,
} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/logo.jpg'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { deleteArticleAPI,  getArticleListAPI } from '@/api/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  // 获取频道数据
  const { channelList } = useChannel()
  // 审核状态
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
  }
  // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return (
          <img
            src={cover.images[0] || img404}
            width={80}
            height={60}
            alt="小姜知道"
          />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      // data-->文章状态（1待审核，2审核通过）
      render: (data) => status[data],
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?${data.id}`)}
            />
            <Popconfirm
              title="删除文章"
              description="确认删除当前文章?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  // 筛选参数
  const [search, setSearch] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 5,
  })
  // 获取文章列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const getList = async () => {
      const res = await getArticleListAPI(search)
      setList(res.data.data.results)
      setCount(res.data.data.total_count)
    }
    getList()
  }, [search])
  // 筛选功能
  const onFinish = (formValue) => {
    setSearch({
      ...search,
      channel_id: formValue.channel_id,
      status: formValue.status,
      begin_pubdate: formValue[0].format('YYYY-MM-DD'),
      end_pubdate: formValue[1].format('YYYY-MM-DD'),
    })
  }
  // 分页
  const onPageChange = (page) => {
    setSearch({
      ...search,
      page,
    })
  }
  // 删除文章
  const onConfirm = async (data) => {
    await deleteArticleAPI(data.id)
    setSearch({
      ...search,
    })
    message.success('删除成功')
  }
  

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '文章列表' },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channelList?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pagesize: search.per_page,
            onChange: onPageChange,
            showLessItems:true,
            hideOnSinglePage:true
          }}
        />
      </Card>
    </div>
  )
}

export default Article
