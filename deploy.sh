#!/bin/bash
# Deploy Week 4 React Router app to Metropolia
# Usage: bash deploy.sh

USERNAME="elmomal"
SERVER="shell.metropolia.fi"
DEPLOY_PATH="~/public_html/wsk-routing"

echo "Building application..."
npm run build

echo ""
echo "Deploying to Metropolia..."
echo "Server: $SERVER"
echo "Path: $DEPLOY_PATH"
echo ""

# Create the deployment directory and upload files via SFTP
sftp $USERNAME@$SERVER <<EOF
mkdir -p $DEPLOY_PATH
cd $DEPLOY_PATH
put dist/index.html
put dist/assets/*
bye
EOF

echo ""
echo "Deployment complete!"
echo "App available at: https://users.metropolia.fi/~$USERNAME/wsk-routing/"
