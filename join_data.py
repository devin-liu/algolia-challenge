# Code is here, but I did not add the resources from the project files.
# Import my preferred data analysis library
import pandas as pd

# Import the two datasets with correct separator and orients
my_data = pd.read_csv('resources/dataset/restaurants_info.csv', sep=';')
json_data = pd.read_json('resources/dataset/restaurants_list.json', orient='records')

# Make sure the indices will match up when I join them
my_data.set_index('objectID')
json_data.set_index('objectID')

# Join the datasets together
my_data = my_data.merge(json_data, left_on='objectID', right_on='objectID')

# Output the dataset as records for importing to Algolia
my_data.to_json('resources/dataset/restaurants_list_full_info.json', orient='records')
