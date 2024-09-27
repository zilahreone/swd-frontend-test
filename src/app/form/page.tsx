"use client";
import { Button, Checkbox, DatePicker, Flex, Form, Input, PaginationProps, Radio, Select, Space, Table } from "antd";
import { useEffect, useState } from "react"
import { UseAppDispatch, UseAppSelector } from "../lib/hook";
import { getUsers, setUser, deleteRow, setEditIndex, setEditUser } from "../lib/features/users/usersSlice";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useTranslation } from "react-i18next";

export default function page() {
  // const store = useAppStore()
  const dispatch = UseAppDispatch()
  const { users, edit_index } = UseAppSelector((state) => state.user)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [userForm] = Form.useForm()
  const { t } = useTranslation('ns1')
  const dateFormat = 'YYYY-MM-DD'
  dayjs.extend(customParseFormat)

  const th_flag = <div>
    <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333">
      <path fill="#FFF" d="M0 85.334h512V426.66H0z" />
      <path fill="#0052B4" d="M0 194.056h512v123.882H0z" /><g fill="#D80027">
        <path d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z" /></g>
    </svg>
  </div>

  const usa_flag = <div>
    <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342">
      <path fill="#FFF" d="M0 0h513v342H0z" /><g fill="#D80027">
        <path d="M0 0h513v26.3H0zM0 52.6h513v26.3H0zM0 105.2h513v26.3H0zM0 157.8h513v26.3H0zM0 210.5h513v26.3H0zM0 263.1h513v26.3H0zM0 315.7h513V342H0z" /></g>
      <path fill="#2E52B2" d="M0 0h256.5v184.1H0z" /><g fill="#FFF"><path d="m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zM104.1 138.9l-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zM160.6 138.9l-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zM216.8 138.9l-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zM43.8 75.3l-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zM156.3 75.3l-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zM212.8 75.3l-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zM43.8 24.7l-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zM100 24.7l-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zM156.3 24.7l-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zM212.8 24.7l-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z" /></g>
    </svg>
  </div>

  const fr_flag = <div>
    <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342">
      <path fill="#FFF" d="M0 0h513v342H0z" />
      <path fill="#0052B4" d="M0 0h171v342H0z" />
      <path fill="#D80027" d="M342 0h171v342H342z" />
    </svg>
  </div>


  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  function handleResetForm() {
    userForm.resetFields()
    dispatch(setEditIndex(-1))
  }

  function handleSubmit(value: any): void {
    // console.log(edit_index);
    // console.log(value);
    value = { ...value, birthday: value['birthday'].format(dateFormat) }
    if (edit_index > -1) {
      // console.log(users.findIndex((user: any) => user.id === edit_index));
      const id = users[users.findIndex((user: any) => user.id === edit_index)]['id']
      value = { ...value, id: id }
      dispatch(setEditUser(value))
      alert(t('test2.label.edit_success'))
    } else {
      const id = users.length > 0 ? users[users.length - 1]['id'] + 1 : 0
      value = { ...value, id: id }
      dispatch(setUser(value))
      alert(t('test2.label.save_success'))
    }
    handleResetForm()
  }

  function handleEdit(value: any): void {
    // delete users[0]['birthday']
    dispatch(setEditIndex(value.id))
    // value = users[value.id]
    // console.log(value);
    userForm.setFieldsValue({ ...value, birthday: dayjs(value.birthday) })
  }

  function handleDeleteRow(value: any): void {
    // console.log('delete row', value);
    // console.log(selectedRowKeys.filter(key => key !== value.key).map(key_f => key_f > value.key ? key_f - 1 : key_f));
    setSelectedRowKeys(selectedRowKeys.filter(key => key !== value.key).map(key_f => key_f > value.key ? key_f - 1 : key_f) as any)
    dispatch(deleteRow(value))
  }

  function handleSelectAll(e: any): void {
    if (e.target.checked) {
      const arr = Array.from({ length: users.length }, (_, i) => i) as any
      setSelectedRowKeys(arr)
    } else {
      setSelectedRowKeys([])
    }
  }

  function handleDelete(): void {
    selectedRowKeys.forEach(row_index => {
      // console.log(row_index)
      // console.log(users[row_index])
      dispatch(deleteRow(users[row_index]))
      setSelectedRowKeys([])
    })
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
      edit_index < 0 && userForm.setFieldsValue({ gender })
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
      edit_index < 0 && userForm.setFieldsValue({ title })
    } catch (error) {
      throw new Error("Function not implemented.")
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
      edit_index < 0 && userForm.setFieldsValue({ mobile_prefix })
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
      edit_index < 0 && userForm.setFieldsValue({ nationality })
    } catch (error) {
      throw new Error("Function not implemented.");
    }
  }

  const columns = [
    {
      title: t('test2.table.column.name'),
      dataIndex: 'name',
      // sorter: (a: any, b: any) => a.name.length - b.name.length,
      sorter: (a: any, b: any) => +(a.name > b.name) || -(a.name < b.name),
      // sortDirections: ['descend'],
    },
    {
      title: t('test2.form_label.gender'),
      dataIndex: 'gender_view',
      sorter: (a: any, b: any) => +(a.gender > b.gender) || -(a.gender < b.gender),
    },
    {
      title: t('test2.form_label.mobile_phone'),
      dataIndex: 'mobile',
      sorter: (a: any, b: any) => +(a.mobile > b.mobile) || -(a.mobile < b.mobile),
    },
    {
      title: t('test2.form_label.nationality'),
      dataIndex: 'nationality_view',
      sorter: (a: any, b: any) => +(a.nationality > b.nationality) || -(a.nationality < b.nationality),
    },
    {
      title: t('test2.table.column.manage'),
      dataIndex: 'manage',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>{t('test2.button.edit')}</a>
          <a onClick={() => handleDeleteRow(record)}>{t('test2.button.delete')}</a>
        </Space>

      ),
    },
  ];

  const dataSource = users.map((user: any, i: number) => ({
    ...user,
    name: `${user['firstname']} ${user['lastname']}`,
    gender_view: t(`test2.form_label.${user['gender'].toLowerCase()}`),
    mobile: `${user['mobile_prefix']} ${user['mobile_phone']}`,
    nationality_view: t(`test2.form_label.${user['nationality'].toLowerCase()}`),
    key: i
  }));

  const onSelectChange = (newSelectedRowKeys: any) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>{t('test2.button.prev')}</a>;
    }
    if (type === 'next') {
      return <a>{t('test2.button.next')}</a>;
    }
    return originalElement;
  };
  return (
    <div>
      <h1>{t('home.test2.description')}</h1>
      <div className="content">
        <div className="border">
          <Form
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            form={userForm}
            onFinish={handleSubmit}
          // style={{ maxWidth: 600 }}
          >
            <Form.Item name="title" label={t('test2.form_label.title')} rules={[{ required: true }]}>
              <Select
                onChange={handleSelectTitle}
                placeholder={t('test2.form_label.title')}
                options={[
                  { value: 'Mr.', label: `${t('test2.form_label.mr')}.` },
                  { value: 'Mrs.', label: `${t('test2.form_label.mrs')}.` },
                  { value: 'Ms.', label: `${t('test2.form_label.ms')}.` },
                ]}
              >
              </Select>
            </Form.Item>
            <Form.Item name="firstname" label={t('test2.form_label.firstname')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="lastname" label={t('test2.form_label.lastname')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            {/* getValueProps={(i) => ({ value: dayjs(i) })} */}
            <Form.Item name="birthday" label={t('test2.form_label.birthday')} rules={[{ required: true }]}>
              <DatePicker
                // picker="date"
                // minDate={dayjs('2019-08-01', dateFormat)}
                maxDate={dayjs('2023-12-31', dateFormat)}
                format={dateFormat}
                placeholder={`${t('test2.form_label.year')}-${t('test2.form_label.month')}-${t('test2.form_label.day')}`}
              />
            </Form.Item>
            <Form.Item name="nationality" label={t('test2.form_label.nationality')} rules={[{ required: true }]}>
              <Select
                onChange={handleSelectNationality}
                placeholder={`-- ${t('test2.form_label.please_select')} --`}
                options={[
                  { value: 'Thai', label: <Flex gap={'small'}>{th_flag} {t('test2.form_label.thai')}</Flex> },
                  { value: 'Franch', label: <Flex gap={'small'}>{fr_flag} {t('test2.form_label.franch')}</Flex> },
                  { value: 'American', label: <Flex gap={'small'}>{usa_flag} {t('test2.form_label.american')}</Flex> },
                ]}
              >
              </Select>
            </Form.Item>
            <Form.Item name="citizen_id" label={t('test2.form_label.citizen_id')} >
              <Input />
            </Form.Item>
            <Form.Item name="gender" label={t('test2.form_label.gender')} rules={[{ required: true }]}>
              <Radio.Group onChange={(e) => handleSelectGender(e.target.value)}>
                <Radio value="Male">{t('test2.form_label.male')}</Radio>
                <Radio value="Female">{t('test2.form_label.female')}</Radio>
                <Radio value="Unsex">{t('test2.form_label.unsex')}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="mobile_phone" label={t('test2.form_label.mobile_phone')} rules={[{ required: true, message: 'Please input your phone number!', pattern: new RegExp(/^[0-9]*$/) }]} >
              <Input addonBefore={
                <Form.Item name="mobile_prefix" noStyle>
                  <Select
                    onChange={handleSelectMobilephonePrefix}
                    style={{ width: '100px', backgroundColor: 'white', borderRadius: '5px' }}
                    options={[
                      { value: '+66', label: <Flex gap={'small'}>{th_flag} +66</Flex> },
                      { value: '+1', label: <Flex gap={'small'}>{usa_flag} +1</Flex> },
                      { value: '+33', label: <Flex gap={'small'}>{fr_flag} +33</Flex> },
                    ]}
                  >
                  </Select>
                </Form.Item>} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="passport_no" label={t('test2.form_label.passport_no')}>
              <Input />
            </Form.Item>
            <Form.Item name="expected_salary" label={t('test2.form_label.expected_salary')} rules={[{ required: true, message: 'Please input your positive number!', pattern: new RegExp(/^[+]?\d+([.]\d+)?$/) }]}>
              <Input />
            </Form.Item>
            <Flex gap={'middle'} justify="center">
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {t('test2.button.submit')}
                  </Button>
                  <Button type="primary" danger htmlType="button" onClick={handleResetForm}>
                    {t('test2.button.reset')}
                  </Button>
                </Space>
              </Form.Item>
            </Flex>
          </Form>
        </div>
        <br />
        <div>
          <Flex gap={users.length > 0 ? 0 : 'middle'} vertical>
            <Flex gap={'middle'} align="center">
              <div>
                <Checkbox disabled={users.length === 0} checked={users.length > 0 && users.length === selectedRowKeys.length} onChange={handleSelectAll}>{t('test2.label.select_all')}</Checkbox>
              </div>
              <div>
                <Button onClick={handleDelete} disabled={selectedRowKeys.length === 0} type="primary" danger size={'middle'}>
                  {t('test2.button.delete')}
                </Button>
              </div>
            </Flex>
            <Table pagination={{ position: ['topRight'], itemRender: itemRender }} rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
          </Flex>
        </div>
        {/* <div>
          {edit_index}
          <pre>
            {JSON.stringify(users, null, 4)}
          </pre>
        </div> */}
      </div >
    </div>
  )
}
