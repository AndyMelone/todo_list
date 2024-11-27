#!/bin/bash

sudo apt-get clean
sudo apt-get autoclean
sudo rm -rf /var/lib/apt/lists/*

containers=$(docker ps -a -q)
if [ -n "$containers" ]; then
  docker rm -f $containers
fi

images=$(docker images -q)
if [ -n "$images" ]; then
  docker rmi -f $images
fi

volumes=$(docker volume ls -q)
if [ -n "$volumes" ]; then
  docker volume rm $volumes
fi

docker system prune -af --volumes
docker system prune -af
docker volume prune -f
