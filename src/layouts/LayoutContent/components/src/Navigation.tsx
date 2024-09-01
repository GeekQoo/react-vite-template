import React, { useEffect, useRef } from "react";
import { Space, Tag } from "antd";
import { useNavigationStore, useThemeStore } from "@/store";
import { useLocation, useNavigate } from "react-router-dom";
import { findRoute, routes } from "@/router";

const LayoutContentNavigation: React.FC = () => {
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

    // 滚动容器
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="overflow-x-auto" ref={scrollContainerRef}>
            <Space size="small" className="mb">
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
    );
};

export default LayoutContentNavigation;
