#!/usr/bin/env python
#Bismillahirahmanirahim....
#Pada kesempatan ini, coba membuat Webcam Live Streaming yang bisa diakses 
#di server dengan IP Public, VPS misalnya, tanpa melalui perantara
#pihak ketiga seperti Youtub atau Facebook.
#Kelemahannya, hanya bisa diakses oleh 1 user yang membuka halaman IP Public
#Jika ada user lain yang membuka maka video akan terhenti.
#Palangka Raya, 30/06/2019.
#/etc/init.d/networking restart
#ssh -R 8888:127.0.0.1:8080 rootazure2@13.76.197.85
#nano /etc/ssh/sshd_config
#GatewayPorts yes
#systemctl reload ssh.service
#ssh -R remote_port:host:localport your_username@IP-of-server
#https://www.maketecheasier.com/reverse-ssh-tunnel-allow-external-connections/
#http://www.chioka.in/python-live-video-streaming-example
#https://github.com/log0/video_streaming_with_flask_example

# Project: Video Streaming with Flask
# Author: Log0 <im [dot] ckieric [at] gmail [dot] com>
# Date: 2014/12/21
# Website: http://www.chioka.in/
# Description:
# Modified to support streaming out with webcams, and not just raw JPEGs.
# Most of the code credits to Miguel Grinberg, except that I made a small tweak. Thanks!
# Credits: http://blog.miguelgrinberg.com/post/video-streaming-with-flask
#
# Usage:
# 1. Install Python dependencies: cv2, flask. (wish that pip install works like a charm)
# 2. Run "python main.py".
# 3. Navigate the browser to the local webpage.
from flask import Flask, render_template, Response
from camera import VideoCamera

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
#    app.run(host='107.173.229.88',port='8080', debug=True)
    app.run(host="107.173.229.88", port=8080, ssl_context=('/etc/letsencrypt/live/rek.my.id/fullchain.pem', '/etc/letsencrypt/live/rek.my.id/privkey.pem'))

