"use client";
import { Button, Checkbox, Col, DatePicker, Flex, Form, Input, PaginationProps, Radio, Row, Select, Space, Table } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector, useAppStore } from "../lib/hook";
import { getUsers, increment, setUser, deleteRow } from "../lib/features/users/usersSlice";


export default function page() {
  const store = useAppStore()
  const dispatch = useAppDispatch()
  const { users } = useAppSelector((state) => state.user)

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userForm] = Form.useForm()
  // const [userForm, setUserForm] = useState({
  //   title: null,
  //   firstname: null,
  //   lastname: null,
  //   birthday: null,
  //   nationality: null,
  //   citizen_id: null,
  //   gender: null,
  //   mobile_phone: null,
  //   passport_no: null,
  //   expected_salary: null
  // })
  const th_flag = <div>
    <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333">
      <path fill="#FFF" d="M0 85.334h512V426.66H0z" />
      <path fill="#0052B4" d="M0 194.056h512v123.882H0z" /><g fill="#D80027">
        <path d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z" /></g>
    </svg> +66
  </div>
  
  const usa_flag = <div>
    <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342">
      <path fill="#FFF" d="M0 0h513v342H0z" /><g fill="#D80027">
      <path d="M0 0h513v26.3H0zM0 52.6h513v26.3H0zM0 105.2h513v26.3H0zM0 157.8h513v26.3H0zM0 210.5h513v26.3H0zM0 263.1h513v26.3H0zM0 315.7h513V342H0z" /></g>
      <path fill="#2E52B2" d="M0 0h256.5v184.1H0z" /><g fill="#FFF"><path d="m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zM104.1 138.9l-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zM160.6 138.9l-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zM216.8 138.9l-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zM43.8 75.3l-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zM156.3 75.3l-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zM212.8 75.3l-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zM43.8 24.7l-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zM100 24.7l-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zM156.3 24.7l-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zM212.8 24.7l-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z" /></g>
    </svg> +1
  </div>

  const fr_flag = <div>
    <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342">
      <path fill="#FFF" d="M0 0h513v342H0z" />
      <path fill="#0052B4" d="M0 0h171v342H0z" />
      <path fill="#D80027" d="M342 0h171v342H342z" />
    </svg> +33
  </div>


  useEffect(() => {
    // console.log(localStorage.getItem('swd-user'));
    dispatch(getUsers())
  }, [dispatch])

  function handleTEST(): void {
    console.log(
      users[users.length - 1]['id']
    );
  }
  function handleSubmit(value: any): void {
    const id = users.length > 0 ? users[users.length - 1]['id'] + 1 : 0
    value = { ...value, id: id, birthday: value['birthday'].format('YYYY-MM-DD') }
    // console.log({ ...value, birthday: value['birthday'].format('YYYY-MM-DD') });
    // console.log(value);
    dispatch(setUser(value))
  }
  function handleDelete(): void {
    selectedRowKeys.forEach(row_index => {
      console.log(row_index)
      console.log(users[row_index])
      dispatch(deleteRow(users[row_index]))
      setSelectedRowKeys([])
    })
    // dispatch(deleteSelect(users[row_index]))
  }
  function handleEdit(value: any): void {
    // delete users[0]['birthday']
    console.log(value);
    // userForm.setFieldsValue(id)
  }
  function handleDeleteRow(value: any): void {
    console.log('delete row', value);
    // console.log(selectedRowKeys.filter(key => key !== value.key).map(key_f => key_f > value.key ? key_f - 1 : key_f));
    setSelectedRowKeys(selectedRowKeys.filter(key => key !== value.key).map(key_f => key_f > value.key ? key_f - 1 : key_f) as any)
    dispatch(deleteRow(value))

  }
  function handleResetForm() {
    userForm.resetFields()
  }
  function handleSelectTitle(value: any): void {
    try {
      let gender: any = null
      switch (value) {
        case 'Mr.':
          gender = 'Male'
          break;
        case 'Mrs.':
        case 'Ms.':
          gender = 'Female'
          break;
        default:
          break;
      }
      userForm.setFieldsValue({ gender })
    } catch (error) {
      throw new Error("Function not implemented.")
    }
  }

  function handleSelectGender(value: any): void {
    let title: any = null;
    try {
      switch (value) {
        case 'Male':
          title = 'Mr.'
          break;
        default:
          break;
      }
      userForm.setFieldsValue({ title })
    } catch (error) {
      throw new Error("Function not implemented.")
    }
  }

  function handleSelectAll(e: any): void {
    if (e.target.checked) {
      const arr = Array.from({ length: users.length }, (_, i) => i) as any
      setSelectedRowKeys(arr)
    } else {
      setSelectedRowKeys([])
    }
  }

  function handleSelectNationality(value: any): void {
    try {
      let mobile_prefix: any = null
      switch (value) {
        case 'Thai':
          mobile_prefix = '+66'
          break;
        case 'Franch':
          mobile_prefix = '+1'
          break;
        case 'American':
          mobile_prefix = '+33'
          break;
        default:
          break;
      }
      userForm.setFieldsValue({ mobile_prefix })
    } catch (error) {
      throw new Error("Function not implemented.");
    }
  }

  function handleSelectMobilephonePrefix(value: any): void {
    try {
      let nationality: any = null
      switch (value) {
        case '+66':
          nationality = 'Thai'
          break;
        case '+1':
          nationality = 'American'
          break;
        case '+33':
          nationality = 'Franch'
          break;
        default:
          break;
      }
      userForm.setFieldsValue({ nationality })
    } catch (error) {
      throw new Error("Function not implemented.");
    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      // sorter: (a: any, b: any) => a.name.length - b.name.length,
      sorter: (a: any, b: any) => +(a.name > b.name) || -(a.name < b.name),
      // sortDirections: ['descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a: any, b: any) => +(a.gender > b.gender) || -(a.gender < b.gender),
    },
    {
      title: 'Mobile Phone',
      dataIndex: 'mobile',
      sorter: (a: any, b: any) => +(a.mobile > b.mobile) || -(a.mobile < b.mobile),
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      sorter: (a: any, b: any) => +(a.nationality > b.nationality) || -(a.nationality < b.nationality),
    },
    {
      title: 'MANAGE',
      dataIndex: 'manage',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>EDIT</a>
          <a onClick={() => handleDeleteRow(record)}>DELETE</a>
        </Space>

      ),
    },
  ];

  const dataSource = users.map((user: any, i: number) => ({
    ...user,
    name: `${user['firstname']} ${user['lastname']}`,
    mobile: `${user['mobile_prefix']} ${user['mobile_phone']}`,
    key: i
  }));

  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>PREV</a>;
    }
    if (type === 'next') {
      return <a>NEXT</a>;
    }
    return originalElement;
  };
  return (
    <div className="content">
      {/* <pre>
        {JSON.stringify(userForm, null, 4)}
      </pre> */}
      <div style={{ margin: '100px', backgroundColor: 'yellow' }}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          // {...layout}
          form={userForm}
          // name="control-hooks"
          onFinish={handleSubmit}
          style={{ maxWidth: 600 }}
        >
          {/* <Form.Item name="firstname" label="Firstname" rules={[{ required: true }]}>
            <Row gutter={2}>
              <Col span={12}>
                    <Input />
              </Col>
              <Col span={12}>
                    <Input />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item layout="horizontal" name="firstname" label="Firstname" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Select
              onChange={handleSelectTitle}
              placeholder="Title"
              // onChange={onGenderChange}
              allowClear
              options={[
                { value: 'Mr.', label: 'Mr.' },
                { value: 'Mrs.', label: 'Mrs.' },
                { value: 'Ms.', label: 'Ms.' },
              ]}
            >
            </Select>
          </Form.Item>
          <Form.Item name="firstname" label="Firstname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Lastname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="birthday" label="Birthday" rules={[{ required: true, message: 'Please input!' }]}>
            <DatePicker allowClear format={'YYYY-MM-DD'} placeholder="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="nationality" label="Nationality" rules={[{ required: true }]}>
            <Select
              onChange={handleSelectNationality}
              placeholder="-- Please Select --"
              allowClear
              options={[
                { value: 'Thai', label: 'Thai' },
                { value: 'Franch', label: 'Franch' },
                { value: 'American', label: 'American' },
              ]}
            >
            </Select>
          </Form.Item>
          <Form.Item name="citizen_id" label="CitizenID" hasFeedback validateStatus="success">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Radio.Group onChange={(e) => handleSelectGender(e.target.value)}>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Unsex">Unsex</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Mobile Phone" name="mobile_phone" rules={[{ required: true, message: 'Please input your phone number!' }]} >
            <Input addonBefore={
              <Form.Item name="mobile_prefix" noStyle>
                <Select
                  onChange={handleSelectMobilephonePrefix}
                  style={{ width: '100px' }}
                  allowClear
                  options={[
                    { value: '+66', label: th_flag },
                    { value: '+1', label: usa_flag },
                    { value: '+33', label: fr_flag },
                  ]}
                >
                </Select>
              </Form.Item>} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="passport_no" label="Passport No">
            <Input />
          </Form.Item>
          <Form.Item name="expected_salary" label="Expected Salary" rules={[{ required: true, }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                SUBMIT
              </Button>
              <Button htmlType="button" onClick={handleResetForm}>
                RESET
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Flex gap={users.length > 0 ? 0 : 'middle'} vertical>
          <Flex gap={'middle'} align="center">
            <div>
              <Checkbox disabled={users.length === 0} checked={users.length > 0 && users.length === selectedRowKeys.length} onChange={handleSelectAll}>Select All</Checkbox>
            </div>
            <div>
              <Button onClick={handleDelete} disabled={selectedRowKeys.length === 0} type="primary" danger size={'middle'}>
                DELETE
              </Button>
            </div>
          </Flex>
          <Table pagination={{ position: ['topRight'], itemRender: itemRender }} rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
        </Flex>
      </div>
      {/* <pre>
        {JSON.stringify(users, null, 4)}
      </pre>
      <button onClick={() => handleTEST()}>TEST</button> */}
    </div >
  )
}
