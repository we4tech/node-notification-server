# Define system constants
exports.EventTypes =

  # Server state related event types
  STATE_SERVER_STARTED: 'server_started'
  STATE_SERVER_STOPPED: 'server_stopped'
  STATE_SERVER_ERROR: 'server_error'

  # Client subscription and unsubscription related event types
  SUBSCRIBE_CLIENT: 'sub_client'
  UNSUBSCRIBE_CLIENT: 'unsub_client'

  # Message pub/sub related event types
  PUBLISH_MSG_TO_CLIENTS: 'publish_msg_to_clients'
  PUBLISH_MSG_TO_CLIENT: 'publish_msg_to_client'
