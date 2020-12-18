# Docker image 'nodyd/k8s-ws'

Starts a flask webapp and exposis it on `0.0.0.0:5000`

Parameter:

```
ENV DB_CON_STRING=mongodb://mongodb
ENV LIST_DIR=/properties
ENV FLASK_APP=/app/app.py
```


The image can be started, e.g., `docker run --rm -it -p5000:5000 nodyd/k8s-ws`
