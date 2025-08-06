#!/usr/bin/env python3
"""
Run script for the Fitness Tracker Backend
"""

import os
import sys
from app import app

if __name__ == '__main__':
    # Set default environment if not set
    if not os.environ.get('FLASK_ENV'):
        os.environ['FLASK_ENV'] = 'development'
    
    # Get configuration
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"Starting Fitness Tracker Backend...")
    print(f"Environment: {os.environ.get('FLASK_ENV', 'development')}")
    print(f"Host: {host}")
    print(f"Port: {port}")
    print(f"Debug: {debug}")
    print(f"API URL: http://{host}:{port}")
    print(f"Health Check: http://{host}:{port}/api/health")
    print("Press Ctrl+C to stop the server")
    
    try:
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1) 