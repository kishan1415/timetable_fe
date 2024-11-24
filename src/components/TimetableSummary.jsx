import { Card, Divider, Flex, Skeleton, Table, Tag, Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";

function TimeTableTimeCell(row) {
  if (!row) {
    return <span>--Break--</span>;
  }

  if (row.Initials === "LNCH") {
    return <span>--Lunch Break--</span>;
  }
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <li>
        <Tooltip title="Subject Name">{row.SubName}</Tooltip>
      </li>
      <li>
        <Tooltip title="Subject Code">{row.SubjectCode}</Tooltip>
      </li>
      <li>
        <strong>
          <Tooltip title="Teacher Initials">{row.Initials}</Tooltip>
        </strong>
      </li>
    </ul>
  );
}

function TimetableSummary() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const actualData = useMemo(() => {
    if (!isLoading && data.length) {
      const uniqueTimeRange = Array.from(
        new Set(data.map((x) => x.DateOrTime))
      );
      const uniqueDays = Array.from(new Set(data.map((x) => x.Day)));

      const finalData = uniqueDays.map((day) => {
        const dt = uniqueTimeRange.reduce((prev, time) => {
          const dayRow = data.find(
            (x) => x.DateOrTime === time && x.Day === day
          );
          return {
            ...prev,
            Day: day,
            [time]: dayRow,
          };
        }, []);
        return dt;
      });

      const dynamicColumns = [
        {
          title: "Time/Day",
          dataIndex: "Day",
          key: "DateOrTime",
        },
        ...uniqueTimeRange.map((timeRange) => ({
          title: timeRange,
          dataIndex: timeRange,
          key: timeRange,
          render: TimeTableTimeCell,
          align: "center",
        })),
      ];

      return { dynamicColumns, data: finalData };
    }

    return { dynamicColumns: [], data: [] };
  }, [isLoading]);

  if (actualData.dynamicColumns.length == 0 || actualData.data.length == 0) {
    return <Skeleton />;
  }

  return (
    <Card title=" Timetable" align="center">
      <Flex gap="40px 40px" wrap justify="space-between">
        <Tag bordered={true} color="gold" size="large">
          Course: <b>MCA</b>
        </Tag>
        <Tag bordered={true} color="gold" size="large">
          Semester: <b>4</b>
        </Tag>
        <Tag bordered={true} color="gold" size="large">
          Branch: <b>MCA</b>
        </Tag>
        <Tag bordered={true} color="gold" size="large">
          Room Number: <b>A-210</b>
        </Tag>
      </Flex>
      <Divider />
      <Table
        dataSource={actualData.data}
        columns={actualData.dynamicColumns}
        isLoading={isLoading}
        size="large"
        pagination={false}
      />
    </Card>
  );
}

export default TimetableSummary;
