# ConcertCopper

## Setting the application up

In order to run the app, you need to have **Docker desktop** installed to initialize the database instance as well as seed the database with the ``dockerfile`` in the main directory. Once you have Docker desktop installed, follow the steps below.

## Running the application

To run the application, follow each section in order to successfully run the app.

### 1 - Starting the database
1. cd into main directory
```
cd ConcertCopper
```
2. create docker image and then create docker container
``` 
docker build -t postgres-db ./
docker run -d --name postgres-fast -p 6000:5432 postgres-db
```
The docker container should be running and the tables should be filled. To check this, type into the terminal
```
psql -U postgres -d fastdb
\dt
```
All the relations should be visible after running the second command.

### 2 - Starting the backend
1. cd into backend folder
```
cd backend
```
2. create a python virtual environment to run all the necessary packages
```
python3.10 -m venv venv
```
3. activate the virtual environment depending if you're on mac or windows

**Mac**
```
source venv/bin/activate
```
**Windows**
```
venv\Scripts\activate
```

4. install all dependencies
```
pip install -r requirements.txt
```
5. run the FastAPI app
```
uvicorn main:app
```

### 3 - Starting the frontend
1. cd into frontend folder
```
cd frontend
```
2. install all dependencies
```
yarn install
```
3. run the app
```
yarn dev
```

After following each section in order, the application should be running and you can check it out at ```http://localhost:3000```. To test admin functionality.
Check the user table and use an existing account that has the admin_flag set to true.
