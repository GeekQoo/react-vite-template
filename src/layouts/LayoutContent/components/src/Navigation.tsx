import React, { useEffect, useRef, useState } from "react";
import { App, Button, Space, Tag, Tour, TourProps } from "antd";
import { useNavigationStore, useThemeStore } from "@/store";
import { useLocation, useNavigate } from "react-router-dom";
import { findRoute, routes } from "@/router";
import { DynamicIcon } from "@/components/Dynamic";

const LayoutContentNavigation: React.FC = () => {
    const { modal } = App.useApp();
    const { navigations, setNavigations } = useNavigationStore();
    const { themeColor } = useThemeStore();
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

    // 滚动功能
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const selectedTagRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const handleWheel = (event: WheelEvent) => {
                if (event.deltaY !== 0) {
                    scrollContainer.scrollLeft += event.deltaY * 0.5;
                    event.preventDefault();
                }
            };
            scrollContainer.addEventListener("wheel", handleWheel);
            return () => scrollContainer.removeEventListener("wheel", handleWheel);
        }
    }, []);

    useEffect(() => {
        if (selectedTagRef.current) {
            selectedTagRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }, [pathname, navigations.length]);

    // 删除全部导航
    const deleteButtonRef = useRef<HTMLButtonElement>(null);

    const onDeleteAll = () => {
        modal.confirm({
            title: "提示",
            content: "确认删除全部导航吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                setNavigations(navigations.filter((i) => i.fullPath === pathname));
            }
        });
    };

    // 漫游引导功能
    const [openSteps, setOpenSteps] = useState<boolean>(false);

    const steps: TourProps["steps"] = [
        {
            title: "导航列表",
            description: "如果导航列表过多，可以通过滚动鼠标滚轮来查看",
            target: () => scrollContainerRef.current as HTMLElement
        },
        {
            title: "删除按钮",
            description: "点击删除按钮可以删除除当前页面之外的所有导航",
            target: () => deleteButtonRef.current as HTMLButtonElement
        }
    ];

    return (
        <div className="flex-y-center mb">
            <div className="overflow-x-hidden flex-1" ref={scrollContainerRef}>
                <Space size="small">
                    {navigations.map((item) => (
                        <Tag
                            className="py-1 px-2 cursor-pointer select-none"
                            color={pathname === item.fullPath ? themeColor : "default"}
                            closable={item.fullPath !== pathname}
                            key={item.fullPath}
                            onClick={() => navigate(item.fullPath ?? "/")}
                            onClose={() => {
                                setNavigations(navigations.filter((i) => i.fullPath !== item.fullPath));
                            }}
                            ref={pathname === item.fullPath ? selectedTagRef : null}
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
            </div>
            <Space className="ml-2">
                <Button onClick={() => setOpenSteps(true)}>
                    <DynamicIcon icon="QuestionCircleOutlined" />
                </Button>
                <Button danger ref={deleteButtonRef} onClick={() => onDeleteAll()}>
                    <DynamicIcon icon="DeleteOutlined" />
                </Button>
            </Space>
            <Tour open={openSteps} onClose={() => setOpenSteps(false)} steps={steps} />
        </div>
    );
};

export default LayoutContentNavigation;
