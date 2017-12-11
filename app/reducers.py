from . import actions

reducer_actions = {}

def reducer(sender, **kwargs):
    action = kwargs['action']
    payload = kwargs['payload']
    reply_channel = kwargs['reply_channel']
    
    if action in reducer_actions:
        reducer_actions[action](payload)
        # Update all clients
        Group("todo_app").send({
            "text": json.dumps({
                "type": action,
                "done": True,                
                **payload
            })
        })
    else:
        print('Action has not been implemented yet...')
