FROM node:16-alpine

LABEL MAINTAINER "Alex Sierkov <alex.sierkov@gmail.com>"

WORKDIR /root
COPY ui/package.json /root
COPY ui/package-lock.json /root
COPY ui/svelte.config.js /root
COPY ui/.svelte-kit /root/.svelte-kit
RUN mkdir /root/static
COPY ui/src/theme src/theme
RUN npm i
EXPOSE 5000
CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0" ]
