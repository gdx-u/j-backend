#!/bin/bash
# Download J (latest Linux 64-bit)
wget -q https://www.jsoftware.com/download/j901linux.tar.gz -O j.tar.gz
tar -xzf j.tar.gz
chmod +x j901/bin/jconsole
