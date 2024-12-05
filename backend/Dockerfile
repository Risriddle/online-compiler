# Use a base image with Node.js and JDK
FROM node:18

# Install JDK and Python
RUN apt-get update && \
    apt-get install -y default-jdk python3 && \
    apt-get clean

# Set JAVA_HOME and update PATH
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Create and use app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the app's port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
