import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, LoadingIndicator, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';

const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY;
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUG9zdENhcmUtMyJ9.sv3sI8UX4V5Oh6UWoJsECO66Olv1f_9VAHFCnxMW32I';

const med_provider = {
  id: 3,
  first_name: 'PostCare',
  last_name: 'Provider',
  email: 'provider@postcare.com',
  email_verified_at: null,
  created_at: '2023-02-08T10:29:58.000000Z',
  updated_at: '2023-02-08T10:29:58.000000Z',
};

const userData = {
  id: `${med_provider.first_name}-${med_provider.id}`,
  name: `${med_provider.first_name} ${med_provider.last_name}`,
  image: 'https://getstream.io/random_png/?id=4&name=Jhon',
};

const App = () => {
  const [client, setClient] = useState();
  const [channel, setChannel] = useState();

  console.log('userD', userData);
  console.log('client', client);
  console.log('channel', channel);

  useEffect(() => {
    async function init() {
      const client = StreamChat.getInstance('szhsfdty4amf');
      await client.connectUser(userData, userToken);
      const channel = client.channel('messaging', 'PostCarePatient-2', {
        name: 'PostCare',
      });
      await channel.watch();
      setClient(client);
      setChannel(channel);
    }
    init();
    if (client)
      return () => {
        client.disconnectUser();
        setChannel(undefined);
      };
  }, []);

  if (!client || !channel) return <LoadingIndicator />;
  return (
    <Chat client={client} theme="messagin light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
