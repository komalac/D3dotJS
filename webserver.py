import http.server
import socketserver

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:    
    httpd.serve_forever()

# Below can also be run in the consoe to run html page (index.html) in current directory
#  python -m http.server 8080 --bind 127.0.0.1
