# Use an official Node.js image as a base
FROM node:18

# Install necessary tools, including default JDK and Python3
RUN apt-get update && apt-get install -y default-jdk python3 && apt-get clean

# Set JAVA_HOME environment variable (adjust path if needed)
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Verify Java installation
RUN javac -version

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy application files
COPY . .

# Expose the application port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
