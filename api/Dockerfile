FROM nvidia/cuda:11.6.0-devel-ubuntu20.04
LABEL MAINTAINER "Alex Sierkov <alex.sierkov@gmail.com>"

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata vim-nox dnsutils iputils-ping net-tools curl strace
RUN ln -fs /usr/share/zoneinfo/Europe/Berlin /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y git python3 python3-pip python3-venv ncurses-bin wget
RUN pip3 -q install pip
RUN pip3 install sentence-transformers
RUN pip3 install flask flask-mail requests==2.24.0
RUN pip3 install psycopg2-binary

WORKDIR /root
COPY api/api.py /root
COPY api/init.py /root
COPY lib/py/va /root/va
RUN python3 init.py
EXPOSE 5000
CMD [ "python3", "/root/api.py" ]
