FROM python:3-slim
COPY . /
EXPOSE 5003
CMD python -m http.server 5003
