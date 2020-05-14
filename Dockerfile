# Build with:
# docker build -t cswl/xampp .

FROM cswl/xampp
MAINTAINER Asher <asherlabutte@me.com>

COPY app /opt/lampp/app
COPY htdocs /opt/lampp/htdocs
COPY templates /opt/lampp/templates
COPY vendor /opt/lampp/vendor

RUN chmod 777 -R /opt/lampp/app
RUN chmod 777 -R /opt/lampp/htdocs
RUN chmod 777 -R /opt/lampp/templates
RUN chmod 777 -R /opt/lampp/vendor