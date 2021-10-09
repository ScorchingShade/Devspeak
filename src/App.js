import { Grid } from "semantic-ui-react";
import Sidebar from "../src/components/Sidebar/Sidebar.component.jsx";

import "./App.css";
import Messages from "./components/Messages/Messages.component.jsx";

function App() {
  return (
    <Grid columns="equal">
      <Sidebar />
      <Grid.Column className="messagepanel">
        <Messages />
      </Grid.Column>

      <Grid.Column width={1}>
        <span></span>
      </Grid.Column>
    </Grid>
  );
}

export default App;
