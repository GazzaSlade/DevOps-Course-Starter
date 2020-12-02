from os import environ
import requests
import json

TRELLO_MEMBER_ID = environ['TRELLO_MEMBER_ID']
TRELLO_BOARD_ID = "5f3fbee941f0381f9d52aeef"
TRELLO_BASE_URL = "https://api.trello.com/1/"
params = {
    "key": environ['TRELLO_API_KEY'],
    "token": environ['TRELLO_TOKEN']
}

def get_lists(board_id=TRELLO_BOARD_ID):
    """
    Arguments:
        - board_id (optional): ID of a Trello Board <str>
    Returns: <Response>
    """
    constructed_url = TRELLO_BASE_URL + "boards/" + TRELLO_BOARD_ID + "/lists"
    response = requests.get(constructed_url, params=params).json()
    return response

def get_list_name(list_id):
    """
    Arguments:
        - list_id (required): ID of a Trello List <str>
    Returns: <str>
    """
    constructed_url = TRELLO_BASE_URL + "lists/" + list_id
    response = json.loads(requests.get(constructed_url, params=params).content)
    return response["name"]

def get_cards(status=""):
    """
    Arguments:
        - status (optional): Name of a Trello List <str>
    Returns: <dict>
    """
    lists = get_lists()
    trello_cards = []

    for _list in lists:
        list_name = str(status).strip().title()
        list_info = {"id": _list["id"], "name": list_name}

        if list_name.lower() == _list["name"].lower():
            constructed_url = TRELLO_BASE_URL + "/lists/" + list_info["id"] + "/cards"
            response = requests.get(constructed_url, params=params).json()

            for card in response:
                trello_cards.append({ 'id': card['id'], 'title': card["name"], 'status': list_info["name"] })
            return trello_cards
    else:
        constructed_url = TRELLO_BASE_URL + "boards/" + TRELLO_BOARD_ID + "/cards"
        response = requests.get(constructed_url, params=params).json()

        for card in response:
            trello_cards.append({ 'id': card['id'], 'title': card["name"], 'status': get_list_name(card["idList"]) })
                    
    return trello_cards