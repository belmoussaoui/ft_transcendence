FROM python:3.5.7

ENV PYTHONUNBUFFERED 1

RUN git clone https://github.com/gothinkster/django-realworld-example-app.git /app

WORKDIR /app

RUN ls .

RUN pip install -r requirements.txt

EXPOSE 8080

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8080