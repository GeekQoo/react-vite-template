import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import unocss from "unocss/vite";

export default defineConfig(({ command, mode }) => {
    let viteEnv = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), unocss()],
        base: viteEnv.VITE_BASE_PATH, // 开发或生产环境服务的公共基础路径。
        publicDir: "public", // 作为静态资源服务的文件夹。
        build: {
            outDir: viteEnv.VITE_OUTPUT_DIR, // 指定输出路径（相对于项目根目录)。
            assetsDir: "static", // 指定生成静态资源的存放路径（相对于 build.outDir）。
            target: "es2015", // 设置最终构建的浏览器兼容目标。
            cssTarget: "chrome80" // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标。
        },
        resolve: {
            // 设置别名
            alias: {
                "@/": `${resolve(__dirname, "src")}/`,
                "#/": `${resolve(__dirname, "types")}/`
            }
        },
        css: {
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: ["Android >= 4.0", "iOS >= 7"]
                    })
                ]
            }
        },
        server: {
            host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
            port: 8888, // 指定开发服务器端口。
            open: false, // 是否自动打开浏览器。
            cors: false, // 为开发服务器配置 CORS。
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, "")
                },
                "/netdisk": {
                    target: "http://localhost:3000",
                    changeOrigin: true
                }
            }
        }
    };
});
