import React from "react";
import { Avatar, Card, Space, Statistic, Typography } from "antd";
import { useAuthStore } from "@/store";

let Home: React.FC = () => {
    let { userData } = useAuthStore();
    let { Title, Text } = Typography;

    return (
        <div className="home-page">
            <Card>
                <div className="flex-y-center">
                    <Avatar size={80}>{userData.username}</Avatar>
                    <div className="ml">
                        <Title className="mt-0!" level={3}>
                            你好，{userData.username}，祝你开心每一天！
                        </Title>
                        <Text className="my-0!">技术部 | 前端开发工程师</Text>
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

export default Home;
