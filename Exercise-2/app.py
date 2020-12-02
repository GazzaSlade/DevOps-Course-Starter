from flask import Flask, render_template, request, redirect, url_for
from os import environ
import requests
import session_items as session
import trello_functions

# Create Flask object and pass it configuration found in flask_config.py
app = Flask(__name__)
app.config.from_object('flask_config.Config')

# Define global variables
base_url = "https://api.trello.com/1/"
params = {
    "key": environ['TRELLO_API_KEY'],
    "token": environ['TRELLO_TOKEN']
}

# Create base route and define function to be executed whenever a user navigates to the home page
@app.route('/')
def index():
    # Retrieve all cards on the Trello board and store the result in a variable
    get_items = trello_functions.get_cards()

    # Return the rendered "index.html" template
    # Pass the value of the above variable into the template as variable "items" (used by Jinja2)
    return render_template("index.html", items=get_items)


# Create route for adding items to the todo list and function to be executed when HTML form is submitted
@app.route('/add_item', methods=['POST'])
def add_item():
    # Retrieve HTML form 'add_item_title' textbox value and store the reslt in a variable
    new_item = request.form.get('add_item_title', None)

    # Update the global "params" variable with a couple of list-specific key/values
    params.update({"idList": "5f3fbee985386f08ed6c7c77", "name": new_item}) # To-Do List ID

    # Send POST request to the /cards/ API endpoint to publish a new item to the Trello list
    constructed_url = base_url + "cards/"
    response = requests.post(constructed_url, params=params)

    # Finally redirect the user back to the '/' route where the base route function executes again
    return redirect('/')


# Create route for marking items as complete and function to be executed when HTML form is submitted
# This path contains a variable '<item_id>' which will change depending on which item button is clicked
@app.route('/complete_item/<item_id>', methods=['POST'])
def complete_item(item_id):
    # Save the item, passing through the new item dictionary value. 'id' and 'title' stay the same, 'status' is updated
    session.save_item({'id': int(item_id), 'status': 'Complete', 'title': session.get_item(item_id)['title']})
    # Finally redirect the user back to the '/' route where the base route function executes again
    return redirect('/')


# Create route for deleting items and function to be executed when item delete button is clicked
# This path contains a variable '<item_id>' which will change depending on which item button is clicked
@app.route('/delete_item/<item_id>', methods=['POST'])
def delete_item(item_id):
    constructed_url = base_url + "cards/" + item_id

    # Send DELETE request to the /cards/ API endpoint to delete an existing item
    response = requests.delete(constructed_url, params=params)

    # Finally redirect the user back to the '/' route where the base route function executes again
    return redirect('/')

# Run this app only when this file is executed directly (rather than imported from another file)
if __name__ == '__main__':
    app.run()