from flask import Flask
import os
import signal
import sys

# implement signal handler
def signal_handler(sig, frame):
    sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

# Start app
app = Flask(__name__)

@app.route('/')
def hello_world():
    # Get DB connection string
    DB_CON_STRING = os.getenv('DB_CON_STRING')

    # Create directory listing
    LIST_DIR = os.getenv('LIST_DIR')
    dir_listing = "\n".join([ "%s/%s" % (LIST_DIR, x) for x in os.listdir(LIST_DIR)])
    
    return 'DB connection string: %s\n\nDirectory listing for "%s":\n%s\n' % (DB_CON_STRING, LIST_DIR, dir_listing)
