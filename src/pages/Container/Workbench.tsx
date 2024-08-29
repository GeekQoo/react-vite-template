import React from "react";
import { Avatar, Card, Space, Statistic, Typography } from "antd";
import { useAuthStore } from "@/store";

const Workbench: React.FC = () => {
    const { userData } = useAuthStore();
    const { Title, Text } = Typography;

    return (
        <div className="workbench-page">
            <Card>
                <div className="flex-y-center">
                    <Avatar size={80} src={userData.avatar} />
                    <div className="ml">
                        <Title className="mt-0!" level={3}>
                            你好，{userData.nickname}，祝你开心每一天！
                        </Title>
                        <Text className="my-0!">{(userData.roleNames ?? []).join(",")}</Text>
                    </div>
                    <Space size="large" className="ml-a">
                        <Statistic title="项目数量" value={1111} />
                        <Statistic title="未读消息" value={2222} />
                        <Statistic title="待办任务" value={3333} />
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default Workbench;
