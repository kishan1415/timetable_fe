import React from "react";
import { Layout, Menu, theme } from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const Root = () => {
  const { pathname } = useLocation();

  console.log(pathname);
  const nav = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (rest) => {
    console.log(rest, rest.keyPath.join(""));
    nav(rest.keyPath.join("/"));
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "lightgray",
            fontSize: "30px",
            gap: "10px",
            paddingRight: "50px",
            alignItems: "center",
          }}
        >
          <ScheduleOutlined style={{ fontSize: "40px" }} />
          Timetable
        </div>
        <Menu
          onClick={handleMenuClick}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname.replace("/", "")]}
          items={[
            {
              key: "/",
              label: `Home`,
            },
            {
              key: "timetable-entry",
              label: `Timetable Entry`,
            },
            {
              key: "subjects",
              label: "Subjects",
            },
            {
              key: "rooms",
              label: "Rooms",
            },
            {
              key: "teacher",
              label: "Teachers",
            },
            {
              key: "course",
              label: "Courses",
            },
            {
              key: "semester",
              label: "Semesters",
            },
          ]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <div style={{ color: "lightblue", fontSize: "20px" }}>
          Galgotia College of Engineering and Technology
        </div>
      </Header>
      <Content
        style={{
          padding: "16px 48px",
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Timetable Management Project ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
export default Root;
