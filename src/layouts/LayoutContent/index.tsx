import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Layout, Space, Spin, Tag } from "antd";
import { useNavigationStore, useThemeStore } from "@/store";
import { findRoute, routes } from "@/router";

const { Content } = Layout;

const LayoutContent: React.FC = () => {
    const { navigations, setNavigations } = useNavigationStore();
    const { pageAnimation, themeColor } = useThemeStore();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // 存储导航
    useEffect(() => {
        const route = findRoute(routes, pathname);
        if (route && route.path !== "/") {
            const isMatch = navigations.some(
                (i) => i.path === route.path && JSON.stringify(i.params) === JSON.stringify(route.params)
            );
            if (!isMatch) {
                setNavigations([...navigations, route]);
            }
        }
    }, [pathname]);

    return (
        <Content>
            <div className="wh-100% p-4 overflow-y-auto overflow-x-hidden">
                <Space size="small" className="mb">
                    {navigations.map((item, index) => (
                        <Tag
                            className="py-1 px-2 cursor-pointer select-none"
                            color={pathname === item.fullPath ? themeColor : "default"}
                            closable={item.fullPath !== pathname}
                            key={item.fullPath}
                            onClick={() => navigate(item.fullPath ?? "/")}
                            onClose={() => {
                                setNavigations(navigations.filter((i) => i.fullPath !== item.fullPath));
                            }}
                        >
                            {item.title}
                            {item.params && Object.keys(item.params).length > 0 && (
                                <>
                                    {"丨"}
                                    {Object.values(item.params)}
                                </>
                            )}
                        </Tag>
                    ))}
                </Space>
                <Suspense fallback={<Spin size="large" className="wh-100% flex-center" />}>
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            timeout={300}
                            classNames={pageAnimation}
                            key={pathname}
                            appear
                            mountOnEnter
                            unmountOnExit
                            exit={false}
                        >
                            <Outlet />
                        </CSSTransition>
                    </SwitchTransition>
                </Suspense>
            </div>
        </Content>
    );
};

export default LayoutContent;
