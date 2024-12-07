import json

data_dict = {"name": "King", "age": 34}

# Save data
with open('data.json', 'w') as f:
    json.dump(data_dict, f)

# Load data
with open('data.json', 'r') as f:
    loaded_data = json.load(f)
    print(loaded_data["name"])
    
    
# Save data
with open('data.txt', 'w') as f:
    f.write('Your data here')

# Load data
with open('data.txt', 'r') as f:
    loaded_data = f.read()