#!/bin/bash
# Exit on any error
set -e
wget -O j.tar.gz https://www.jsoftware.com/download/j9.6/install/j9.6_linux64.tar.gz

# Extract the archive
tar -xzf j.tar.gz

# Make jconsole executable
chmod +x j9.6/bin/jconsole
