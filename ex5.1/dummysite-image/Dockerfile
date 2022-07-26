FROM nginx:stable-alpine
WORKDIR app
COPY run.sh . 
RUN chmod +x run.sh
RUN apk --no-cache add wget
ENTRYPOINT ["./run.sh"]
CMD ["nginx", "-g", "daemon off;"]
