import requests

base_url = "https://pokeapi.co/api/v2/"

def get_pokemon_info(name):
  url = f"{base_url}/pokemon/{name}"
  response = requests.get(url)
  print(response)
  
  if response.status_code == 200:
    print("Retrieved")
    poke_data = response.json()
    print(poke_data)
  else:
    print(f"Failed {response.status_code}")

pokemon_name = "pikachu"
pokemon_info = get_pokemon_info(pokemon_name)