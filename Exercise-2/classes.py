class Item(object):
    def __init__(self, id, title, status="To-Do", description=""):
        self._id = id
        self._status = status
        self._title = title
        self._description = description

    def get_id(self):
        return self._id

    def get_status(self):
        return self._status

    def get_title(self):
        return self._title

    def get_description(self):
        return self._description