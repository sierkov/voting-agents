FROM nvidia/cuda:11.6.0-devel-ubuntu20.04
LABEL MAINTAINER "Alex Sierkov <alex.sierkov@gmail.com>"

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata ffmpeg screen vim-nox dnsutils iputils-ping net-tools curl sudo strace
RUN ln -fs /usr/share/zoneinfo/Europe/Berlin /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata
RUN cp /etc/sudoers /etc/sudoers.orig
RUN awk '{ if (/^%sudo/) { print "%sudo\tALL=(ALL:ALL) NOPASSWD:ALL" } else { print } }' /etc/sudoers.orig > /etc/sudoers
RUN /bin/bash -c '/bin/bash <(curl -sL https://deb.nodesource.com/setup_16.x)'
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y git python3 python3-pip python3-venv nodejs ncurses-bin wget docker-compose
RUN pip3 -q install pip
RUN pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu113
RUN pip3 install jupytext==1.13.8 jupyter ipywidgets transformers datasets h5py numpy==1.21.4
RUN npm install -g npm@latest
RUN pip3 install matplotlib
RUN pip3 install sentence-transformers typer
RUN pip3 install flask flask-mail requests==2.24.0
RUN pip3 install psycopg2-binary
RUN useradd -m -s /bin/bash -G sudo dev

USER dev
RUN git config --global --add safe.directory /workspace
RUN mkdir -p /home/dev/.vscode-server/extensions
RUN chown -R dev  /home/dev/.vscode-server
ENV NODE_PATH=/usr/lib/node_modules
WORKDIR /workspace
RUN npx playwright install
RUN npx playwright install-deps
EXPOSE 8888
CMD [ "/bin/bash", "/workspace/init-dev.sh" ]
