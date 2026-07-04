import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7043/notificationHub", {
    accessTokenFactory: () => localStorage.getItem("token"),
  })
  .withAutomaticReconnect()
  .build();

const start = async () => {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    await connection.start();
    console.log("✅ SignalR Connected");
  }
};

export default {
  connection,
  start,
};
