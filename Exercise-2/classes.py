class Item(object):
    def __init__(self, id, title, status="To-Do"):
        self._id = id
        self._status = status
        self._title = title