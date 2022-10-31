FROM node:14.20.1 as build-deps
RUN git clone https://github.com/scallensc/react-realtimeirl
WORKDIR "/react-realtimeirl"
ADD .env.local .
RUN yarn && yarn build

FROM nginx:1.23.1-alpine
COPY --from=build-deps /react-realtimeirl/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]