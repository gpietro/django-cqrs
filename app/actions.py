from .models import Document

CREATE = 'CREATE'

def create_document(payload):
    print('documento creato')

actions = {
    CREATE: create_document
}