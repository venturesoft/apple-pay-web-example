FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
ADD ./loopbackdomain_com.conf /etc/nginx/conf.d/loopbackdomain_com.conf
ADD ./loopbackdomain_com_bundle.crt /etc/ssl/certs/loopbackdomain_com_bundle.crt
ADD ./loopbackdomain_com.key /etc/ssl/private/loopbackdomain_com.key

# Document that the service listens on port 80 and 443
EXPOSE 80 443