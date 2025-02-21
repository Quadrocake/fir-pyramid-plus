FROM python:3-slim
COPY . /
EXPOSE 80
CMD python -m http.server 80
