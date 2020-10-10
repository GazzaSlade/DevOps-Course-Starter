from flask import Flask, render_template, request, redirect, url_for
import session_items as session

# Create Flask object and pass it configuration found in flask_config.py
app = Flask(__name__)
app.config.from_object('flask_config.Config')


# Create base route for default web page and define a function to be executed whenever a request hits the route endpoint
@app.route('/')
def index():
    # Define get_items variable to retrieve all items currently saved within the browser session
    get_items = session.get_items()
    # Return the rendered "index.html" template
    # Pass the value of get_items into the template as variable items (used by Jinja2)
    return render_template("index.html", items=get_items)


# Create route for adding items to the todo list and function to be executed when HTML form is submitted
@app.route('/add_item', methods=['POST'])
def add_item():
    # Define get_items variable to retrieve HTML form 'add_item_title' textbox value
    new_item = request.form.get('add_item_title', None)
    # Add the retrieved value as an item to our browser session
    session.add_item(new_item)
    # Finally redirect the user back to the '/' route where the base route function executes again
    return redirect('/')


# Run this app only when this file is executed directly (rather than imported from another file)
if __name__ == '__main__':
    app.run()
