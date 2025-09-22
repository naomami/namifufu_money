#!/usr/bin/env python3
import http.server
import socketserver
import sys
import os

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        sys.stdout.write(f"{self.log_date_time_string()} - {format%args}\n")
        sys.stdout.flush()

if __name__ == "__main__":
    PORT = 3000
    os.chdir('/home/user/webapp')
    
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"サーバーがポート {PORT} で起動しました")
        print(f"ディレクトリ: {os.getcwd()}")
        sys.stdout.flush()
        httpd.serve_forever()
