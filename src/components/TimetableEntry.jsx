import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Select,
  Space,
  Table,
  message,
} from "antd";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;
const { Panel } = Collapse;

const onFinish = async (values) => {
  console.log("Success:", values);

  const startDateTime = dayjs(values.startDateTime).format("YYYY/MM/DD HH:mm");
  const endDateTime = dayjs(values.endDateTime).format("YYYY/MM/DD HH:mm");

  try {
    const response = await fetch("http://localhost:3001/timetable-entry", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        startDateTime,
        endDateTime,
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

const TimetableEntry = () => {
  const [form] = useForm();

  const [rooms, setRooms] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [course, setCourse] = useState();

  useEffect(() => {
    const fn = async () => {
      const response = await fetch("http://localhost:3001/course");
      const dt = await response.json();
      setCourses(dt);
    };

    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      const response = await fetch("http://localhost:3001/rooms");
      const dt = await response.json();
      setRooms(dt);
    };

    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      const response = await fetch("http://localhost:3001/section");
      const dt = await response.json();
      setSections(dt);
    };

    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      const response = await fetch(
        `http://localhost:3001/semester-by-course/${course}`
      );
      const dt = await response.json();
      setSemesters(dt);
    };

    fn();
  }, [course]);

  useEffect(() => {
    const fn = async () => {
      const response = await fetch("http://localhost:3001/users");
      const dt = await response.json();
      setUsers(dt);
    };

    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      const response = await fetch("http://localhost:3001/subjects");
      const dt = await response.json();
      setSubjects(dt);
    };

    fn();
  }, []);

  console.log(course);

  return (
    <Collapse defaultActiveKey={["1", "2"]} collapsible="icon">
      <Panel header="Entry" key="1">
        <Form
          name="basic"
          form={form}
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
            day: "Mon",
            startDateTime: dayjs(),
            endDateTime: dayjs().add(1, "h"),
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Course"
            name="course"
            rules={[
              {
                required: true,
                message: "Please select course!",
              },
            ]}
          >
            <Select
              placeholder="Select Course"
              allowClear
              options={courses}
              onChange={(value) => {
                setCourse(value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Semester"
            name="semester"
            rules={[
              {
                required: true,
                message: "Please select Semester!",
              },
            ]}
          >
            <Select
              placeholder="Select Semester"
              allowClear
              options={semesters}
            />
          </Form.Item>

          <Form.Item
            label="Section"
            name="section"
            rules={[
              {
                required: true,
                message: "Please select Section!",
              },
            ]}
          >
            <Select
              placeholder="Select Section"
              allowClear
              options={sections}
            />
          </Form.Item>

          <Form.Item
            label="Day"
            name="day"
            rules={[
              {
                required: true,
                message: "Please select day!",
              },
            ]}
          >
            <Select placeholder="Select Day" allowClear>
              <Option value="Mon">Mon</Option>
              <Option value="Tue">Tue</Option>
              <Option value="Wed">Wed</Option>
              <Option value="Thu">Thu</Option>
              <Option value="Fir">Fir</Option>
              <Option value="Sat">Sat</Option>
              <Option value="Sun">Sun</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Subjects"
            name="subjects"
            rules={[
              {
                required: true,
                message: "Please select Semester!",
              },
            ]}
          >
            <Select
              placeholder="Select Subject"
              allowClear
              options={subjects}
            />
          </Form.Item>

          <Form.Item
            label="Room"
            name="room"
            placeholder="Select Room"
            rules={[
              {
                required: true,
                message: "Please select room!",
              },
            ]}
          >
            <Select placeholder="Select Room" allowClear options={rooms} />
          </Form.Item>

          <Form.Item
            label="Teacher"
            name="teacher"
            placeholder="Select teacher"
            rules={[
              {
                required: true,
                message: "Please select Teacher!",
              },
            ]}
          >
            <Select placeholder="Select a Teacher" allowClear options={users} />
          </Form.Item>

          <Form.Item
            label="Start Date Time"
            name="startDateTime"
            rules={[
              {
                required: true,
                message: "Please select Start Date Time!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              showTime={{
                format: "hh:mm",
              }}
              format="DD/MM/YYYY HH:mm"
            />
          </Form.Item>

          <Form.Item
            label="End Date Time"
            name="endDateTime"
            rules={[
              {
                required: true,
                message: "Please select End Date Time!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              showTime={{
                format: "hh:mm",
              }}
              format="DD/MM/YYYY HH:mm"
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
      title: "Subject Code",
      dataIndex: "SubjectCode",
      key: "SubjectCode",
    },
    {
      title: "Subject Name",
      dataIndex: "SubName",
      key: "subName",
    },
    {
      title: "Day",
      dataIndex: "Day",
      key: "day",
    },
    {
      title: "DateOrTime",
      dataIndex: "DateOrTime",
      key: "DateOrTime",
    },
    {
      title: "Initials",
      dataIndex: "Initials",
      key: "Initials",
    },
    {
      title: "Teacher Name",
      dataIndex: "TeacherName",
      key: "TeacherName",
    },
    {
      title: "Room Number",
      dataIndex: "RoomNumber",
      key: "RoomNumber",
    },
    {
      title: "Section Code",
      dataIndex: "SectionCode",
      key: "SectionCode",
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
              `http://localhost:3001/timetable/${record.id}`,
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
      const response = await fetch("http://localhost:3001/timetable");
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

export default TimetableEntry;
