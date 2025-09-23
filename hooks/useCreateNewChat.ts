import streamClient from "@/lib/stream";

export const useCreateNewChat = () => {
  const createNewChat = async ({
    members,
    createdBy,
    groupName,
  }: {
    members: string[];
    createdBy: string;
    groupName?: string;
  }) => {
    const isGroupChat = members.length > 2; // More than 2 members indicates a group chat

    // Only check for existing one-on-one chats
    if (!isGroupChat) {
      const existingChannel = await streamClient.queryChannels(
        {
          type: "messaging",
          members: { $eq: members },
        },
        { created_at: -1 },
        { limit: 1 }
      );
      if (existingChannel.length > 0) {
        const channel = existingChannel[0];
        const channelMembers = Object.keys(channel.state.members);

        // For one-on-one chats, ensure there are exactly two members
        if (
          channelMembers.length === 2 &&
          members.length === 2 &&
          members.every((member) => channelMembers.includes(member))
        ) {
          console.log("Existing one-on-one chat found");
          return channel; // Return the existing channel
        }
      }
    }
    const channelId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`; // Unique channel ID
    try {
      const channelData: {
        members: string[];
        created_by_ud: string;
        name?: string;
      } = {
        members,
        created_by_ud: createdBy,
      };
      // For group chats, change channel name
      if (isGroupChat) {
        channelData.name =
          groupName || `Group chat (${members.length} members)`;
      }

      const channel = streamClient.channel(
        isGroupChat ? "team" : "messaging",
        channelId,
        channelData
      );
      await channel.watch({
        presence: true,
      });

      return channel;
    } catch (error) {
      throw error;
    }
  };
  return createNewChat;
};
