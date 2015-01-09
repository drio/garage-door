import logging
logging.basicConfig(level=logging.DEBUG)

from socketIO_client import SocketIO

def on_bbb_response(*args):
    print 'on_bbb_response', args


with SocketIO('localhost', 5000) as socketIO:
    socketIO.emit('my event', {'name': 'david'}, on_bbb_response)
    socketIO.wait_for_callbacks(seconds=10)
