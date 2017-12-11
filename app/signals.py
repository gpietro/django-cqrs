from django.dispatch import Signal
from .reducers import reducer

dispatcher = Signal(providing_args=['action', 'payload'])
dispatcher.connect(reducer)
