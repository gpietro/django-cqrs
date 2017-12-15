from django.core import serializers
import json
import logging
from channels import Channel, Group
from channels.sessions import channel_session
from .models import Patient, Doctor, Document
from .serializers import DocumentSerializer
from .signals import dispatcher

log = logging.getLogger(__name__)


@channel_session
def ws_connect(message):
    message.reply_channel.send({
        "text": json.dumps({
            "type": "LOAD",
            "channelId": message.reply_channel.name,
            "payload": {
                "documents": DocumentSerializer(Document.objects.all(), many=True).data,
            }
        })
    })
    Group("main").add(message.reply_channel)


@channel_session
def ws_receive(message):
    try:
        data = json.loads(message.content['text'])
        log.debug(message.reply_channel.name)
    except ValueError:
        log.debug("ws message isn't json text=%s", message['text'])
        return

    if data:
        # command
        dispatcher.send(
            sender=None, 
            action=data.pop('type', None), 
            payload=data,
            reply_channel=message.reply_channel.name
        )


@channel_session
def ws_disconnect(message):
    Group("main").discard(message.reply_channel)