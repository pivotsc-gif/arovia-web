import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Extract path without query parameters
        req_path = self.path.split('?')[0].lstrip('/')
        
        # If requesting root, default to index.html
        if req_path == '' or req_path == '/':
            return super().do_GET()

        local_path = os.path.join(DIRECTORY, req_path)

        # 1. If path exists directly, serve it
        if os.path.exists(local_path):
            return super().do_GET()

        # 2. Check if path + '.html' exists
        if os.path.exists(local_path + '.html'):
            self.path = '/' + req_path + '.html'
            if '?' in self.path:
                self.path += '?' + self.path.split('?')[1]
            return super().do_GET()

        # 3. Check if directory with index.html exists
        if os.path.exists(os.path.join(local_path, 'index.html')):
            self.path = '/' + req_path + '/index.html'
            return super().do_GET()

        return super().do_GET()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
        print(f"🚀 Arovia Local Server running at http://localhost:{port}/")
        print(f"📁 Serving directory: {DIRECTORY}")
        print("💡 Clean URLs supported: /home-care, /ambulance, /pharmacy, etc.")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
