import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Layout, Spin } from "antd";
import { useThemeStore } from "@/store";

let { Content } = Layout;

let LayoutContent: React.FC = () => {
    let { pageAnimation } = useThemeStore();
    let { pathname } = useLocation();

    return (
        <Content>
            <div className="wh-100% p-4 overflow-y-auto overflow-x-hidden">
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
