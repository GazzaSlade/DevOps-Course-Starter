class Item(object):
    def __init__(self, id, title, status="To-Do"):
        self._id = id
        self._status = status
        self._title = title

    def get_id(self):
        return self._id

    def get_status(self):
        return self._status

    def get_title(self):
        return self._title