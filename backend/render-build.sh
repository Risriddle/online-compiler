#!/bin/bash

# Update package lists
sudo apt-get update

# Install default JDK and Python3
sudo apt-get install -y default-jdk python3

# Set JAVA_HOME and update PATH
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Verify installation
java -version
javac -version
