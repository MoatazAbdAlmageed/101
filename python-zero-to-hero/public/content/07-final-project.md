# The Hero Project: Weather App 🌤️

Congratulations! You've reached the final stage. Now, let's build something real.

## Project Goal
Create a command-line tool that fetches the weather for a city using an API.

## What you'll need:
1. `requests` library (to talk to the internet).
2. An API key from [OpenWeatherMap](https://openweathermap.org/api).

## The Code Structure:
```python
import requests

def get_weather(city, api_key):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        temp = data['main']['temp']
        desc = data['weather'][0]['description']
        return f"The weather in {city} is {temp}°C with {desc}."
    else:
        return "City not found!"

# Main logic
key = "YOUR_API_KEY_HERE"
city_name = input("Enter city: ")
result = get_weather(city_name, key)
print(result)
```

## Next Steps
- Learn about **Frameworks** like Django or Flask.
- Dive into **Data Science** with Pandas and NumPy.
- Build **Automation scripts** for your daily tasks.

**You are now a Python Hero! 🦸‍♂️**
