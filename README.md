Steps to run the project

1. Make sure you have docker installed
2. Create .env file, copy all content from `.env.example` and paste it in `.env` file
3. Now you need a telegram bot token, which you can get it from @BotFather(https://core.telegram.org/bots)
4. Paste the token in `.env` file
5. Now all you need to do is run a simple command
```docker-compose up -d```
6. Now you can send a message to your bot and it will be stored in the database
7. To view on web, you can go to `http://localhost:3000/`

Techstack used:
1. NodeJs ( For backend )
2. MongoDB ( For string messages )
3. Redis ( For queue )
4. Docker ( For running the project )