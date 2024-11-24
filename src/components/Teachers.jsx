import React, { useState, useEffect } from "react";
import {
  Button,
  Collapse,
  Form,
  Input,
  Select,
  Space,
  Table,
  message,
} from "antd";

const { Panel } = Collapse;

const onFinish = async (values) => {
  console.log("Success:", values);

  try {
    const response = await fetch("http://localhost:3001/teacher-entry", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    });

    message.success("Success!!", 15);

    window.location.reload();

    const dt = await response.json();
  } catch (error) {
    console.log(error);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Teachers = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const response = await fetch("http://localhost:3001/userroles");
      const dt = await response.json();
      setRoles(dt);
    };

    fn();
  }, []);

  return (
    <Collapse defaultActiveKey={["1", "2"]} collapsible="icon">
      <Panel header="Entry" key="1">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Initials"
            name="initials"
            rules={[
              {
                required: true,
                message: "Please input code!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="User Name"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input user name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="roleId"
            rules={[
              {
                required: true,
                message: "Please select role!",
              },
            ]}
          >
            <Select
              placeholder="Select  user role"
              allowClear
              options={roles}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Panel>
      <Panel header="Summary" key="2">
        <Summary />
      </Panel>
    </Collapse>
  );
};

function Summary() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: "Initials",
      dataIndex: "initials",
      key: "initials",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const handleDelete = async (e) => {
          e.preventDefault();

          try {
            setIsLoading(true);

            const response = await fetch(
              `http://localhost:3001/teacher/${record.id}`,
              {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );

            setIsLoading(false);

            message.success("Removed!!", 15);
            getTimeTableData();
            const dt = await response.json();
          } catch (error) {
            setIsLoading(false);

            console.log(error);
          }
        };

        return (
          <Space size="middle">
            <a onClick={handleDelete}>Delete</a>
          </Space>
        );
      },
    },
  ];

  const getTimeTableData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/teacher-list");
      const dt = await response.json();
      setData(dt);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTimeTableData();
  }, []);

  return (
    <Table columns={columns} dataSource={data} isLoading={isLoading}></Table>
  );
}

export default Teachers;