#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import webbrowser

PORT = 5173
HOST = "127.0.0.1"
ROOT = Path(__file__).resolve().parent / "dist"


class SpaHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and "." not in Path(self.path).name:
            self.path = "/index.html"
        return super().send_head()


def main():
    if not (ROOT / "index.html").exists():
        raise SystemExit("找不到 dist/index.html，请先生成网站文件。")

    server = ThreadingHTTPServer((HOST, PORT), SpaHandler)
    url = f"http://localhost:{PORT}/"
    print("")
    print("TG Healing 网站本地预览已启动：")
    print(url)
    print("")
    print("保持这个窗口打开；要停止预览，请按 Control + C。")
    print("")
    webbrowser.open(url)

    server.serve_forever()


if __name__ == "__main__":
    main()
