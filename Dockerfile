FROM node:18.18.2 as build-deps
#RUN git clone https://github.com/scallensc/react-realtimeirl
WORKDIR "/react-realtimeirl"
COPY . .
RUN yarn && yarn build

FROM nginx:1.23.1-alpine
COPY --from=build-deps /react-realtimeirl/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]