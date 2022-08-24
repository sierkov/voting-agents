#! /bin/bash
sudo chown dev:root /var/run/docker.sock
jupyter notebook --no-browser --ip="0.0.0.0" --NotebookApp.password="" --NotebookApp.token="mytoken" --allow-root
